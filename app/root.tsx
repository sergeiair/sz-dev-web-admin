import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from "@remix-run/react";
import stylesheet from "~/styles/tailwind.css";
import * as process from 'process';
import { useEffect, useState } from 'react';
import { json } from '@remix-run/router';
import { ClientStorage, ClientStorageKeys } from '~/storage/client-storage';
import { useUserStore } from '~/store/user/store';


export const links: LinksFunction = () => [
	{rel: "stylesheet", href: stylesheet},
];

export function loader(): Response {
	return json(process.env);
}

export default function App() {
	const data = useLoaderData<typeof loader>();
	const store = useUserStore();
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		store?.setSession(
			ClientStorage.get(ClientStorageKeys.accessToken),
			ClientStorage.get(ClientStorageKeys.idToken)
		)

		setInitialized(true);
	}, []);

	return (
		<html lang="en">
		<head>

			<meta charSet="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<Meta/>
			<Links/>
		</head>
		<body>
		{initialized ? <Outlet/> : <></>}
		<ScrollRestoration/>
		<script
			dangerouslySetInnerHTML={{
				__html: `window.ENV = ${JSON.stringify(
					data ?? {},
				)}`,
			}}
		/>
		<Scripts/>
		<LiveReload/>
		</body>
		</html>
	);
}
