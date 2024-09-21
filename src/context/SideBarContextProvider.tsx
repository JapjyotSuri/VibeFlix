import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { SideBarContext } from './SideBarContext'
type SidebarProviderProps ={
    children: ReactNode
}
export function useSidebarContext(){
    const value=useContext(SideBarContext)
    if(value == null){
        throw Error('cannot use outside of SidebarProvider')
    }
    else{
        return value
    }
}

const SideBarContextProvider = ({children}: SidebarProviderProps) => {
    const [isLargeOpen,setIsLargeOpen]=useState(true);
    const [isSmallOpen,setIsSmallOpen]=useState(false);
    useEffect(() => {
       function handler(){
        if(!isScreenSmall()){//means we are on a large screen
            setIsSmallOpen(false);//this we have written so that when we go from small screen to big screen the sidebar closes and isnt visible
        }
       }

        window.addEventListener('resize',handler)//This line adds an event listener to the window object. The listener watches for the 'resize' event, which triggers every time the browser window is resized.
        //Whenever the window is resized, the handler function (defined earlier) will be executed to check the screen size and adjust the sidebar accordingly.
        return () => { //cleanup function
            window.removeEventListener('resize',handler)
        }
    },[])
    function toggle(){
         if(isScreenSmall()){
             setIsSmallOpen(e => !e)
         }
         else{
             setIsLargeOpen(e => !e)
         }
    }
    function isScreenSmall(){
        return window.innerWidth < 1024;//to check if the current screen is small
    }
    function close(){
        if(isScreenSmall()){
            setIsSmallOpen(false)
        }
        else{
            setIsLargeOpen(false)
        }
    }
  return (
    

    <SideBarContext.Provider value={{isLargeOpen,isSmallOpen,toggle,close}}>
        {children}
    </SideBarContext.Provider>
  )
}

export default SideBarContextProvider
