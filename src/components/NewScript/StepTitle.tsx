export interface StepTitleProps {
  title: string;
}
export const StepTitle = ({ title }: StepTitleProps) => {
  return <h1 className="text-3xl">{title}</h1>;
};
