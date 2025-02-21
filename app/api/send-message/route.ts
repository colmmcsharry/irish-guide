import { NextResponse } from "next/server";

import { pusherServer } from "@/config/pusher";

export async function POST(request: Request) {
  try {
    const { message, username } = await request.json();

    await pusherServer.trigger("chat", "message", {
      message,
      username,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending message" },
      { status: 500 },
    );
  }
}
