import './ComponentCss/Loader.css'
import { useLoader } from '../Context/LoaderProvider'

const Loader = () => {
  const { isLoading } = useLoader();
  if (!isLoading) {
    return null;
  }
  return (
    <div className='loader-container' >
      {isLoading && <div className='loader-overlay'><span className="loader"></span></div>}
    </div>
  )
}

export default Loader
