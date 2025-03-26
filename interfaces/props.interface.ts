import { FormEvent } from "react";

export interface IDropdownActionsModalRenderingProps {
  toggleModal: () => void;
  isModalOpen: boolean;
  name: string;
  setName: (arg0: string) => void;
  username: string;
  setUsername: (arg0: string) => void;
  bio: string;
  setBio: (arg0: string) => void;
  location: string;
  setLocation: (arg0: string) => void;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  backgroundImage: string;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
  uploadAvatarButtonRef: React.RefObject<HTMLDivElement>;
  uploadBackgroundButtonRef: React.RefObject<HTMLDivElement>;
  avatarProgress: number;
  setAvatarProgress: React.Dispatch<React.SetStateAction<number>>;
  backgroundProgress: number;
  setBackgroundProgress: React.Dispatch<React.SetStateAction<number>>;
  isBanModalOpen: boolean;
  setIsBanModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  banReason: string;
  setBanReason: React.Dispatch<React.SetStateAction<string>>;
  handleBanSubmit: () => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSubmit: () => void;
}

export interface IEditProfileModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  name: string;
  setName: (arg0: string) => void;
  username: string;
  setUsername: (arg0: string) => void;
  bio: string;
  setBio: (arg0: string) => void;
  location: string;
  setLocation: (arg0: string) => void;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  backgroundImage: string;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
  uploadAvatarButtonRef: React.RefObject<HTMLDivElement>;
  uploadBackgroundButtonRef: React.RefObject<HTMLDivElement>;
  backgroundProgress: number;
  setBackgroundProgress: React.Dispatch<React.SetStateAction<number>>;
  avatarProgress: number;
  setAvatarProgress: React.Dispatch<React.SetStateAction<number>>;
}

export interface IDeleteUserModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSubmit: () => void;
}

export interface IBannedPageContentProps {
  username: string;
  banReason: string;
  userId: string;
}
