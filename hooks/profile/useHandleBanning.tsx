import { updateBanStatus } from "@/actions/user.actions";
import { banReasonSchema } from "@/utils/lib/validation";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

export const useHandleBanning = (userId: string) => {
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState("");

  const handleBanSubmit = async () => {
    try {
      banReasonSchema.parse(banReason);

      await updateBanStatus(userId, true, banReason);

      toast.success("User has been successfully banned.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage);
      } else {
        toast.error(String(error));
      }
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
    handleBanSubmit,
    handleUnBan,
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
  };
};
