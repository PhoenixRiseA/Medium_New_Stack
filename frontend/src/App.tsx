
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';

import './App.css';

import { authState } from "./store/atoms/authState";
import { useRecoilValue } from 'recoil';
import { Suspense, lazy } from 'react';
import { Spinner } from './components/Spinner';
const Blog = lazy(()=>import('./pages/Blog'));
const Blogs = lazy(()=>import('./pages/Blogs'));
const Publish = lazy(()=>import('./pages/Publish'));
function App() {
  const isAuthenticated = useRecoilValue(authState);

  return (
    <BrowserRouter>
    <Suspense fallback={<div className='flex justify-center items-center w-screen h-screen'><Spinner/></div>}>
      <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          {isAuthenticated && <Route path='/blog/:id' element={<Blog />} />}

          { isAuthenticated && <Route path='/blogs' element={<Blogs />}/>}
          { isAuthenticated && <Route path='/publish' element={<Publish />} />}
          <Route path='*' element={ !isAuthenticated ? <Navigate to={"/signin"}/> : <Navigate to={"/blogs"}/>}/>
        </Routes>
    </Suspense>
      
    </BrowserRouter>
  )
}

export default App
