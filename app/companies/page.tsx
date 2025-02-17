import Link from "next/link";

export default function CompaniesPage() {
  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">Companies</h1>
      <p>
        Here are some of the companies putting on regular singles events in
        Ireland.
      </p>
      <div className="flex flex-col gap-4 max-w-4xl px-4 py-8">
        <ul className="list-disc">
          <li className="my-8">
            <Link
              className="text-2xl mb-210 font-bold"
              href="/companies/pitch-a-friend"
            >
              Pitch a Friend
            </Link>
            <p className="mt-2">
              Pitch a Friend is a viral new dating craze that has come from
              America to Ireland. At these events, friends prepare and present a
              3-minute pitch about a single person they know, and get them dates
              from the audience.
            </p>
          </li>
          <li className="my-8">
            <Link
              className="text-2xl my-4 font-bold"
              href="/companies/your-friend-my-friend"
            >
              Your Friend My Friend
            </Link>
            <p className="mt-2">
              Your Friend My Friend is an Irish dating company, known for their
              speed dating events and singles Run Clubs (followed by pints and
              pizza!).
            </p>
          </li>
          <li className="my-8">
            <Link
              className="text-2xl my-4 font-bold"
              href="/companies/your-friend-my-friend"
            >
              Katch
            </Link>
            <p className="mt-2">
              Katch is a membership-based app and dating company that runs
              regular speed dating events in Ireland, as well as online events.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
