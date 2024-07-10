'use client'
import { LoginProvider } from '@/contexts/login-context';
import { PopupProvider } from '@/contexts/popup-context';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeLayout from '../home-layout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export default function LayoutProvider({ children }: { children: React.ReactNode }) {

    return (
        <LoginProvider>
            <PopupProvider>
                <QueryClientProvider client={queryClient}>
                    <HomeLayout>{children}</HomeLayout>
                </QueryClientProvider>
            </PopupProvider>
        </LoginProvider>
    )
}