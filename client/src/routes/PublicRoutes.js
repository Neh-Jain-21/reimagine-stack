/** @format */

import { useEffect, Suspense, lazy } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// components
import PrivateRoutes from "src/routes/PrivateRoutes";
// helpers
import LazyLoad from "src/helpers/LazyLoad";
// lazy components
const NavBar = lazy(() => import("src/containers/navbar/NavBar"));
const Signin = lazy(() => import("src/containers/signin/Signin"));
const Register = lazy(() => import("src/containers/register/Register"));
const Forgotpass = lazy(() => import("src/containers/forgotpass/Forgotpass"));
const Emailverification = lazy(() => import("src/containers/emailverification/Emailverification"));
const ResetPassword = lazy(() => import("src/containers/resetpassword/ResetPassword"));

const routes = [
    {
        path: "/",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Signin {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/signin",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Signin {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/register",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Register {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/forgotpass",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Forgotpass {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/emailverification",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Emailverification {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/resetpassword",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <ResetPassword {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
];

const PublicRoutes = () => {
    const history = useHistory();

    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/postlist");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Suspense fallback={<LazyLoad />}>
                <NavBar />
            </Suspense>
            <Switch>
                {routes.map((route) => {
                    return (
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            render={route.render}
                        />
                    );
                })}
                <Route
                    render={() =>
                        isLoggedIn ? (
                            <PrivateRoutes />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/signin",
                                }}
                            />
                        )
                    }
                />
            </Switch>
        </>
    );
};

export default PublicRoutes;
