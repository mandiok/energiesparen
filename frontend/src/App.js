import  Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import ButtonAppBar from './ButtonAppBar';


function App() {


  return (
    <div className="App">
      <ButtonAppBar/>
      <Register />
      <Login />
      <Post />
    </div>
    
  );
}

export default App;
