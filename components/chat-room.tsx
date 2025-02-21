"use client";

import { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

import { pusherClient } from "@/config/pusher";
import { db } from "@/config/firebase";

interface Message {
  message: string;
  username: string;
  timestamp: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  // Load previous messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const messagesRef = collection(db, "messages");
        const q = query(
          messagesRef,
          orderBy("timestamp", "desc"),
          limit(50), // Limit to last 50 messages
        );

        const querySnapshot = await getDocs(q);
        const loadedMessages = querySnapshot.docs
          .map((doc) => doc.data() as Message)
          .reverse(); // Reverse to show oldest first

        setMessages(loadedMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  // Pusher subscription
  useEffect(() => {
    if (!username) {
      const name = prompt("Please enter your username:");

      if (name) setUsername(name);
    }

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("chat");
      channelRef.current.bind("message", (data: Message) => {
        setMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind("message");
        pusherClient.unsubscribe("chat");
        channelRef.current = null;
      }
    };
  }, [username]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !username) return;

    try {
      await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          username,
        }),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading messages...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-blue-100 rounded-lg shadow-md">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.username === username ? "bg-white ml-auto" : "bg-white"
              } max-w-[70%]`}
            >
              <p className="font-semibold text-gray-800 text-sm">
                {msg.username}
              </p>
              <p className="text-black my-2">{msg.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="p-4 border-t" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 border rounded-lg"
              placeholder="Type a message..."
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
