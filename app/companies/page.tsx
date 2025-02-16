import Link from "next/link";

import { title } from "@/components/primitives";

export default function CompaniesPage() {
  return (
    <div>
      <h1 className={title()}>Companies</h1>
      <div className="flex flex-col gap-4">
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
              3 minute pitch about a single person they know, and gets them
              dates from the audience.
            </p>
          </li>
          <li>
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
        </ul>
      </div>
    </div>
  );
}
