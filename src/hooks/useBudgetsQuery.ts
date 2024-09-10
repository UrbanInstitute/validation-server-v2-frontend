import { budget } from "@/lib/budget";
import { useQuery } from "@tanstack/react-query";

export const useBudgetsQuery = () =>
  useQuery({ queryKey: ["budgets"], queryFn: budget.list });
