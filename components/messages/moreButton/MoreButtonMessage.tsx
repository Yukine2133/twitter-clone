import { IMoreButtonMessageProps } from "@/interfaces/message.interface";
import MoreButtonDropdown from "../../buttons/moreButton/MoreButtonDropdown";
import { useMoreButtonMessage } from "@/hooks/messages/useMoreButtonMessage";
import MoreButtonEllipsis from "../../buttons/moreButton/MoreButtonEllipsis";
import { MoreButtonMessageModal } from "./MoreButtonMessageModal";

const MoreButtonMessage = ({
  messageId,
  message,
  recipientId,
  currentUserId,
}: IMoreButtonMessageProps) => {
  const {
    isOpen,
    setIsOpen,
    isOwner,
    buttonRef,
    handleDelete,
    handleSubmit,
    edit,
    setEdit,
    text,
    setText,
    imageUrl,
    setImageUrl,
  } = useMoreButtonMessage({
    message,
    messageId,
    recipientId,
    currentUserId,
  });
  return (
    <>
      {isOwner && (
        <>
          <MoreButtonEllipsis
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
          />
          <MoreButtonDropdown
            isOpen={isOpen}
            handleDelete={handleDelete}
            handleEdit={() => {
              setEdit(true);
            }}
          />
          <MoreButtonMessageModal
            edit={edit}
            setEdit={setEdit}
            text={text}
            setText={setText}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default MoreButtonMessage;
