import { ReactNode, HTMLAttributes } from "react";

interface FlexBoxCenteredProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const FlexBoxCentered  =({children, ...props}: FlexBoxCenteredProps) => {
    return (
        <div className="flex justify-center items-center" {...props} >
            {children}
        </div>
    )
}

export const FlexBoxColumnCentered =  ({children, ...props}: FlexBoxCenteredProps)  => {
    return (
        <div className="flex flex-col justify-center items-center" {...props} >
            {children}
        </div>
    )
}