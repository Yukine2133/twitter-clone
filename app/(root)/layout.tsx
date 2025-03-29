import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import LeftSideBar from "@/components/layout/LeftSiderBar/LeftSideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomBar from "@/components/layout/BottomBar";
import UserDetails from "@/components/layout/UserDetails";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import RightSideBar from "@/components/layout/RightSideBar/RightSideBar";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/components/layout/QueryProvider";
import BannedProvider from "@/components/ban/BannedProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Grokky",
  description: "Tweeter Grokky AI Chatbot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <BannedProvider>
          <html suppressHydrationWarning={true} lang="en">
            <body
              className={`${poppins.className} bg-black text-white custom-scrollbar`}
            >
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
              />
              <main className="flex justify-center mx-auto">
                <div className="flex w-full max-w-[1300px] justify-center gap-0 lg:gap-4">
                  <div className="w-[68px] max-[800px]:hidden  min-[800px]:w-[88px] lg:w-[275px]">
                    <LeftSideBar />
                    <UserDetails />
                  </div>

                  <section className="w-full min-[600px]:w-[600px] border-x border-[#2f3336] min-h-screen">
                    <div className="w-full mb-10 min-[800px]:mb-0">
                      {children}
                    </div>
                    <BottomBar />
                  </section>

                  <div className="hidden lg:block w-[350px]">
                    <RightSideBar />
                  </div>
                </div>
              </main>
            </body>
          </html>
        </BannedProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
