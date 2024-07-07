'use client'
import { PopupProvider } from '@/contexts/popup-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";
import HomeLayout from '../home-layout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus:false
        }
    }
})

export default function LayoutProvider ({ children }  : { children : React.ReactNode}) {
    
    return (
        <PopupProvider>
          <QueryClientProvider client={queryClient}>
            <HomeLayout>{children}</HomeLayout>

          </QueryClientProvider>
        </PopupProvider>
    )
}