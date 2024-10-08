'use client'
import { useEffect, useState } from "react"
import StoreModal from "../components/modal/store-modal"

export const ModalProvider = () => {
    const [isMount, setIsMount] = useState(false)
    useEffect(() => {
        setIsMount(true)
    }, [])
    if (!isMount) {
        return null
    }
    return <StoreModal/>
}