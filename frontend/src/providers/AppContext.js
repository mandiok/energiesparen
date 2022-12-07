import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";


const AppContext = createContext();


const AppContextProvider = ({children}) => {

    const [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser] = useAuth();
    const [posts, setPosts, addPost, addLike, removeLike, addComment, getPostsFromBackend] = usePosts();

    return (
        <AppContext.Provider value={{ LOCAL_STORAGE_KEY, user, setUser, token, setToken, logoutUser,
            userData, setUserData, 
            posts, setPosts, addPost, addLike, removeLike, addComment, getPostsFromBackend}} >
            {children}
        </AppContext.Provider>
    )

}


export {AppContextProvider, AppContext }