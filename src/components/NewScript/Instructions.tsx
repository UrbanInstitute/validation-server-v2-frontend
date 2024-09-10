export interface InstructionsProps {
  instructions: React.ReactNode | string;
}
export const Instructions = ({ instructions }: InstructionsProps) => {
  return (
    <div className="w-full mt-3 text-lg text-grayText">{instructions}</div>
  );
};
