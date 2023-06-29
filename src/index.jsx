import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import ErrorPage from './pages/error'
import User from './pages/user'
import UserDetail from './pages/user/detail'
import UserTest from './pages/user/test'

import Student from './pages/student'
import StudentDetail from './pages/student/detail'

import Students from './pages/students/body'
import StudentsId from './pages/students/id'
import StudentsPagination from './pages/students/pagination'
import StudentsInsert from './pages/students/insert'
import StudentsUpdate from './pages/students/update'
import StudentsDelete from './pages/students/delete'

import Score from './pages/score/body'
import ScoreId from './pages/score/id'
import ScorePagination from './pages/score/pagination'
import ScoreInsert from './pages/score/insert'
import ScoreUpdate from './pages/score/update'
import ScoreDelete from './pages/score/delete'

import Grade from './pages/grade/body'
import GradeId from './pages/grade/id'
import GradePagination from './pages/grade/pagination'

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
            {
                path: "insert/:name?/:gender?/:grade?/:score?",
                element: <StudentsInsert/>,
            },
            {
                path: "update/:id?/:name?/:gender?/:grade?/:score?",
                element: <StudentsUpdate/>,
            },
            {
                path: "delete/:id?",
                element: <StudentsDelete/>,
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
            {
                path: "insert/:studentId?/:chinese?/:math?/:english?",
                element: <ScoreInsert/>,
            },
            {
                path: "update/:id?/:studentId?/:chinese?/:math?/:english?",
                element: <ScoreUpdate/>,
            },
            {
                path: "delete/:id?",
                element: <ScoreDelete/>,
            },
        ]
    },
    {
        path: "grade",
        element: <Grade/>,
        children: [
            {
                path: "id/:id?",
                element: <GradeId/>,
            },
            {
                path: "pagination/:limit?/:offset?",
                element: <GradePagination/>,
            },
        ]
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
