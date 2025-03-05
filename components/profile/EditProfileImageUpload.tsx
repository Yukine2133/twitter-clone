import React from "react";

import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import Image from "next/image";
import Loading from "../Loading";
import { CameraIcon } from "@heroicons/react/24/outline";

interface EditProfileImageUploadProps {
  backgroundImage: string | null;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
  backgroundProgress: number;
  setBackgroundProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadBackgroundButtonRef: React.RefObject<HTMLDivElement>;
  handleImageClick: (ref: React.RefObject<HTMLDivElement>) => void;
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  avatarProgress: number;
  setAvatarProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadAvatarButtonRef: React.RefObject<HTMLDivElement>;
}

export const EditProfileImageUpload = ({
  backgroundImage,
  setBackgroundImage,
  backgroundProgress,
  setBackgroundProgress,
  uploadBackgroundButtonRef,
  handleImageClick,
  avatar,
  setAvatar,
  avatarProgress,
  setAvatarProgress,
  uploadAvatarButtonRef,
}: EditProfileImageUploadProps) => {
  return (
    <div className="relative">
      <div className="relative group cursor-pointer h-48 w-full bg-neutral-800">
        {backgroundImage && (
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Background"
            fill
            className="object-cover"
          />
        )}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/60 ${
            !backgroundProgress &&
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          }`}
          onClick={() => handleImageClick(uploadBackgroundButtonRef)}
        >
          {backgroundProgress > 0 ? (
            <Loading className="mt-0" />
          ) : (
            <CameraIcon className="h-8 w-8 text-white" />
          )}
        </div>
      </div>

      <div ref={uploadBackgroundButtonRef}>
        <UploadButton
          className="hidden"
          endpoint="messageMedia"
          onClientUploadComplete={(res: any) => {
            if (res?.[0].url) setBackgroundImage(res[0].url);
            setBackgroundProgress(0);
          }}
          onUploadProgress={setBackgroundProgress}
          onUploadError={(error: Error) => {
            toast.error(`Upload error: ${error.message}`);
          }}
        />
      </div>

      <div
        className="absolute -bottom-16 left-4 group cursor-pointer"
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
    </div>
  );
};
