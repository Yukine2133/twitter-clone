import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${poppins.className} bg-black text-white `}>
        <main className="flex  justify-center items-center">
          <LeftSideBar user={user!} />
          <section className="  w-[648px] border-x border-[#2f3336] px-4 min-h-screen ">
            <div className="w-full  max-w-4xl">{children}</div>
          </section>
          {/* <RightSideBar /> */}
        </main>
      </body>
    </html>
  );
}
