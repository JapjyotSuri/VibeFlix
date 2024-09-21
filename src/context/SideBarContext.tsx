import { createContext } from "react";
type SidebarContextType={
    isLargeOpen: boolean,
    isSmallOpen: boolean,
    toggle: () => void,
    close: () => void
}
export const SideBarContext=createContext<SidebarContextType | null>(null)