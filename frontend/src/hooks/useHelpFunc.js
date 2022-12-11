
//------------------------------------------------------


const useHelpFunc = () => {

    // const {posts} = useContext(AppContext)  <= funktioniert nicht in einem Hook


    //...............................
    const defArray = (posts, userData, filter) => {

        let postsArray = [];

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

        let postsArray = defArray(posts, userData, filter);

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


    //-
    const getLength = (filter, posts, postsArray) => {
        if (filter === 'alle') return (posts.length);
        else if (filter === 'deine') return (postsArray.length);
    }
    // Berechnet die Indizes für den ersten und letzten anzuzeigenden Post neu,
    // wenn auf "nach links blätern" angeklickt wurde
    const getIndexLClick = (posts, postsArray, filter, steps,indexStart, setIndexStart,indexEnd, setIndexEnd) => {

        const length = getLength(filter, posts, postsArray)

        if (indexEnd < length) {
            setIndexStart(indexStart - steps)
            setIndexEnd(indexEnd - steps)
        } else {
            const tmpstart = indexStart
            setIndexStart(indexStart - steps)
            setIndexEnd(tmpstart)
        }
    }

    // Berechnet die Indizes für den ersten und letzten anzuzeigenden Post neu,
    // wenn auf "nach rechts blätern" angeklickt wurde
 
    const getIndexRClick = (posts, filter, postsArray, steps,indexStart, setIndexStart,indexEnd, setIndexEnd) => {
        const length = getLength(filter, posts, postsArray)

        setIndexStart(indexStart + steps)

        if ((indexEnd + steps) < length)
            setIndexEnd(indexEnd + steps)
        else
            setIndexEnd(length)
    }

    return[sort, getIndexRClick, getIndexLClick];

}

export default useHelpFunc;