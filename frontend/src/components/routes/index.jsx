import { Navigate } from 'react-router-dom';
import HomePage from "../../pages/HomePage";
import WriterPage from "../../pages/WriterPage";
import ReaderPage from "../../pages/ReaderPage";
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";
import WritingLayout from "../writer/WritingLayout";
import Editor from "../wysiwyg/Editor";
import AllContent from "../writer/AllContent";

const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/dashboard',
        element: <WriterPage />,
    },
    {
        path: '/write/:contentType',
        element: <WritingLayout />,
        children: [
            {
                path: "work-status",
                element: <AllContent />,
            },
            {
                path: "editor/:contentId",  // The sub-routes under writing-layout
                element: <Editor />,
            },
            {
                path: '', // Redirect to "editor" by default if no path is provided
                element: <Navigate to="editor" />
            },
            {
                path: "editor",  // Default route (when user visits /writing-layout)
                element: <Editor />,  // Default page (you can change this as needed)
            },
        ],
    },
    {
        path: '/read',
        element: <ReaderPage />,
        children: [
            {
                path: ":contentType",
                element: <ReaderPage />,
            }
        ],
    },
];

export default routes;
