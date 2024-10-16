"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  message: string;
}
const ErrorMessage = (props: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props.message) {
      setVisible(true);
    }
  }, [props]);

  return (
    <div
      className={`flex justify-center bg-border text-red-300 px-4 py-2 rounded-lg 
        ${visible ? "" : "hidden"}
      `}
    >
      <div className="flex justify-between w-full">
        <p>{props.message}</p>
        <button className="text-red-300" onClick={() => setVisible(false)}>
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
