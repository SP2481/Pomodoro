/* eslint-disable no-unused-vars */
'use client'
import { ReactNode, createContext, useState } from "react";

type PopupContextType = {
    open: boolean;
    content: ReactNode
    openPopup: (_content: ReactNode | undefined) => void
    closePopup: () => void
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);


export const PopupProvider = ( {children} : {children : ReactNode}) =>  {
    const [open , setOpen] = useState(false);
    const [content, setContent] = useState();

    const openPopup = (content:any) => {
        setContent(content);
        setOpen(true);
    }

    const closePopup = () => {
        setOpen(false);
        setContent(undefined);
    }

    return (
        <PopupContext.Provider value={{ open, content, openPopup, closePopup }}>
            {children}
            {open && content && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1000] bg=[rgba(0, 0, 0, 0.5)]">
                    {content}
                </div>
            )}
        </PopupContext.Provider>
    );
}
