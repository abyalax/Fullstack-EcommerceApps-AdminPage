'use client'

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetUpPage = () => {
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