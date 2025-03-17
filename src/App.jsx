import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/login'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify';
import TeacherPage from './components/TeacherPage'
import StudentPage from './components/StudentPage'
import Protected from './components/Protected'
import ForgetPassword from './components/ForgetPassword'
import PageNotFound from './components/PageNotFound'
import NewPassword from './components/NewPassword'
import TeacherDashboard from './components/TeacherDashboard'
import TeacherStu from './components/TeacherStu'
import TeacherProfile from './components/TeacherProfile'
import { AuthProvider } from './Context/AuthProvider'
import ExamList from './components/ExamList'
import TeacherForm from './components/TeacherForm'
import ExamDetail from './components/ExamDetail'
import EditExam from './components/EditExam'
import StudentDetails from './components/TeacherStudentCom/StudentDetails'
import StudentDashboard from './components/StudentCom/StudentDashboard'
import ExamForm from './components/StudentCom/ExamForm'
import StudentProfile from './components/StudentCom/StudentProfile'
import StudentResult from './components/StudentCom/StudentResult'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home /></Protected>,
    children: [
      {
        path: '/teacher',
        element: <TeacherPage />,
        children: [
          {
            path: '/teacher/',
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
            element: <ExamList/>,
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
        element: <StudentPage/>,
        children: [
          {
            path:'/student/',
            element: <StudentDashboard/>
          },
          {
            path:'/student/profile',
            // element: <TeacherProfile user='Student'/>
            element: <StudentProfile/>
          },{
            path:'/student/examForm',
            element: <ExamForm/>,
          },
          {
            path: '/student/result',
            element: <StudentResult/>
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
    element: <ForgetPassword/>
  }, {
    path: '/newPassword',
    element: <NewPassword/>
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
        <RouterProvider router={router} />
        <ToastContainer />
        </AuthProvider>
      </div>
    </>
  )
}

export default App
