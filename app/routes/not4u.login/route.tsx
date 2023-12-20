import type { MetaFunction } from "@remix-run/node";
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import TextEdit from '~/components/TextEdit';
import { useCreateShortReadStore } from '~/store/shortReads/store';
import { ShortRead } from '~/dto/short-read';
import { useUserStore } from '~/store/user/store';
import { useNavigate } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{title: "Go away"},
		{name: "description", content: "Go away"},
	];
};

export default function LogIn() {
	const [email, setEmail] = useState('')
	const [pw, setPw] = useState('')
	const store = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (store?.accessToken && store?.idToken) {
			navigate('/');
		}
	}, [store?.accessToken, store?.idToken]);

	return (
		<div className={'p-6 container flex flex-col items-center justify-center min-h-full'}>
			<div className={'py-0 md:py-12 flex flex-col items-center justify-center w-[90vw] md:w-[300px] '}>

				<TextEdit
					id={'email'}
					label={'E-mail'}
					placeholder={'Put e-mail'}
					value={email}
					onChange={(v) => setEmail(v)}
				/>


				<TextEdit
					id={'password'}
					label={'Password'}
					placeholder={'Put password'}
					value={pw}
					type={'password'}
					onChange={(v) => setPw(v)}
				/>

				<div className={'sticky bottom-3 w-100 flex items-center justify-center'}>
					<button
						className="mx-auto mt-6 w-[200px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
						onClick={(e) => {
							e.preventDefault();
							store?.logIn(email, pw);
						}}>
						Log in
					</button>
				</div>
			</div>

		</div>
	);
}
