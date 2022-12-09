import { AppContext } from "../providers/AppContext"

import { useContext, useEffect } from "react"


const Test =() => {

    const {userData} = useContext(AppContext)

    

    console.log(userData.id)

    useEffect(() => {
        // getProfileData(userData.id)
    }, [])

    // console.log(userProfile)

    return (
        <div>
            aslkejföaeoiraüäweiru
            aeroiaü weirouü qar
        </div>
    )
}

export default Test