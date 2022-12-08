

//------------------------------------------------------

const useHelpFunc = () => {


    let postsArray = [];

    //...............................
    const defArray = (posts, userData, filter) => {

        if (filter === 'alle') {
            postsArray = [...posts];
        }
        else if (filter === 'deine') {
            postsArray = posts.filter(e => {
                return (e.userId === userData.id)
            })
        }
        return postsArray;
    }

    //----------------------------------
    const sort = (posts, userData, selection, filter ) => {

        postsArray = defArray(posts, userData, filter);

        if (selection === "Likes") {

            let array = [];
            for (let i = 0; i < postsArray.length; i++) {
                array.push([postsArray[i].likes.length, postsArray[i].id]);
            }

            array.sort(function (a, b) {
                return a[0] - b[0]
            })

            array.reverse();

            let postsorted = [];
            for (let k = 0; k < postsArray.length; k++) {
                for (let n = 0; n < array.length; n++) {
                    {
                        if (array[k][1] === postsArray[n].id) {
                            postsorted.push(postsArray[n]);
                        }
                    }
                }
            }
            return postsorted
        }
        else if (selection === "Datum") {
            return (postsArray.reverse())
        }
    }

    return[sort];

}

export default useHelpFunc;