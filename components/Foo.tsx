import React from "react";

const Foo = ({ children, id }: { children: React.ReactNode; id: string }) => {
  return (
    <dialog id={id} className="modal ">
      <div className="modal-box ">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Foo;
