'use client'

// import { useUserContext } from "@/context/user-context";
import { useStoreModal } from "@/hooks/use-store-modal";
// import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

const SetUpPage = () => {

  // const { userId } = useAuth()
  // const { userID, setUserID } = useUserContext()
  // if (userId) setUserID(userId)
    
  const onOpen = useStoreModal((state: { onOpen: any; }) => state.onOpen)
  const isOpen = useStoreModal((state: { isOpen: any; }) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}
export default SetUpPage