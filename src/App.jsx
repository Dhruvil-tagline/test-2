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
import TeacherStu from './components/TeacherCom/TeacherStu';
import StudentDetails from './components/TeacherCom/TeacherStudentCom/StudentDetails';
import TeacherProfile from './components/TeacherProfile';
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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home /></Protected>,
    children: [
      {
        path: '/teacher',
        element: <Navbar navObj={teacherNavObj} />,
        children: [
          {
            path: '/teacher/dashboard',
            element: <TeacherDashboard />,
          },
          {
            path: '/teacher/student',
            element: <TeacherStu />,
          },
          {
            path: '/teacher/student/:id',
            element: <StudentDetails />,
          },
          {
            path: '/teacher/profile',
            element: <TeacherProfile user='Teacher' />,
          },
          {
            path: '/teacher/exams',
            element: <ExamList />,
          },
          {
            path: '/teacher/exam/create',
            element: <TeacherForm />,
          },
          {
            path: '/teacher/exam/:id',
            element: <ExamDetail />,
          },
          {
            path: '/teacher/exam/edit/:id',
            element: <EditExam />,
          },
        ]
      },
      {
        path: '/student/',
        element: <Navbar navObj={studentNavObj} />,
        children: [
          {
            path: '/student/dashboard',
            element: <StudentDashboard />
          },
          {
            path: '/student/profile',
            // element: <TeacherProfile user='Student'/>
            element: <StudentProfile />
          }, {
            path: '/student/examForm',
            element: <ExamForm />,
          },
          {
            path: '/student/result',
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
