
import React, { ComponentType, ReactElement, ReactPropTypes, useEffect } from 'react';
import { useUserStore } from '~/store/user/store';
import { useNavigate } from '@remix-run/react';

const Authorized = ({children}: {children: ReactElement<any, any>}) => {

	const store = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!store?.accessToken || !store?.idToken) {
			navigate('/not4u/login');
		} else {
			store?.getUser()
		}
	}, [store?.accessToken, store?.idToken]);

	return <>
		{children}
	</>
};

export default Authorized;
