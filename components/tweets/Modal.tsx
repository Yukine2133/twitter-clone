import { cn } from "@/utils/cn";
import useClickOutside from "@/hooks/useClickOutisde";
import { useRef, type ReactNode } from "react";

interface IModalProps {
  isModalOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({
  isModalOpen,
  toggleModal,
  children,
  className,
}: IModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(isModalOpen, toggleModal, ref);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-sm">
          <div
            ref={ref}
            className={cn(
              "w-full max-w-[700px] min-h-[200px] max-h-[900px] rounded-2xl bg-black",
              "mx-4    overflow-y-auto",
              className
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
