import {
  getNotifications,
  markNotificationAsRead,
} from "@/actions/notification.actions";
import { fetchUser } from "@/actions/user.actions";
import NotificationCard from "@/components/notifications/NotificationCard";
import { INotification } from "@/types/notification.interface";
import { IUser } from "@/types/user.interface";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications Page",
};

const NotificationsPage = async () => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();
  const notifications = (await getNotifications(currentUser?.id)) || [];

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
        notification={notification}
        owner={owner}
        type={typeToPropsMap[notificationType]}
      />
    );
  };

  return (
    <div>
      <h2 className="text-xl my-2 font-semibold">Notifications</h2>
      {notifications?.length === 0 && (
        <p className="text-2xl mt-8">No notifications.</p>
      )}

      {notificationsWithUsers.map((notification: any) => (
        <div key={notification._id} className="py-2">
          {renderNotificationCard(notification._doc, notification.owner)}
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
