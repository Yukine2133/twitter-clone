import { RefObject } from "react";

export const handleImageClick = (
  uploadButtonRef: RefObject<HTMLDivElement>
) => {
  const uploadDiv = uploadButtonRef.current;
  if (uploadDiv) {
    const input = uploadDiv.querySelector(
      "input[type='file']"
    ) as HTMLInputElement;
    if (input) {
      input.click();
    }
  }
};
