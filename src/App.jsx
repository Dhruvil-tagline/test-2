import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import { AuthProvider } from './Context/AuthProvider';
import LoaderProvider from './Context/LoaderProvider';
import SignUp from './components/AuthComponent/SignUp';
import Protected from './components/AuthComponent/Protected';
import ForgetPassword from './components/AuthComponent/ForgetPassword';
import NewPassword from './components/AuthComponent/NewPassword';
import Login from './components/AuthComponent/Login';
import TeacherDashboard from './components/TeacherCom/TeacherDashboard';
import StudentDetails from './components/TeacherCom/TeacherStudentCom/StudentDetails';
import ExamList from './components/TeacherCom/ExamList';
import TeacherForm from './components/TeacherCom/TeacherForm';
import ExamDetail from './components/TeacherCom/ExamDetail';
import EditExam from './components/TeacherCom/EditExam';
import StudentDashboard from './components/StudentCom/StudentDashboard';
import Navbar from './components/Navbar';
import StudentProfile from './components/StudentCom/StudentProfile';
import ExamForm from './components/StudentCom/ExamForm';
import StudentResult from './components/StudentCom/StudentResult';
import { studentNavObj, teacherNavObj } from './StaticData/staticObj';
import AllStudent from './components/TeacherCom/TeacherStudentCom/AllStudent';
import EditProfile from './components/StudentCom/EditProfile';
import ResetPassword from './components/ResetPassword';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home /></Protected>,
    children: [
      {
        path: 'teacher',
        element: <Navbar navObj={teacherNavObj} />,
        children: [
          {
            path: 'dashboard',
            element: <TeacherDashboard />,
          },
          {
            path: 'teacherForm',
            element: <TeacherForm/>
          },
          {
            path: 'student',
            element: <AllStudent />,
          },
          {
            path: 'student/:id',
            element: <StudentDetails />,
          },
          {
            path: 'profile',
            element: <ResetPassword />,
          },
          {
            path: 'exams',
            element: <ExamList />,
          },
          {
            path: 'exam/create',
            element: <TeacherForm />,
          },
          {
            path: 'exam/:id',
            element: <ExamDetail />,
          },
          {
            path: 'exam/edit/:id',
            element: <EditExam />,
          },
        ]
      },
      {
        path: '/student',
        element: <Navbar navObj={studentNavObj} />,
        children: [
          {
            path: 'dashboard',
            element: <StudentDashboard />
          },
          {
            path: 'profile',
            element: <StudentProfile />,
            children: [
              {
                path: "editName",
                element: <EditProfile />
              },
              {
                path: "resetPassword",
                element: <ResetPassword />
              }
            ]
          }, {
            path: 'examForm',
            element: <ExamForm />,
          },
          {
            path: 'result',
            element: <StudentResult />
          }
        ]
      },
    ]
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgetPassword',
    element: <ForgetPassword />
  }, {
    path: '/newPassword',
    element: <NewPassword />
  }
  , {
    path: '*',
    element: <PageNotFound />
  }
])

function App() {
  return (
    <>
      <div className='rootContainer'>
        <AuthProvider>
          <LoaderProvider>
            <RouterProvider router={router} />
          </LoaderProvider>
          <ToastContainer />
        </AuthProvider>
      </div>
    </>
  )
}

export default App
