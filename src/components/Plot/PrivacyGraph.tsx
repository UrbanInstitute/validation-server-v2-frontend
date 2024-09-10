import AreaPlot, { AreaValue } from "./AreaPlot";
import * as d3 from "d3";

interface PrivacyGraphProps {
  theta: number;
  noise_90: number;
  currentValue: number;
  proposedValue: number;
}
export const PrivacyGraph = ({
  theta,
  noise_90,
  currentValue,
  proposedValue,
}: PrivacyGraphProps) => {
  const epsilon: number[] = [
    currentValue,
    proposedValue,
    ...d3
      .range(
        Math.min(
          Math.max(currentValue - 0.1, 0.01) * 100,
          Math.max(proposedValue - 0.1, 0.01) * 100
        ),
        Math.max(400, currentValue * 100, proposedValue * 100)
      )
      .map((v) => v / 100),
  ].sort((a, b) => (a - b > 0 ? 1 : 0));

  const error: number[] = epsilon.map((e) => noise_90 / e);

  const df: AreaValue[] = epsilon.map((e, i) => ({
    x: e,
    error: error[i],
    y0: theta - error[i],
    y1: theta + error[i],
    estimate: theta,
  }));

  return (
    <AreaPlot
      width={460}
      height={287}
      data={df}
      xAxisTitle="Privacy cost (epsilon)"
      yAxisTitle="Privacy error"
      currentLabel="Current value"
      proposedLabel="Proposed value"
      currentValue={currentValue}
      proposedValue={proposedValue}
      centerYValue={theta}
    />
  );
};
