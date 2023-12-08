import type { MetaFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Hi" },
    { name: "description", content: "Welcome!" },
  ];
};

export default function Index() {
  return (
    <div className={'flex-col gap-2'}>
      <h1 className="p-3 text-3xl font-bold underline">
        Hi there!
      </h1>

      <div>
        <Link className={'p-3 accent-green-700'} to={'/create'}>
          Create
        </Link>
      </div>
    </div>
  );
}
