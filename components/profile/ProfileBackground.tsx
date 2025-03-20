import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import React from "react";

export const ProfileBackground = ({ user }: { user: IUser }) => {
  return (
    <div className="relative">
      {user.backgroundImage ? (
        <Image
          src={user.backgroundImage}
          alt="Background image"
          width={1200}
          height={20}
          className="w-full h-48 md:h-56 object-cover"
        />
      ) : (
        <div className="w-full h-48 md:h-56 bg-[#333639]" />
      )}
      <Image
        className="rounded-full absolute left-4 border-4 border-black object-cover"
        style={{
          width: "120px",
          height: "120px",
          bottom: "-60px",
        }}
        src={user.avatar}
        alt={user.username}
        width={120}
        height={120}
      />
    </div>
  );
};
