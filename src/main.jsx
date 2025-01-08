import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import './index.css';
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './components/Home.jsx';

// Lazy load components
const AddStudent = lazy(() => import('./components/AddStudent.jsx'));
const StudentList = lazy(() => import('./components/StudentList.jsx'));
const EditStudent = lazy(() => import('./components/EditStudent.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const Signup = lazy(() => import('./components/Signup.jsx'));
const Profile = lazy(() => import('./components/Profile.jsx'));
const Notification = lazy(() => import('./components/Notification.jsx'));
const UploadPdfs = lazy(() => import('./components/UploadPdfs.jsx'));
const AllMaterials = lazy(() => import('./components/AllMaterials.jsx'));
const CreateTest = lazy(() => import('./components/CreateTest.jsx'));
const CreatedTests = lazy(() => import('./components/CreatedTest.jsx'));
const UpdateTest = lazy(() => import('./components/UpdateTest.jsx'));
const TestSubmissions = lazy(() => import('./components/TestSubmissions.jsx'));
const WelcomeDashboard = lazy(() => import('./components/WelcomeDashboard.jsx'));

// Main App with Lazy Loading
function MainApp() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signup',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '/profile/:userId',
      element: (
        <ProtectedRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/dashboard',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <WelcomeDashboard />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/AddStudent',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AddStudent />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/StudentList',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <StudentList />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/EditStudent',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EditStudent />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/Notification',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Notification />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/AddMaterial',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <UploadPdfs />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/AllMateirals',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AllMaterials />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/CreateTests',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateTest />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/CreatedTests',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreatedTests />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/UpdateTest',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <UpdateTest />
            </Suspense>
          ),
        },
        {
          path: '/dashboard/TestSubmissions',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <TestSubmissions />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <h1 className='flex items-center justify-center text-4xl h-screen'>
          404 | page not found
        </h1>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(<MainApp />);
