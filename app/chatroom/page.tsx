import ChatRoom from "@/components/chat-room";

export default function ChatroomPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-center mb-8 text-3xl font-bold">Chatroom</h1>
      <p className="text-center mb-8 text-black">
        Here you can speak to other people about upcoming events, give reviews
        about past events, or arrange meetups.
      </p>
      <ChatRoom />
    </div>
  );
}
