import { Outlet } from 'react-router-dom'

const Home = () => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Home
