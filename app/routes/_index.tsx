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
     <div className={'flex-col gap-2 pt-3'}>

       <nav className={'text-cyan-700'}>
         <Link className={'p-3'} to={'/not4u/short-reads'}>
           Short reads
         </Link>

         <Link className={'p-3'} to={'/not4u/tags'}>
           Tags
         </Link>
       </nav>
     </div>
   </Authorized>
  );
}
