import { getNotifications } from "@/actions/notification.actions";
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
      {notifications?.length === 0 && <p>No notifications</p>}

      <div>
        {notificationsWithUsers.map((notification: any) => (
          <div
            key={notification._id}
            className="border-y py-3 border-[#2f3336]"
          >
            {renderNotificationCard(notification._doc, notification.owner)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
