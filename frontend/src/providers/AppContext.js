import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import useHelpFunc from "../hooks/useHelpFunc";


const AppContext = createContext();


const AppContextProvider = ({children}) => {

    const [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser, getProfileData, userProfile] = useAuth();
    const [posts, setPosts, addPost, addLike, removeLike, addComment, getPostsFromBackend ] = usePosts();
    const [sort] = useHelpFunc();

    return (
        <AppContext.Provider value={{ LOCAL_STORAGE_KEY, user, setUser, token, setToken, logoutUser, getProfileData, userProfile,
            userData, setUserData, 
            posts, setPosts, addPost, addLike, removeLike, addComment, getPostsFromBackend, 
            sort }} >
            {children}
        </AppContext.Provider>
    )

}


export {AppContextProvider, AppContext }