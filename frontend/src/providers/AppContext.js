import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import useHelpFunc from "../hooks/useHelpFunc";


const AppContext = createContext();


const AppContextProvider = ({children}) => {

    const [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, logoutUser, getProfileData, userProfile, otherUser, setOtherUser] = useAuth();
    const [posts, setPosts, addPost, addPostsToBackend2, addLike, removeLike, addComment, getPostsFromBackend ] = usePosts();
    const [sort,  getIndexRClick, getIndexLClick] = useHelpFunc();

    return (
        <AppContext.Provider value={{ LOCAL_STORAGE_KEY, user, setUser, token, setToken, logoutUser, getProfileData, userProfile, otherUser, setOtherUser,
            userData, setUserData,
            posts, setPosts, addPost, addPostsToBackend2, addLike, removeLike, addComment, getPostsFromBackend,
            sort, getIndexRClick, getIndexLClick }} >
            {children}
        </AppContext.Provider>
    )

}


export {AppContextProvider, AppContext }