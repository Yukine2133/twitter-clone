import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomBar from "@/components/layout/BottomBar";
import { fetchUser } from "@/actions/user.actions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Tweeter Home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${poppins.className} bg-black text-white `}>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
        />
        <main className="flex  gap-0 lg:gap-4  justify-center ">
          <LeftSideBar currentUser={currentUser} />
          <section className="w-[648px]  border-x border-[#2f3336]  min-h-screen ">
            <div className="w-full mb-10 min-[800px]:mb-0 px-2 md:px-4  max-w-4xl">
              {children}
            </div>
            <BottomBar currentUser={currentUser} />
          </section>
          <RightSideBar />
        </main>
      </body>
    </html>
  );
}
