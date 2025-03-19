import Modal from "../../tweets/Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import MoreButtonMessageMediaUpload from "./MoreButtonMessageMediaUpload";
import { IMoreButtonMessageProps } from "@/interfaces/message.interface";
import MoreButtonDropdown from "./MoreButtonDropdown";
import { useMoreButtonMessage } from "@/hooks/messages/useMoreButtonMessage";
import MoreButtonEllipsis from "./MoreButtonEllipsis";

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
          {isOpen && (
            <MoreButtonDropdown
              isOpen={isOpen}
              handleDelete={handleDelete}
              handleEdit={() => {
                setEdit(true);
              }}
            />
          )}
          {edit && (
            <Modal isModalOpen={edit} toggleModal={setEdit}>
              <div className="space-y-4 p-4">
                <ReactTextareaAutosize
                  maxRows={6}
                  value={text}
                  maxLength={280}
                  wrap="soft"
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-800 bg-transparent p-4 outline-none transition-colors focus:border-neutral-600"
                />
                <MoreButtonMessageMediaUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-full bg-blue-500 px-4 py-2 font-bold transition-colors hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default MoreButtonMessage;
