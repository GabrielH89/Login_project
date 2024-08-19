import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>        
        <Route path='/profile' element={<Profile/>}></Route>        
      </Routes>
     </BrowserRouter>      
    </>
  )
}

export default App
