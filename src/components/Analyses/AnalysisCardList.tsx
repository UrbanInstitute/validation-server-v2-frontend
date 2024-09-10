import { AnalysisCard, AnalysisCardProps } from "./AnalysisCard";

interface AnalysisCardListProps {
  analyses: Array<AnalysisCardProps>;
  scriptName: string;
}

export const AnalysisCardList = ({
  analyses,
  scriptName,
}: AnalysisCardListProps) => {
  return (
    <div>
      <div className="ml-3 uppercase text-base font-bold">{scriptName}</div>
      <div className="mt-[1.125rem] space-y-2">
        {analyses.map((analysis, index) => (
          <AnalysisCard key={index} {...analysis} />
        ))}
        {analyses.length === 0 && (
          <div className="text-grayText py-3 px-3 border-2 border-grayBorder rounded-md text-base italic">
            You do not have any analyses at this time
          </div>
        )}
      </div>
    </div>
  );
};
