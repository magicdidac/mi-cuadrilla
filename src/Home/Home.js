import React from 'react'
import { useFirebaseApp, useUser } from 'reactfire'

export const Home = () => {

    const user = useUser()
    const firebase = useFirebaseApp()

    return (
        <div>
            
        </div>
    )
}
