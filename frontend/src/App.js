import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Mainpage from './components/Mainpage';
import Profile from './components/Profile';
import usePosts from './hooks/usePosts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './providers/AppContext';

function App() {

  const { user, posts } = useContext(AppContext);

  return (
    <div className="App">  
        <BrowserRouter>
        <Routes>
          <Route path='/' element={ user ? <Mainpage /> : <Login />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/register' element={ <Register /> } />
          <Route path='/profile' element={ <Profile />} />
        </Routes>

        </BrowserRouter>


    </div>

  );
}

export default App;
