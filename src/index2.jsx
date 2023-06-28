import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import ErrorPage from './pages/error'
import Student from './pages/student'
import StudentDetail from './pages/student/detail'

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
        path: "student",
        element: <Student />,
        children: [
            {
                path: "detail/:id?",
                element: <StudentDetail />,
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