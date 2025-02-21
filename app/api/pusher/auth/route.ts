import { NextResponse } from "next/server";

import { pusherServer } from "@/config/pusher";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { socket_id, channel_name, username } = data;

    const presenceData = {
      user_id: username,
      user_info: {
        username: username,
      },
    };

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      presenceData,
    );

    console.log("Auth response:", authResponse); // Debug log

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Auth error:", error);

    return NextResponse.json(
      { error: "Error authorizing channel" },
      { status: 500 },
    );
  }
}
