'use client'

import { useAuth } from "@clerk/nextjs"
import { createContext, Dispatch, useContext, useEffect, useState } from "react"

// Props
interface ContextProps {
    //contoh data untuk useContext
    userID: string
    setUserID: Dispatch<React.SetStateAction<string>>
}

// Konfigurasi untuk argumen useContext (customizable)
const GlobalContext = createContext<ContextProps>({
    userID: "",
    setUserID: () => {},
})

// Komponen GlobalContextProvider
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userID, setUserID] = useState("")
    const {userId} = useAuth()
    
    useEffect(() => {
        if (userId) setUserID(userId)
    },[userId] )
    
    return (
        <GlobalContext.Provider value={{ userID, setUserID }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useUserContext = () => useContext(GlobalContext)