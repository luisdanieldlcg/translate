"use client";
import { Textarea } from "@nextui-org/input";
import React from "react";
import { BsSend } from "react-icons/bs";

const ChatInput = () => {
  const [text, setText] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        minRows={1}
        variant="bordered"
        placeholder="Translate anything"
        value={text}
        classNames={{
          input: "outlined-input ",
          inputWrapper: "border-0",
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">
        <BsSend className="text-2xl" />
      </button>
    </form>
  );
};

export default ChatInput;
