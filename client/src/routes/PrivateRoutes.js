/** @format */

import { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
// helpers
import LazyLoad from "src/helpers/LazyLoad";
// lazy components
const PostList = lazy(() => import("src/containers/postlist/PostList"));
const Posts = lazy(() => import("src/containers/createpost/CreatePost"));
const Profile = lazy(() => import("src/containers/profile/Profile"));
const ChangePass = lazy(() => import("src/containers/changepass/ChangePass"));

const routes = [
    {
        path: "/postlist",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <PostList {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/createpost",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Posts {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/profile",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <Profile {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
    {
        path: "/changepass",
        render: (props) => {
            return (
                <Suspense fallback={<LazyLoad />}>
                    <ChangePass {...props} />
                </Suspense>
            );
        },
        exact: true,
    },
];

const PrivateRoutes = () => {
    return (
        <div>
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
            </Switch>
        </div>
    );
};

export default PrivateRoutes;
