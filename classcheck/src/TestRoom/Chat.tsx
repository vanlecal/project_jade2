import { useEffect, useState } from "react";
import socket from "./utils/socket"; // Make sure socket.ts is correctly configured

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat_message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("chat_message", (msg: string) => {
      setChatMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, []);

  return (
    <div className="p-5">
      <div className="border p-3 mb-3" style={{height: "200px", overflowY: "auto"}}>
        {chatMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type your message..." 
        className="border p-2"
      />
      <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white">
        Send
      </button>
    </div>
  );
};

export default Chat;
