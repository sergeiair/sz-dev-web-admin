import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { useUserStore } from '~/store/user/store';
import { redirect } from '@remix-run/router';
import Authorized from '~/components/hoc/Authorized';

export const meta: MetaFunction = () => {
  return [
    { title: "Hi" },
    { name: "description", content: "Welcome!" },
  ];
};



export default function Index() {

  return (
   <Authorized>
     <div className={'flex-col gap-2'}>
       <h1 className="p-3 text-3xl font-bold underline">
         Hi there!
       </h1>

       <div>
         <Link className={'p-3 accent-green-700'} to={'/not4u/short-reads'}>
           Create
         </Link>
       </div>
     </div>
   </Authorized>
  );
}
