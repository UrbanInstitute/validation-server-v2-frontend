export type Notification = {
  id: string;
  userId: string;
  message: string;
  receiveTime: number;
  status: "unread" | "read";
  jobId: string;
  runId: string;
  linkText: string;
  changeCheck: string;
  title: string;
  description: string;
};
