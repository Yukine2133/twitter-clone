import React from "react";

import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import Image from "next/image";
import Loading from "../loaders/Loading";
import { CameraIcon } from "@heroicons/react/24/outline";
import { handleImageClick } from "@/utils/handleImageClick";

interface IAvatarUploadProps {
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  avatarProgress: number;
  setAvatarProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadAvatarButtonRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export const AvatarUpload = ({
  avatar,
  avatarProgress,
  setAvatarProgress,
  uploadAvatarButtonRef,
  setAvatar,
  className,
}: IAvatarUploadProps) => {
  return (
    <div
      className={`${className}
      group cursor-pointer`}
      onClick={() => handleImageClick(uploadAvatarButtonRef)}
    >
      <div className="relative h-28 w-28">
        <Image
          src={avatar || "/placeholder.svg"}
          alt="Avatar"
          width={112}
          height={112}
          className="rounded-full max-h-28 border-4 border-black object-cover"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/60 ${
            !avatarProgress &&
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          } `}
        >
          {avatarProgress > 0 ? (
            <Loading className="mt-0" />
          ) : (
            <CameraIcon className="h-8 w-8 text-white" />
          )}
        </div>
      </div>

      <div ref={uploadAvatarButtonRef}>
        <UploadButton
          className="hidden"
          endpoint="messageMedia"
          onClientUploadComplete={(res: any) => {
            if (res?.[0].url) setAvatar(res[0].url);
            setAvatarProgress(0);
          }}
          onUploadProgress={setAvatarProgress}
          onUploadError={(error: Error) => {
            toast.error(`Upload error: ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};
