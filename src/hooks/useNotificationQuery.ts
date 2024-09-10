import { notificationService } from "@/services/notificationService";
import { useQuery } from "@tanstack/react-query";

export const useNotificationsQuery = (userId: string) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => notificationService.list(userId ?? "", true),
  });
};
