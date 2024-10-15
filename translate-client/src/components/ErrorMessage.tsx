"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  message: string;
}
const ErrorMessage = ({ message }: Props) => {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      className={`flex justify-center bg-border text-red-300 px-4 py-2 rounded-lg ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex justify-between w-full">
        <p>{message}</p>
        <button className="text-red-300">
          <IoCloseOutline onClick={() => setHidden(true)} />
        </button>
      </div>
    </div>
  );
};
export default ErrorMessage;
