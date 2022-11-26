import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Mainpage from './components/Mainpage';
import Profile from './components/Profile';
import usePosts from './hooks/usePosts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { createContext } from 'react';


export const postContext = createContext()


function App() {

  const [posts, setPosts, addPost, addLike, removeLike, addComment] = usePosts()

  return (
    <div className="App">
      <postContext.Provider value={{ posts, setPosts, addPost, addLike, removeLike, addComment }}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Mainpage />}/>
          <Route path='/login' element={ <Login />} />
          <Route path='/register' element={ <Register /> } />
          <Route path='/profile' element={ <Profile />} />
        </Routes>

        </BrowserRouter>
      </postContext.Provider>

    </div>

  );
}

export default App;
