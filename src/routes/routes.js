import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import React from 'react';

const routes = [
    {
        path: '/admin',
        name: 'Admin',
        element: <Dashboard /> // You can specify a default component for this route if needed
    },
    {
        path: '/admin/dashboard',
        name: 'Dashboard',
        element: <Dashboard /> // Correctly link the Dashboard component
    },
    {
        path: '/admin/profile',
        name: 'Profile',
        element: <Profile />
    },
];

export default routes;

