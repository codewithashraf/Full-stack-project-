import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AddStudent from './components/AddStudent.jsx';
import StudentList from './components/StudentList.jsx';
import EditStudent from './components/EditStudent.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WelcomeDashboard from './components/WelcomeDashboard.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import Notification from './components/Notification.jsx';
import UploadPdfs from './components/UploadPdfs.jsx';
import AllMaterials from './components/AllMaterials.jsx';
import CreateTest from './components/CreateTest.jsx';
import CreatedTests from './components/CreatedTest.jsx';
import UpdateTest from './components/UpdateTest.jsx';
import TestSubmissions from './components/TestSubmissions.jsx';
import Home from './components/Home.jsx';

function MainApp() {
  // const [userId, setUserId] = useState(null);
  // const [adminId, setAdminId] = useState(null);

  // useEffect(() => {
  //   const storedAdminId = sessionStorage.getItem('sir_logged_in');
  //   const storedUserId = sessionStorage.getItem('userId');
  //   setAdminId(storedAdminId);
  //   setUserId(storedUserId);
  // }, []);

  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/profile/:userId',
      element: (
        <ProtectedRoute>
          <Profile />
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
          element: <WelcomeDashboard />,
        },
        {
          path: '/dashboard/AddStudent',
          element: <AddStudent />,
        },
        {
          path: '/dashboard/StudentList',
          element: <StudentList />,
        },
        {
          path: '/dashboard/EditStudent',
          element: <EditStudent />,
        },
        {
          path: '/dashboard/Notification',
          element: <Notification />,
        },
        {
          path: '/dashboard/AddMaterial',
          element: <UploadPdfs />,
        },
        {
          path: '/dashboard/AllMateirals',
          element: <AllMaterials />,
        },
        {
          path: '/dashboard/CreateTests',
          element: <CreateTest />,
        },
        {
          path: '/dashboard/CreatedTests',
          element: <CreatedTests />,
        },
        {
          path: '/dashboard/UpdateTest',
          element: <UpdateTest />,
        },
        {
          path: '/dashboard/TestSubmissions',
          element: <TestSubmissions />,
        },
      ],
    },
    {
      path: '*',
      element: <h1 className='flex items-center justify-center text-4xl h-screen'>404 | page not found</h1>
    }
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(<MainApp />);
