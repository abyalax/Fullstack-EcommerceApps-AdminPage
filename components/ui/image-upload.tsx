'use client'

import { useEffect, useState } from "react"
import { Button } from "./button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps {
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
    disabled: boolean
}

const ImageUpload = ({ onChange, onRemove, value, disabled }: ImageUploadProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!mounted) return null

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" variant={"ghost"} onClick={() => onRemove(url)}>
                                <Trash className="w-4 h-4" />
                            </Button>
                        </div>
                        <Image src={url} alt="image" fill className="object-cover" />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="iosqxfqc">
                {({open}) => {
                    const onClick = () => {
                        open()
                    }
                    return (
                        <Button type="button" variant={"secondary"} onClick={onClick} disabled={disabled} >
                            <ImagePlus className="h-4 w-4"/>
                            Upload Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload
