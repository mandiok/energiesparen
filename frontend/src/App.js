import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Mainpage from './components/Mainpage';
import Profile from './components/Profile';
import usePosts from './hooks/usePosts';

import { createContext } from 'react';


export const postContext = createContext()


function App() {

  const [posts, setPosts, addPost, addLike] = usePosts()

  return (
    <div className="App">
      <postContext.Provider value={{ posts, setPosts, addPost, addLike }}>
        {/* <Header /> */}

        {/* <Login /> */}

        {/* <Register />

      <Login /> */}
        <Mainpage />
        {/* <Profile /> */}

        {/* <Login /> */}

      </postContext.Provider>
    </div>

  );
}

export default App;
