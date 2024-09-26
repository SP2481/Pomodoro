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
import Link from 'next/link'


export function ProfileDropdown() {
    const { logoutHandler } = useLogin()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-24 h-8 bg-yellow-300 rounded-2xl font-medium text-black' >
                Profile
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-black w-[10rem]'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <Link href={'/leaderboard'}>
                    <DropdownMenuItem>Leaderboard</DropdownMenuItem>
                </Link>
                <Link href={'/sessions'}>
                    <DropdownMenuItem>Sessions</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}
