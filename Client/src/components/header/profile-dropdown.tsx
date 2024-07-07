"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogin } from '@/hooks/useLogin'


export function ProfileDropdown() {
    const { logoutHandler } =  useLogin()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-24 h-8 bg-white rounded-md text-black' >
                Profile
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-black'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Leaderboard</DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}
