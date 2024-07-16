import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomBar from "@/components/layout/BottomBar";
import UserDetails from "@/components/layout/UserDetails";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

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
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={`${poppins.className} bg-black text-white custom-scrollbar `}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
        />
        <main className="flex  gap-0 lg:gap-4 mx-auto  justify-center ">
          <div>
            <LeftSideBar />
            <UserDetails />
          </div>

          <section className="w-[648px] min-[800px]:ml-24 lg:ml-[180px] xl:ml-60  border-x border-[#2f3336]  min-h-screen ">
            <div className="w-full mb-10 min-[800px]:mb-0   max-w-4xl">
              {children}
            </div>
            <BottomBar />
          </section>
          <div>
            <RightSideBar />
          </div>
        </main>
      </body>
    </html>
  );
}
