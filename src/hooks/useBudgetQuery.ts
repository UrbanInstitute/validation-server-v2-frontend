import { budget } from "@/lib/budget";
import { useQuery } from "@tanstack/react-query";

export const useBudgetQuery = (id: string) =>
  useQuery({ queryKey: ["budgets", id], queryFn: () => budget.get(id) });
