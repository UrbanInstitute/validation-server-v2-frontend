import * as d3 from "d3";
import { useRef, useEffect } from "react";

interface LinePlotProps {
  data: [number, number][];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export default function LinePlot({
  data = [
    [0, 0],
    [1, 2],
    [2, 2.5],
    [2.3, 7],
  ],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: LinePlotProps) {
  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);

  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );

  const yValues = data.map((d) => d[1]);

  const y = d3.scaleLinear(
    [Math.min(...yValues), Math.max(...yValues)],
    [height - marginBottom, marginTop]
  );
  const line = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));
  useEffect(() => void d3.select(gx.current!).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current!).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="35"
        d={line(data) as string}
      />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(d[0])} cy={y(d[1])} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
