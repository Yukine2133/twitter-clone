import React from "react";

import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import Image from "next/image";
import Loading from "../../loaders/Loading";
import { CameraIcon } from "@heroicons/react/24/outline";
import { AvatarUpload } from "../AvatarUpload";
import { handleImageClick } from "@/utils/handleImageClick";

interface EditProfileImageUploadProps {
  backgroundImage: string | null;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
  backgroundProgress: number;
  setBackgroundProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadBackgroundButtonRef: React.RefObject<HTMLDivElement>;
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

      <AvatarUpload
        avatar={avatar}
        setAvatar={setAvatar}
        avatarProgress={avatarProgress}
        setAvatarProgress={setAvatarProgress}
        uploadAvatarButtonRef={uploadAvatarButtonRef}
        className="absolute -bottom-16 left-4"
      />
    </div>
  );
};
