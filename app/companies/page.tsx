import Link from "next/link";

import { title } from "@/components/primitives";

export default function CompaniesPage() {
  return (
    <div>
      <h1 className={title()}>Companies</h1>
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <Link href="/companies/company1">Company 1</Link>
            <p>Company 1 description</p>
          </li>
          <li>
            <Link href="/companies/company2">Company 2</Link>
            <p>Company 2 description</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
