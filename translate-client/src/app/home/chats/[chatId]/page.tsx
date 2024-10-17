"use client";

import React, { useEffect } from "react";

const Chat = ({ params }: { params: { chat_id: string } }) => {
  useEffect(() => {}, []);
  return <div>Chat {params.chat_id}</div>;
};

export default Chat;
