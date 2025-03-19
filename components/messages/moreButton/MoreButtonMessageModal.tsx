import React from "react";
import Modal from "../../tweets/Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import MoreButtonMessageMediaUpload from "./MoreButtonMessageMediaUpload";

interface IMoreButtonMessageModal {
  edit: boolean;
  setEdit: (arg0: boolean) => void;
  text: string;
  setText: (arg0: string) => void;
  imageUrl: string | null;
  setImageUrl: (arg0: string) => void;
  handleSubmit: () => void;
}
export const MoreButtonMessageModal = ({
  edit,
  setEdit,
  text,
  setText,
  imageUrl,
  setImageUrl,
  handleSubmit,
}: IMoreButtonMessageModal) => {
  return (
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
  );
};
