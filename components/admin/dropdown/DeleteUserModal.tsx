import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IDeleteUserModalProps } from "@/interfaces/props.interface";
export const DeleteUserModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDeleteSubmit,
}: IDeleteUserModalProps) => {
  return (
    <AlertDialog
      open={!!isDeleteModalOpen}
      onOpenChange={(open) => !open && setIsDeleteModalOpen(false)}
    >
      <AlertDialogContent className="bg-[#222] text-white border-[#333]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-[#444] text-white hover:bg-[#333] hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleDeleteSubmit}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
