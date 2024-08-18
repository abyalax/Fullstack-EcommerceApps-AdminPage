'use client'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { Store } from "@prisma/client"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type PopOverTrigger = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface storeSwitcherProps extends PopOverTrigger {
    items: Store[],
}

const StoreSwitcher = ({ className, items = [] }: storeSwitcherProps) => {
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItem = items.map((item) => (
        {
            label: item.name,
            value: item.id
        }
    ))

    const currentStore = formattedItem.find((item) => item.value === params.storeId)

    const [open, setOpen] = useState(false)

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className={cn("w-[200px] justify-between", className)}
                    aria-label="Select a store"
                    aria-expanded={open}
                    variant={"outline"}
                    role="combobox"
                    size={"sm"}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store" />
                        <CommandEmpty>
                            Store Not Found
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItem.map((store) => (
                                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check className={cn(
                                        "ml-auto h-4",
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0",
                                    )}/>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {setOpen(false); storeModal.onOpen()}}
                                className="text-sm"
                            >
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher
