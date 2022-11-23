import { useState, useEffect } from "react";

    const usePosts = () => {

        const [posts, setPosts] = useState(""); //Anscheinend muss zumindest ein leerer String gesetzt werden, damit die Daten aus dem Backend geholt werden können. Einfach nur "useState()" funktioniert nicht. Ob es an der verschachtelten Struktur des Post-Objekts liegt?
        
//Post hinzufügen
const addPost = (newPost) => {

    setPosts([...posts, newPost])
    addPostsToBackend(newPost);
}

//Backend Routen
const addPostsToBackend = async (posts) => {
    await fetch("/post", {
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


const getPostsFromBackend = async () => {
    await fetch("/posts")
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);   
            setPosts(data.result)       
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};


//Posts laden
useEffect(() => {
    getPostsFromBackend()
}, []);

return [posts, setPosts, addPost];
};

export default usePosts;



//BACKUP:
//Handler aus Frontend???
    //const [selection, setSelection] = useState("Datum");

  

    // const sort = (sortSelection) => {
    //     if (sortSelection === "Likes") {
    //         let array = [];
    //         for (let i = 0; i < posts.length; i++) {
    //             array.push([posts[i].likes.length, posts[i].id]);
    //         }

    //         array.sort(function (a, b) {
    //             return a[0] - b[0]
    //         })

    //         array.reverse();

    //         let postsorted = [];
    //         for (let k = 0; k < posts.length; k++) {
    //             for (let n = 0; n < array.length; n++) {
    //                 {
    //                     if (array[k][1] === posts[n].id) {
    //                         postsorted.push(posts[n]);
    //                     }
    //                 }
    //             }
    //         }
    //         return postsorted
    //     }
    //     else if (sortSelection === "Datum") {
    //         return(posts)
    //     }
    // }