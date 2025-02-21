"use client";

import React, { useState, FormEvent } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { db, storage } from "../config/firebase";

export default function EventSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(
          storage,
          `event-images/${Date.now()}-${imageFile.name}`,
        );

        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Get the form element directly from the event
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const eventData = {
        title: formData.get("title") as string,
        company: formData.get("company") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
        description: formData.get("description") as string,
        longDescription: formData.get("longDescription") as string,
        imageUrl,
        county: formData.get("county") as string,
        ticketUrl: formData.get("ticketUrl") as string,
        slug: formData
          .get("title")
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-"),
      };

      await addDoc(collection(db, "events"), eventData);

      form.reset();
      setImageFile(null);
      alert("Event submitted successfully!");
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Error submitting event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6 max-w-2xl mx-auto p-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Submit New Event</h2>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Event Title
        </label>
        <input
          required
          className="w-full px-3 py-2 border rounded-lg"
          id="title"
          name="title"
          placeholder="Singles Run Club, Salthill"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="company">
          Company/Organizer
        </label>
        <input
          required
          className="w-full px-3 py-2 border rounded-lg"
          id="company"
          name="company"
          placeholder="Your Friend My Friend"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="date">
            Date
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-lg"
            id="date"
            name="date"
            type="date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="time">
            Time
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-lg"
            id="time"
            name="time"
            placeholder="7pm - 9pm"
            type="text"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="image">
          Event Image
        </label>
        <input
          required
          accept="image/*"
          className="w-full"
          id="image"
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="description">
          Short Description
        </label>
        <textarea
          required
          className="w-full px-3 py-2 border rounded-lg"
          id="description"
          name="description"
          placeholder="A casual 5k run in Salthill, followed by pints and craic."
          rows={3}
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="longDescription"
        >
          Long Description
        </label>
        <textarea
          required
          className="w-full px-3 py-2 border rounded-lg"
          id="longDescription"
          name="longDescription"
          placeholder="Join us for a morning run along the beautiful Salthill promenade. All fitness levels welcome."
          rows={5}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="county">
          County
        </label>
        <input
          required
          className="w-full px-3 py-2 border rounded-lg"
          id="county"
          name="county"
          placeholder="Galway"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="ticketUrl">
          Ticket URL
        </label>
        <input
          required
          className="w-full px-3 py-2 border rounded-lg"
          id="ticketUrl"
          name="ticketUrl"
          placeholder="https://tickets.example.com/your-event"
          type="url"
        />
      </div>

      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
        type="submit"
      >
        {loading ? "Submitting..." : "Submit Event"}
      </button>
    </form>
  );
}
