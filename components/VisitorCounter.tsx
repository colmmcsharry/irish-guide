"use client";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";

import { app } from "@/config/firebase";

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Initialize Realtime Database
    const db = getDatabase(app);
    const visitorCountRef = ref(db, "visitorCount");

    // Increment count on page load
    const incrementCount = async () => {
      const newCount = visitorCount + 1;

      await set(visitorCountRef, newCount);
    };

    // Listen for count changes
    onValue(visitorCountRef, (snapshot) => {
      const count = snapshot.val() || 0;

      setVisitorCount(count);
    });

    incrementCount();

    // Cleanup listener on unmount
    return () => {
      // Cleanup happens automatically
    };
  }, []);

  return (
    <div className="text-sm text-default-600">
      {visitorCount} visitors so far
    </div>
  );
}
