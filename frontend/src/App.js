import Login from './components/Login';
import Register from './components/Register';
import Mainpage from './components/Mainpage';
import Profile from './components/Profile';
import Test from './components/Test'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './providers/AppContext';
import AuthVerify from './components/AuthVerify';

function App() {

  const { user } = useContext(AppContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Mainpage /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/profile' element={ <Profile /> } /> */}
          <Route path='/profile' element={user ? <Profile /> : <Login/>} />
          <Route path='/test' element={<Test/>} />
        </Routes>

        <AuthVerify />
      </BrowserRouter>
    </div>

  );
}

export default App;

