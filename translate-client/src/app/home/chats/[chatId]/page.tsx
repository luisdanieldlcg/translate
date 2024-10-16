import React from "react";

const Chat = ({ params }: { params: { chatId: string } }) => {
  return <div>Chat {params.chatId}</div>;
};

export default Chat;
