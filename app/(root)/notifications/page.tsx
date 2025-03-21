import useNotifications from "@/hooks/useNotifications";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications Page",
};

const NotificationsPage = async () => {
  const { notifications, notificationsWithUsers, renderNotificationCard } =
    await useNotifications();

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-[#2f3336]">
        <h2 className="text-xl py-3 font-bold px-4">Notifications</h2>
      </div>

      {notifications?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">No notifications yet</h3>
          <p className="text-gray-500 max-w-md">
            When someone interacts with your Tweets or follows you, it&apos;ll
            show up here.
          </p>
        </div>
      ) : (
        <div>
          {notificationsWithUsers.map((notification: any) => (
            <div key={notification._id || notification._doc?._id}>
              {renderNotificationCard(
                notification._doc || notification,
                notification.owner
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
