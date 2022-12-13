import { useState, useEffect } from "react";

//--------------------------------------------------------------------

const usePosts = () => {

  const [posts, setPosts] = useState(""); //Anscheinend muss zumindest einleererStringgesetzt werden, damit die Daten aus dem Backend geholt werden könnenEinfach nur"useState()" funktioniert nicht. Ob es an der verschachteltenStrukturdes Post-Objektsliegt?

  //............................................................

  // Posts laden
  useEffect(() => {
    getPostsFromBackend()
  }, []);

  //............................................................

  //Post hinzufügen
  const addPost = (newPost) => {
    setPosts([...posts, newPost])
  }


  // fügt einen neuen, eingegebenen Kommentar zum aktuellen Post hinzu
  const addComment = (post, comment) => {
    setPosts(posts.map((e, i) => {
      if (e.id === post.id) e.comments = [...e.comments, comment];
      return e;
    }));
    addCommentToBackend(post.id, comment)
  }


  // add Like
  const addLike = (post, userId) => {
    setPosts(posts.map((e, i) => {
      if (e.id === post.id)  e.likes = [...e.likes, userId];
      return e;
    }));
    addLikeToBackend(post.id, userId);
  }



  // remove Like
  const removeLike = (post, userId) => {
    const userIdIndex = post.likes.findIndex(e => e === userId)
    const postindex = posts.findIndex(e => e.id === post.id)
    const temp = [...posts];
    temp[postindex].likes.splice(userIdIndex, 1)
    setPosts(temp)

    removeLikeFromBackend(post.id, userId);
  }
  

  //............................................................
  //Backend Routen
  const addPostsToBackend2 = async (newPost, formData, setInputVisible) => {


    formData.append('id', newPost.id)
    formData.append('userId', newPost.userId)
    formData.append('userName', newPost.userName)
    formData.append('date', newPost.date)
    formData.append('title', newPost.title)
    formData.append('text', newPost.text)
    formData.append('link', newPost.link)
    formData.append('picture', newPost.picture)
    formData.append('likes', [])
    formData.append('comments', [newPost.comments])

    // console.log("formData:", formData.file)

    await fetch("/post", {
        method: "POST",

        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Success:", data);
            setInputVisible(false);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

//get Posts from Backend
  const getPostsFromBackend = async () => {
    await fetch("/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.result)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


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
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
      .catch(error => console.log('error', error));
  }


  // add comment to backend
  const addCommentToBackend = async (postId, comment) => {
    var raw = JSON.stringify({
      "id": postId,
      "comment": comment
    });
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: 'follow'
    };
    await fetch("/addcomment", requestOptions)
      // .then(result => console.log("result",result))
      .catch(error => console.log('error', error));
  }

  //......................................................



  //...........................................................

  return [posts, setPosts, addPost, addPostsToBackend2, addLike, removeLike, addComment, getPostsFromBackend];

};


export default usePosts;

