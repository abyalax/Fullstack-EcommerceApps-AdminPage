'use client'

import { useEffect, useState } from "react"
import Modal from "../ui/modal"
import { Button } from "../ui/button"

interface alertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm?: () => void
    loading: boolean
}

export const AlertModal = ({ isOpen, onClose, onConfirm, loading }: alertModalProps) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    return (
        <Modal title="Are you sure ?" description="This action cannot be undone" isOpen={isOpen} onClose={onClose}>
            <div className="flex justify-end items-center w-full pt-6 space-x-2">
                <Button variant={"outline"} onClick={onClose} disabled={loading}>Cancel</Button>
                <Button variant={"destructive"} onClick={onConfirm} disabled={loading}>{loading ? "Loading..." : "Continue"}</Button>
            </div>
        </Modal>
    )
}