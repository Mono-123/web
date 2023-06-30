import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import ErrorPage from './pages/error'
import Student from './pages/student'
import StudentList from './pages/student/list'
import StudentId from './pages/student/id'
import StudentDelete from './pages/student/delete'
import StudentEdit from './pages/student/edit'
import StudentInsert from './pages/student/edit/insert'

import Score from './pages/score'
import ScoreList from './pages/score/list'
import ScoreId from './pages/score/id'
import ScoreDelete from './pages/score/delete'
import ScoreEdit from './pages/score/edit'
import ScoreInsert from './pages/score/edit/insert'

// 清除现有的 HTML 内容
document.body.innerHTML = '<div id="app"></div>';

// 管理页面路由 
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
    },
    {
        path: "hello",
        element: <div>world</div>,
    },
    {
        path: "student",
        element: <Student/>,
        children: [
            {
                path: "",
                element: <StudentList/>,
            },
            {
                path: "detail/:id?",
                element: <StudentId/>,
            },
            {
                path: "edit/:id?",
                element: <StudentEdit/>,
            },
            {
                path: "insert/:id?",
                element: <StudentInsert/>,
            },
            {
                path: "delete/:id?",
                element: <StudentDelete/>,
            },
        ]
    },
    {
        path: "score",
        element: <Student/>,
        children: [
            {
                path: "",
                element: <ScoreList/>,
            },
            {
                path: "detail/:id?",
                element: <ScoreId/>,
            },
            {
                path: "edit/:id?",
                element: <ScoreEdit/>,
            },
            {
                path: "insert/:id?",
                element: <ScoreInsert/>,
            },
            {
                path: "delete/:id?",
                element: <ScoreDelete/>,
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
