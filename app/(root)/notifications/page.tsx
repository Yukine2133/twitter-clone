import useNotifications from "@/hooks/useNotifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications Page",
};

const NotificationsPage = async () => {
  const { notifications, notificationsWithUsers, renderNotificationCard } =
    await useNotifications();

  return (
    <div className="">
      <h2 className="text-xl my-2 font-semibold px-2 md:px-4">Notifications</h2>
      {notifications?.length === 0 && (
        <p className="text-2xl mt-8 px-2 md:px-4">No notifications.</p>
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
