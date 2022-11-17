import { useState, useEffect } from "react";

    const usePosts = () => {
    const [posts, setPosts] = useState();

    //Handler aus Frontend???
    /*const [selection, setSelection] = useState("Datum");

    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    const sort = (sortSelection) => {
        if (sortSelection === "Likes") {
            let array = [];
            for (let i = 0; i < posts.length; i++) {
                array.push([posts[i].likes.length, posts[i].id]);
            }

            array.sort(function (a, b) {
                return a[0] - b[0]
            })

            array.reverse();

            let postsorted = [];
            for (let k = 0; k < posts.length; k++) {
                for (let n = 0; n < array.length; n++) {
                    {
                        if (array[k][1] === posts[n].id) {
                            postsorted.push(posts[n]);
                        }
                    }
                }
            }
            return postsorted
        }
        else if (sortSelection === "Datum") {
            return(posts)
        }
    }

    
} */

//Post hinzufügen
const addPost = () => {
    const post=
        {
            id: uuidv4(),
            userId: "userId",
            date: DateToday(),
            title: titelRef.current.value,
            text: postRef.current.value,
            link: linkRef.current.value,
            picture: "??",
            likes: [],
            comments: []
        }
    setPosts([...posts, post]);
    titelRef.current.value = "";
    postRef.current.value = "";
    linkRef.current.value = "";
    inputRef.current.value = "";
    addPostsToBackend(posts);
}

//Backend Routen
const addPostsToBackend = (posts) => {
    fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(posts),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};


const getPostsFromBackend = () => {
    fetch("http://localhost:3001/posts")
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);                
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};


//Posts laden
useEffect(() => {
    getPostsFromBackend();
}, []);

return { posts, addPost };
};

export default usePosts;

