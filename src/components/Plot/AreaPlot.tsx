import { formatNumberAsText, roundNumber } from "@/lib/utils";
import * as d3 from "d3";
import { useRef, useEffect, useMemo, useCallback } from "react";
import { ClassNameValue } from "tailwind-merge";

export type AreaValue = {
  x: number;
  y0: number;
  y1: number;
  error: number;
  estimate: number;
};

interface AreaPlotProps {
  data: Array<AreaValue>;
  currentValue?: number;
  currentLabel?: string;
  proposedValue?: number;
  proposedLabel?: string;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  xAxisTitle?: string;
  yAxisTitle?: string;
  centerYValue?: number;
}

interface VerticalLineWithLabelProps {
  xPosition: number; // X position of the vertical line
  x2Position?: number; // X position of the vertical line
  yPosition: number; // Y position of the te
  lineClassName?: ClassNameValue;
  label?: string; // Text label for the line
  labelClassName?: ClassNameValue;
  subLabel?: string;
  subLabelClassName?: ClassNameValue;
  width: number; // Width of the plot
  height: number; // Height of the plot
  margin: { top: number; right: number; bottom: number; left: number }; // Margin for the plot
}

const VerticalLineWithLabel: React.FC<VerticalLineWithLabelProps> = ({
  xPosition,
  x2Position,
  yPosition,
  lineClassName,
  label,
  labelClassName,
  subLabel,
  subLabelClassName,
  width,
  height,
  margin,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Remove existing elements
    svg.selectAll("*").remove();

    // Append vertical line
    svg
      .append("line")
      .attr("x1", xPosition)
      .attr("x2", xPosition)
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("class", (lineClassName as string) ?? "stroke-black")
      .attr("stroke-width", 5);

    // Append text label
    const text = svg
      .append("text")
      .attr("x", Math.max(xPosition, x2Position ?? xPosition) + 5) // Adjust the distance from the line
      .attr("y", yPosition) // Adjust the vertical position
      .attr("dy", "0.35em")
      .attr("class", (labelClassName as string) ?? "")

      .text(label ?? "");

    const subText = svg
      .append("text")
      .attr("x", Math.max(xPosition, x2Position ?? xPosition) + 5) // Adjust the distance from the line
      .attr("y", yPosition + 17) // Adjust the vertical position
      .attr("dy", "0.35em")
      .attr("class", (subLabelClassName as string) ?? "")

      .text(subLabel ?? "");
    const textBBox = text.node()?.getBBox();
    const subTextBBox = subText.node()?.getBBox();

    // Check if the label exceeds the plot width
    let bBox = { x: 0, width: 0, y: 0, height: 0, bottom: 0, left: 0 };
    if (textBBox && !subTextBBox) {
      bBox = textBBox;
    } else if (subTextBBox && !textBBox) {
      bBox = subTextBBox;
    } else if (textBBox && subTextBBox) {
      bBox = {
        x: Math.min(textBBox.x, subTextBBox.x),
        width: Math.max(textBBox.width, subTextBBox.width),
        y: Math.min(textBBox.y, subTextBBox.y),
        height: Math.max(textBBox.height, subTextBBox.height),
        bottom: Math.max(
          textBBox.y + textBBox.height,
          subTextBBox.y + subTextBBox.height
        ),
        left: Math.min(textBBox.x, subTextBBox.x),
      };
    }

    // Optimal position is to the right of the max x
    let refPos = bBox.x + bBox.width;
    let boundPos = width - margin.right;
    let textX = bBox.x;

    if (refPos > boundPos) {
      textX = Math.min(xPosition, x2Position ?? xPosition) - 5;
      refPos = textX - bBox.width;
      boundPos = margin.left;
      // Next is to the left of the min x
      if (refPos < boundPos) {
        textX = Math.max(xPosition, x2Position ?? xPosition) - 5;
      }
      text.attr("text-anchor", "end").attr("x", textX);
      subText.attr("text-anchor", "end").attr("x", textX);
    }
  }, [
    xPosition,
    x2Position,
    yPosition,
    lineClassName,
    label,
    labelClassName,
    subLabel,
    subLabelClassName,
    width,
    height,
    margin,
  ]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default function AreaPlot({
  data = [
    { x: 0, y0: -1, y1: 2, error: 1.5, estimate: 0.5 },
    { x: 1, y0: -0.75, y1: 1.75, error: 1.25, estimate: 0.5 },
    { x: 2, y0: -0.5, y1: 1.5, error: 1, estimate: 0.5 },
  ],
  currentValue,
  currentLabel,
  proposedValue,
  proposedLabel,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 80,
  xAxisTitle,
  yAxisTitle,
  centerYValue,
}: AreaPlotProps) {
  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);
  const gyAxis = useRef<SVGGElement | null>(null);
  const tooltipRef = useRef<SVGRectElement | null>(null);
  const tooltipTextRef = useRef<SVGTextElement | null>(null);
  const sortedData = useMemo(
    () => data.sort((a, b) => (a.x <= b.x ? -1 : 1)),
    [data]
  );
  const xValues = useMemo(() => sortedData.map((d) => d.x), [sortedData]);
  const yValues = useMemo(
    () => [...sortedData.map((d) => d.y0), ...sortedData.map((d) => d.y1)],
    [sortedData]
  );
  const x = d3.scaleLinear(
    [Math.min(...xValues), Math.max(...xValues)],
    [marginLeft, width - marginRight]
  );

  const y = d3.scaleLinear(
    [Math.min(...yValues), Math.max(...yValues)],
    [height - marginBottom, marginTop]
  );
  const area = d3
    .area<AreaValue>()
    .x((d) => x(d.x))
    .y0((d) => y(d.y0))
    .y1((d) => y(d.y1));

  const formatter = useCallback((yValues: number[] | number) => {
    let scientific = false;
    const maxValue =
      typeof yValues === "number" ? yValues : Math.max(...yValues);

    if (maxValue < 0.0001 || maxValue > 1000) {
      scientific = true;
    }

    return `.${
      maxValue < 0.01 && maxValue > 0.0001
        ? "4"
        : maxValue >= 0.01 && maxValue < 1
        ? "2"
        : "0"
    }${scientific ? "e" : "f"}`;
  }, []);

  useEffect(
    () => void d3.select(gx.current!).call(d3.axisBottom(x).ticks(5)),
    [gx, x]
  );

  useEffect(
    () =>
      void d3.select(gy.current!).call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSizeInner(-width)
          .tickFormat(() => "")
      ),

    [gy, y, width]
  );

  useEffect(
    () =>
      void d3.select(gyAxis.current!).call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat(d3.format(formatter(yValues)))
      ),

    [gyAxis, y, yValues, formatter]
  );

  const handleMouseOver = (d: AreaValue, location: "over" | "below") => {
    const tooltipText = generateToolTipText(
      d,
      x(d.x) + 20,
      location === "below"
        ? y(d.y0) + 32
        : Math.max(y(d.y1) - 48, marginTop + 16)
    );

    const tooltipBox = generateToolTipBox(
      x(d.x) + 10,
      location === "below"
        ? y(d.y0) + 12
        : Math.max(
            y(d.y1) - tooltipText.node()!.getBBox().height - 16,
            marginTop
          ),
      tooltipText
    );

    if (
      tooltipText.node()!.getBBox().width + 20 + x(d.x) >
      width - marginRight
    ) {
      const tttWidth = tooltipText.node()!.getBBox().width;
      tooltipBox.attr("x", x(d.x) - tooltipBox.node()!.getBBox().width - 10);

      generateToolTipText(
        d,
        x(d.x) - tttWidth - 20,
        location === "below"
          ? y(d.y0) + 32
          : Math.max(y(d.y1) - 48, marginTop + 16)
      );
    }
  };

  const generateToolTipText = (d: AreaValue, x: number, y: number) => {
    const tooltipText = d3.select(tooltipTextRef.current!);

    tooltipText.html(""); // Clear existing content

    tooltipText
      .style("display", "block")
      .append("tspan")
      .text(`Epsilon: ${roundNumber(d.x)}`)
      .attr("x", x)
      .attr("y", y);

    tooltipText
      .append("tspan")
      .attr("dy", "1.1em") // Move to the next line
      .attr("x", x)
      .text(`Error: ${formatNumberAsText(d.error, 2)}`);

    tooltipText
      .append("tspan")
      .attr("dy", "1.1em") // Move to the next line
      .attr("x", x)
      .text(`Estimate: ${formatNumberAsText(d.estimate, 1)}`);

    return tooltipText;
  };

  const generateToolTipBox = (
    x: number,
    y: number,
    tooltipText: d3.Selection<SVGTextElement, unknown, null, undefined>
  ) => {
    const tooltipBox = d3.select(tooltipRef.current!);

    tooltipBox
      .style("display", "block")
      .attr("width", tooltipText.node()!.getBBox().width + 20)
      .attr("height", tooltipText.node()!.getBBox().height + 8)
      .attr("x", x)
      .attr("y", y);
    return tooltipBox;
  };

  const handleMouseOut = () => {
    const tooltipText = d3.select(tooltipTextRef.current!);
    const tooltipBox = d3.select(tooltipRef.current!);
    tooltipText.style("display", "none");
    tooltipBox.style("display", "none");
  };

  return (
    <div>
      <div className="text-left text-sm font-bold">
        <p>{yAxisTitle}</p>
      </div>
      <svg width={width} height={height}>
        <g
          ref={gx}
          transform={`translate(0,${height - marginBottom})`}
          className="text-base text-[#5C5C5C]"
        />

        <g
          ref={gy}
          transform={`translate(${marginLeft},0)`}
          className="text-base text-graphGridLines"
        />

        <g
          ref={gyAxis}
          transform={`translate(${marginLeft},0)`}
          className="text-base text-[#858585]"
        />
        <line
          x1={marginLeft}
          x2={marginLeft}
          y1={0}
          y2={height - marginBottom}
          stroke="white"
          strokeWidth={2}
        />

        <line
          x1={x(Math.min(...xValues))}
          x2={x(Math.max(...xValues))}
          y1={height - marginBottom}
          y2={height - marginBottom}
          stroke="#333333"
          strokeWidth={2}
        />

        <path className="fill-graphFill/75" d={area(data) as string} />

        {centerYValue && (
          <line
            x1={marginLeft}
            x2={width - marginRight}
            y1={y(centerYValue)}
            y2={y(centerYValue)}
            className="stroke-[#333333] "
            strokeWidth={1.5}
            strokeDasharray="4,4"
          />
        )}

        {currentValue && (
          <g>
            {/* Current line */}
            <VerticalLineWithLabel
              xPosition={x(currentValue)}
              x2Position={x(proposedValue ?? currentValue)}
              yPosition={height - marginBottom - 14 - 4 - 2 - 16 - 5} // Adjust the vertical position
              lineClassName="stroke-graphCurrent fill-none"
              label={
                currentValue ? `Epsilon = ${roundNumber(currentValue)}` : ""
              }
              labelClassName="text-base stroke-graphCurrentText fill-graphCurrentText"
              subLabel={`(${currentLabel})`}
              subLabelClassName="text-sm italic stroke-lightGrayText fill-lightGrayText font-light"
              width={width}
              height={height}
              margin={{
                right: marginRight,
                left: marginLeft,
                top: marginTop,
                bottom: marginBottom,
              }}
            />
            {/* Border around the current line */}
            <rect
              x={x(currentValue) - 2.5}
              y={marginTop}
              width={5} // 5px line width
              height={height - marginBottom - marginTop}
              className="stroke-graphCurrent fill-none"
            />
          </g>
        )}
        {proposedValue && (
          <g>
            {/* Proposed line */}
            <VerticalLineWithLabel
              xPosition={x(proposedValue)}
              x2Position={x(currentValue ?? proposedValue)}
              yPosition={
                height - marginBottom - 14 - 4 - 2 - 16 - 15 - 14 - 2 - 16
              } // Adjust the vertical position
              lineClassName="stroke-graphProposed fill-none"
              label={
                proposedValue ? `Epsilon = ${roundNumber(proposedValue)}` : ""
              }
              labelClassName="text-base stroke-graphProposedText fill-graphProposedText"
              subLabel={`(${proposedLabel})`}
              subLabelClassName="text-sm italic stroke-lightGrayText fill-lightGrayText font-light"
              width={width}
              height={height}
              margin={{
                right: marginRight,
                left: marginLeft,
                top: marginTop,
                bottom: marginBottom,
              }}
            />
            {/* Border around the current line */}
            <rect
              x={x(proposedValue) - 2.5}
              y={marginTop}
              width={5} // 5px line width
              height={height - marginBottom - marginTop}
              className="stroke-graphProposedText fill-none"
              strokeDasharray="5,5"
            />
          </g>
        )}
        {data.map((p) => (
          <>
            <line
              x1={x(p.x)}
              x2={x(p.x)}
              y1={0}
              y2={height - marginBottom}
              className="stroke-black/0 hover:stroke-[#5C5C5C]"
              strokeWidth={3}
              onMouseOver={() => handleMouseOver(p, "over")}
              onMouseLeave={() => handleMouseOut()}
            />
          </>
        ))}
        <rect
          width={100}
          height={50}
          fill="white"
          stroke="black"
          ref={tooltipRef}
          ry="5"
          rx="5"
          className="hidden"
        />
        <text
          x={10}
          y={20}
          ref={tooltipTextRef}
          className="stroke-lightGrayText fill-lightGrayText text-sm font-light"
        ></text>
      </svg>
      <div className="text-center text-sm font-bold">
        <p>{xAxisTitle}</p>
      </div>
    </div>
  );
}
