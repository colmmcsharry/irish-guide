import ChatRoom from "@/components/chat-room";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Group Chat</h1>
      <ChatRoom />
    </div>
  );
}
