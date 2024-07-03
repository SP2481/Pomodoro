import { PopupContext } from "@/contexts/popup-context"
import { useContext } from "react"

export const usePopup = () => {
    const context =  useContext(PopupContext)
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }
    return context;
}