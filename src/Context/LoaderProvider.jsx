import React, { createContext, useContext, useState } from 'react'

const loaderContext = createContext();

const LoaderProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLoading = (val) => {
     setIsLoading(val)
   }
  return (
    <loaderContext.Provider value={{isLoading,setLoading}}>
      {children}
    </loaderContext.Provider>
  )
}

export default LoaderProvider

export const useLoader = () => useContext(loaderContext);