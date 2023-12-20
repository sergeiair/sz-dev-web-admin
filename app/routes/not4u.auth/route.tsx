import { json, LoaderFunctionArgs } from '@remix-run/router';
import {
	CognitoIdentityProvider,
	InitiateAuthCommandInput,
	RespondToAuthChallengeCommandInput
} from '@aws-sdk/client-cognito-identity-provider';
import * as process from 'process';


export async function action({request}: LoaderFunctionArgs) {
	if (request.method !== 'POST') return new Response("Use POST", {
		status: 405,
	});

	const reqJson = await request.json()
	const cognitoClient = new CognitoIdentityProvider({
		region: process.env.COGNITO_REGION,
	})
	const params = {
		AuthFlow: 'USER_PASSWORD_AUTH',
		ClientId: process.env.COGNITO_APP_CLIENT_ID,
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		AuthParameters: {
			USERNAME: reqJson.email,
			PASSWORD: reqJson.pw
		}
	}

	try {
		const response = await cognitoClient.initiateAuth(params as InitiateAuthCommandInput);
		let changeResponse;

		if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
			const pwChangeParams = {
				ChallengeName: 'NEW_PASSWORD_REQUIRED',
				ClientId: process.env.COGNITO_APP_CLIENT_ID,
				ChallengeResponses: {
					"userAttributes.name": reqJson.email,
					NAME: reqJson.email,
					USERNAME: reqJson.email,
					NEW_PASSWORD: reqJson.pw
				},
				Session: response.Session
			};

			changeResponse = await cognitoClient.respondToAuthChallenge(pwChangeParams as RespondToAuthChallengeCommandInput)
		}


		return json({
			result: changeResponse?.AuthenticationResult ?? response.AuthenticationResult
		}, {
			status: 200,
		})
	} catch (err: any) {
		return json(
			err, {
				status: 400,
			},
		)
	}
}
