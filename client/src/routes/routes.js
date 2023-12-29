import { lazy } from 'react';

const Main = lazy(() => import('../pages/Main'));
const Emails = lazy(() => import('../components/Emails'));
const ViewEmail = lazy(() => import('../components/ViewEmail'));
const Login = lazy(() => import('../Login/Login'));
const SignUp = lazy(() => import('../Login/SignUp'));

const routes = {
    main: {
        path: '/',
        element: Main
    },
    emails: {
        path: '/emails',
        element: Emails
    },
    invalid: {
        path: '/*',
        element: Emails
    },
    view: {
        path: '/view',
        element: ViewEmail
    },
    login: {
        path: '/login',
        element: Login
    },
    signUp: {
        path: '/signUp',
        element: SignUp
    }

}

export { routes };