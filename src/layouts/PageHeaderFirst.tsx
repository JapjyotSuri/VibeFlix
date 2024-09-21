import React from 'react'
import Buttons from '../components/Buttons'
import { useSidebarContext } from '../context/SideBarContextProvider';
import { Menu } from 'lucide-react';
import logo from '../assets/logo192.png'

type PageHeaderFirstProp={
    hidden?: boolean
}
const PageHeaderFirst = ({hidden = false}: PageHeaderFirstProp) => {
    const {toggle}=useSidebarContext();
  return (
    <div className={` gap-3 items-center flex-shrink-0 ${hidden ? 'hidden' : 'flex'}`}>
          <Buttons variant="ghost" size='icon' onClick={toggle}><Menu/></Buttons>
          <a href='/'>
            <img src={logo} className='h-6'></img>
          </a>
          <p className='text-lg'>VibeFlix</p>
      </div>
  )
}

export default PageHeaderFirst
