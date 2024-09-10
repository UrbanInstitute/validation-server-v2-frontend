import { ApiBudget } from "@/models/apiResponse";
import { apiService } from "@/services/apiService";
import { roundNumber } from "./utils";

export const budget = {
  list: () => apiService.budget.get(),
  get: async (id: string) => {
    const budget = await apiService.budget.getOne(id);
    return {
      ...budget,
      review: roundNumber(budget.review, 2),
      release: roundNumber(budget.release, 2),
    } as ApiBudget;
  },
};
