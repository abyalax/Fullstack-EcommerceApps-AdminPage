'use client'

import { useAuth } from "@clerk/nextjs"
import { createContext, Dispatch, useContext, useEffect, useMemo, useState } from "react"

// Props
interface ContextProps {
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
    const { userId } = useAuth()

    useEffect(() => {
        if (userId) setUserID(userId)
    }, [userId])

    // Memoizing the context value
    const value = useMemo(() => ({ userID, setUserID }), [userID]);

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useUserContext = () => useContext(GlobalContext)
