import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";
import api from "../services/axios";




type ProfileProps = {
    id: number,
    name: string,
    email: string,
    image?: string,
}

type UserContextProps = {
    profile: ProfileProps,
    setUserProfile(profile: ProfileProps): void
}

type UserProviderProps = {
    children: React.ReactNode
}



export const UserContext = createContext({} as UserContextProps)



export function UserContextProvider({ children }: UserProviderProps) {

    const [profile, setProfile] = useState({} as ProfileProps)

    const user_id = getCookie('blog.user_id')

    useEffect(() => {
        api.get(`/users/${user_id}`).then((response) => {
            setProfile(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    console.log(profile)

    function setUserProfile(profile: ProfileProps) {
        setProfile(profile)
    }

    return (
        <UserContext.Provider value={{ profile, setUserProfile }}>
            {children}
        </UserContext.Provider>
    )

}
