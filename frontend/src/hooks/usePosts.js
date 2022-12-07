import { useState, useEffect } from "react";

    const usePosts = () => {

        const [posts, setPosts] = useState(""); //Anscheinend muss zumindest ein leerer String gesetzt werden, damit die Daten aus dem Backend geholt werden können. Einfach nur "useState()" funktioniert nicht. Ob es an der verschachtelten Struktur des Post-Objekts liegt?
        
//Post hinzufügen
const addPost = (newPost) => {

    setPosts([...posts, newPost])
    console.log(" Post geht ins Backend", newPost)
    addPostsToBackend(newPost);
}

//Update Post in Backend - add Picture Url
// const updatePostInBackend = async(postId, url) => {
//   console.log(postId, url)
  
//   var raw = JSON.stringify({
//     "id": postId,
//     "userId": url
//   });
  
//   var requestOptions = {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//   },
//     body: raw,
//     redirect: 'follow'
//   };

//   await fetch("/updatePost", requestOptions)
//   .then(response => console.log(response))
//   .catch(error => console.log('error', error));
// }

// //Update Post (Picture)
// const updatePost = (postId, url) => {
//   console.log("gesuchte postID?", postId)
//   posts.map(e=>{console.log("id:\n",e.id)})
//   const postIndex = posts.findIndex(e => e.id === postId)
//     console.log("Index:", postIndex)
//     if(postIndex !== -1) {
//     setPosts([...posts, posts[postIndex].picture.push(url)]);
//     updatePostInBackend(postId, url);
//   }
// }

//Backend Routen
const addPostsToBackend = async (posts) => {
  console.log("der neue Post ", posts)
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

// Posts laden
useEffect(() => {
  getPostsFromBackend()
}, []);


// Add Like to Backend
const addLikeToBackend = async (postId, userId) => {

  var raw = JSON.stringify({
    "id": postId,
    "userId": userId
  });
  
  var requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
  },
    body: raw,
    redirect: 'follow'
  };
  await fetch("/addlike", requestOptions)
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

// add Like
const addLike = (post, userId) => {
    setPosts(...[posts], post.likes.push(userId));
    addLikeToBackend(post.id, userId);
}


//remove Like from Backend
const removeLikeFromBackend = async (postId, userId) => {
    var raw = JSON.stringify({
        "id": postId,
        "userId": userId
      });
      var requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
      },
        body: raw,
        redirect: 'follow'
      };
      await fetch("/removelike", requestOptions)
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

// remove Like
const removeLike = (post, userId) => {
    const userIdIndex = post.likes.findIndex(e => e === userId)
    const postindex = posts.findIndex(e => e.id === post.id)
    setPosts([...posts, posts[postindex].likes.splice(userIdIndex,1)]);
    removeLikeFromBackend(post.id, userId);
}

// add comment to backend
const addCommentToBackend = async(postId, comment) => {
    var raw = JSON.stringify({
        "id": postId,
        "comment": comment
      });
      console.log("           ", raw)
      var requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
      },
        body: raw,
        redirect: 'follow'
      };
      await fetch("/addcomment", requestOptions)
        .then(result => console.log("result",result))
        .catch(error => console.log('error', error));
}

// fügt einen neuen, eingegebenen Kommentar zum aktuellen Post hinzu
    const addComment = (post, comment) => {
        setPosts(...[posts], post.comments.push(comment))
        addCommentToBackend(post.id, comment)
    }



return [posts, setPosts, addPost, addLike, removeLike, addComment, getPostsFromBackend];

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

