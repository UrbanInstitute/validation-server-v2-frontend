import { collections } from "./database";
import { Notification } from "@/models/notification";
import { RxDocument } from "rxdb";

const notificationService = {
  initialize: () => {
    const notifyStartTime = sessionStorage.getItem("notificationsEnabledTime");
    if (!notifyStartTime) {
      return;
    }
  },
  create: ({
    message,
    userId,
    notificationId,
    jobId,
    runId,
    linkText,
    title,
    description,
    changeCheck,
  }: {
    message: string;
    userId: string;
    notificationId: string;
    jobId: string;
    runId: string;
    linkText: string;
    title: string;
    description: string;
    changeCheck: string;
  }) => {
    const notification: Notification = {
      id: notificationId,
      message: message,
      userId: userId,
      jobId: jobId,
      runId: runId,
      linkText: linkText,
      receiveTime: new Date().setMilliseconds(0),
      status: "unread",
      title: title,
      description: description,
      changeCheck: changeCheck,
    };
    return collections.notifications.upsert(notification);
  },
  list: async (userId: string, unreadOnly?: boolean) => {
    const selector = unreadOnly
      ? { userId: { $eq: userId }, status: { $eq: "unread" } }
      : { userId: { $eq: userId } };
    const query = collections.notifications.find({
      selector: selector,
    });
    const results = await query.exec();
    return results.map((res: RxDocument<Notification>) =>
      res.toJSON()
    ) as Notification[];
  },
  update: async (id: string, updatedDoc: Partial<Notification>) => {
    const query = collections.notifications.findOne({
      selector: { id: { $eq: id } },
    });

    const doc = (await query.exec()) as RxDocument<Notification>;

    return doc.incrementalModify((docData) => {
      return { ...docData, ...updatedDoc };
    });
  },
};

export { notificationService };
