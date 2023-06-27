import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import ErrorPage from './pages/error'
import User from './pages/user'
import UserDetail from './pages/user/detail'
import UserTest from './pages/user/test'

import Students from './appstudents'
import StudentsId from './pages/students/id'
import StudentsPagination from './pages/students/pagination'

import Score from './Appscore'
import ScoreId from './pages/score/id'
import ScorePagination from './pages/score/pagination'

// 清除现有的 HTML 内容
document.body.innerHTML = '<div id="app"></div>';

// 管理页面路由 
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "hello",
        element: <div>world</div>,
    },
    {
        path: "user",
        element: <User />,
        children: [
            {
                path: "detail/:id?",
                element: <UserDetail />,
            },
            {
                path: "test/:a?/:b?",
                element: <UserTest />,
            },
        ]
    },
    {
        path: "students",
        element: <Students/>,
        children: [
            {
                path: "id/:id?",
                element: <StudentsId/>,
            },
            {
                path: "pagination/:limit?/:offset?",
                element: <StudentsPagination/>,
            },
        ]
    },
    {
        path: "score",
        element: <Score/>,
        children: [
            {
                path: "id/:id?",
                element: <ScoreId/>,
            },
            {
                path: "pagination/:limit?/:offset?",
                element: <ScorePagination/>,
            },
        ]
    },
]);

// 渲染你的 React 组件
const root = createRoot(document.getElementById('app'));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
