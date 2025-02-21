import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";

import { pusherServer } from "@/config/pusher";
import { db } from "@/config/firebase";

export async function POST(request: Request) {
  try {
    const { message, username } = await request.json();
    const timestamp = new Date().toISOString();

    // Store message in Firestore
    await addDoc(collection(db, "messages"), {
      message,
      username,
      timestamp,
    });

    // Trigger Pusher event
    await pusherServer.trigger("chat", "message", {
      message,
      username,
      timestamp,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);

    return NextResponse.json(
      { error: "Error sending message" },
      { status: 500 },
    );
  }
}
