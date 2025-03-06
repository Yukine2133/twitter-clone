import {
  getNotifications,
  markNotificationAsRead,
} from "@/actions/notification.actions";
import { fetchUser } from "@/actions/user.actions";
import NotificationCard from "@/components/notifications/NotificationCard";
import { INotification } from "@/interfaces/notification.interface";
import { IUser } from "@/interfaces/user.interface";
import { currentUser } from "@clerk/nextjs/server";

const useNotifications = async () => {
  const user = await currentUser();
  const notifications = (await getNotifications(user?.id)) || [];

  notifications.forEach(async (notification) => {
    if (!notification.read) {
      await markNotificationAsRead(notification._id);
    }
  });

  const notificationsWithUsers = await Promise.all(
    notifications?.map(async (notification) => {
      const owner = await fetchUser(notification.userId);
      return {
        ...notification,
        owner,
      };
    })
  );

  const renderNotificationCard = (
    notification: INotification,
    owner: IUser
  ) => {
    const notificationType = notification.type;

    const typeToPropsMap = {
      like: "liked",
      reply: "replied",
      retweet: "retweeted",
      follow: "followed",
    };

    return (
      <NotificationCard
        key={notification._id}
        notification={notification}
        owner={owner}
        type={typeToPropsMap[notificationType]}
      />
    );
  };

  return {
    notifications,
    notificationsWithUsers,
    renderNotificationCard,
  };
};

export default useNotifications;
