import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className={title({ class: "text-left mb-6" })}>About</h1>
      <h2 className="text-left mb-6 my-8">
        Everyone is sick of the apps, this site will help you see what else is
        out there.
      </h2>

      <div className="space-y-4 text-left text-default-600">
        <p className="text-lg leading-relaxed">
          Dating in Ireland is a guide to the dating scene in Ireland. We list
          all the upcoming singles events, where you can filter by location,
          age, date, etc.
        </p>

        <p className="text-lg leading-relaxed">
          We will also compile a list of the best date spots in each county. We
          will also have a chatroom where you can meet other singles and make
          friends.
        </p>

        <p className="text-lg leading-relaxed">
          Users will be able to leave comments and reviews about events
          they&apos;ve attended. We will also feature blog posts, podcasts, and
          videos about the dating scene in Ireland.
        </p>
      </div>
    </div>
  );
}
