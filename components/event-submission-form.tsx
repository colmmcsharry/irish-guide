"use client";

import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { app } from "@/config/firebase";

export function EventSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload image to Firebase Storage
      const storage = getStorage(app);
      const imageRef = ref(
        storage,
        `event-images/${Date.now()}-${imageFile?.name}`,
      );

      let imageUrl = "";

      if (imageFile) {
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // 2. Get form data
      const formData = new FormData(e.currentTarget);
      const eventData = {
        title: formData.get("title"),
        company: formData.get("company"),
        date: formData.get("date"),
        displayDate: new Date(
          formData.get("date") as string,
        ).toLocaleDateString("en-IE", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: `${formData.get("startTime")} - ${formData.get("endTime")}`,
        description: formData.get("description"),
        longDescription: formData.get("longDescription"),
        imageUrl,
        imageAlt: formData.get("imageAlt"),
        county: formData.get("county"),
        ticketUrl: formData.get("ticketUrl"),
        slug: formData
          .get("title")
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-"),
        createdAt: new Date().toISOString(),
      };

      // 3. Save to Firestore
      const db = getFirestore(app);

      await addDoc(collection(db, "events"), eventData);

      // 4. Reset form
      e.currentTarget.reset();
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
        <Input
          required
          label="Event Title"
          name="title"
          placeholder="Singles Run Club, Salthill"
        />
      </div>

      <div>
        <Input
          required
          label="Company/Organizer"
          name="company"
          placeholder="Your Friend My Friend"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input required label="Date" name="date" type="date" />
        <div className="grid grid-cols-2 gap-2">
          <Input required label="Start Time" name="startTime" type="time" />
          <Input required label="End Time" name="endTime" type="time" />
        </div>
      </div>

      <div>
        <Input
          required
          accept="image/*"
          label="Event Image"
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <Input
          required
          label="Image Alt Text"
          name="imageAlt"
          placeholder="Singles Run Club Salthill event"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Short Description
        </label>
        <textarea
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          name="description"
          placeholder="A casual 5k run in Salthill, followed by pints and craic."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Long Description
        </label>
        <textarea
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          name="longDescription"
          placeholder="Join us for a morning run along the beautiful Salthill promenade. All fitness levels welcome."
          rows={5}
        />
      </div>

      <div>
        <Input required label="County" name="county" placeholder="Galway" />
      </div>

      <div>
        <Input
          required
          label="Ticket URL"
          name="ticketUrl"
          placeholder="https://tickets.example.com/your-event"
          type="url"
        />
      </div>

      <Button
        className="w-full"
        color="primary"
        isLoading={loading}
        type="submit"
      >
        Submit Event
      </Button>
    </form>
  );
}
