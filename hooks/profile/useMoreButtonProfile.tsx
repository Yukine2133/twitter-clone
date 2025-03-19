import { useRef, useState } from "react";
import { updateBanStatus } from "@/actions/user.actions";
import { toast } from "react-toastify";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutside";
export const useMoreButtonProfile = (userId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState("");

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const handleBanSubmit = async () => {
    try {
      await updateBanStatus(userId, true, banReason);

      toast.success("User has been successfully banned.");
    } catch (error) {
    } finally {
      setIsBanModalOpen(false);
      setBanReason("");
    }
  };

  const handleUnBan = async () => {
    try {
      await updateBanStatus(userId, false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsBanModalOpen(false);
    }
  };
  return {
    isOpen,
    setIsOpen,
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
    buttonRef,
    handleBanSubmit,
    handleUnBan,
  };
};
