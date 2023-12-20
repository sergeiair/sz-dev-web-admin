import { json, LoaderFunctionArgs } from '@remix-run/router';
import { CognitoIdentityProvider, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import * as process from 'process';
import { redirect } from '@remix-run/node';


export async function action({request}: LoaderFunctionArgs) {
	if (request.method !== 'POST') return new Response("Use POST", {
		status: 405,
	});

	const reqJson = await request.json()
	const cognitoClient = new CognitoIdentityProvider({
		region: process.env.COGNITO_REGION,
	})
	const params = {
		ClientId: process.env.COGNITO_APP_CLIENT_ID,
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		IdToken: reqJson.idToken,
		AccessToken: reqJson.accessToken
	}

	try {
		const response = await cognitoClient.send(
			new GetUserCommand(params)
		);

		return json({
			result: response
		}, {
			status: 200,
		})
	} catch (err: any) {
		return json(
			"Failed", {
				status: 400,
			},
		)
	}
}
