"use client";

import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  onDisconnect,
} from "firebase/database";

import { app } from "@/config/firebase";

export function SiteStats() {
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);

  useEffect(() => {
    const db = getDatabase(app);
    const userId = Math.random().toString(36).substr(2, 9);
    const activeUsersRef = ref(db, "activeUsers");
    const userRef = ref(db, `activeUsers/${userId}`);
    const visitorCountRef = ref(db, "visitorCount");

    // Track active users
    set(userRef, {
      timestamp: Date.now(),
      lastActive: Date.now(),
    });

    onDisconnect(userRef).remove();

    // Listen for active users count
    onValue(activeUsersRef, (snapshot) => {
      const users = snapshot.val();
      const count = users ? Object.keys(users).length : 0;

      setActiveUsers(count);
    });

    // Track total visitors
    onValue(visitorCountRef, (snapshot) => {
      const count = snapshot.val() || 0;

      setTotalVisitors(count);
      // Increment count only once per session
      if (count === 0) {
        set(visitorCountRef, 1);
      }
    });

    // Update last active timestamp
    const interval = setInterval(() => {
      set(userRef, {
        timestamp: Date.now(),
        lastActive: Date.now(),
      });
    }, 30000);

    // Cleanup
    return () => {
      clearInterval(interval);
      set(userRef, null);
    };
  }, []);

  return (
    <div className="flex gap-4 text-sm text-default-600">
      <div>
        {activeUsers} {activeUsers === 1 ? "person" : "people"} currently online
      </div>
      <div>•</div>
      <div>
        {totalVisitors} total {totalVisitors === 1 ? "visitor" : "visitors"}
      </div>
    </div>
  );
}
