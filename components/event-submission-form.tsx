"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import { db } from "@/config/firebase";

export default function SimpleEventSubmissionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const eventData = {
        title,
        description,
      };

      console.log("Data to be sent to Firestore:", eventData);

      const docRef = await addDoc(collection(db, "events"), eventData);

      console.log("Success! Document written with ID: ", docRef.id);
      alert("Event submitted successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting event:", error);
      setError("Error submitting event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Submit Event</h2>

      <div>
        <label className="block mb-1" htmlFor="title">
          Event Title
        </label>
        <input
          required
          className="w-full border rounded p-2"
          id="title"
          placeholder="Enter event title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          required
          className="w-full border rounded p-2"
          id="description"
          placeholder="Enter event description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button
        className="w-full bg-blue-500 text-white rounded p-2"
        disabled={loading}
        type="submit"
      >
        {loading ? "Submitting..." : "Submit Event"}
      </button>
    </form>
  );
}
