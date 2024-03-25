import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white`}>
        <main className="grid place-content-center place-items-center grid-cols-3 ">
          <LeftSideBar />
          <section className="container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <RightSideBar />
        </main>
      </body>
    </html>
  );
}
