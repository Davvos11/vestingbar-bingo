import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Beamer from "./beamer/Beamer";
import Dashboard from "./dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<>
            <a href="/beamer">Beamer mode</a><br/>
            <a href="/dashboard">Dashboard</a>
        </>),
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/beamer",
        element: <Beamer />
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

