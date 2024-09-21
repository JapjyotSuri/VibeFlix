import React, { useState } from 'react'
import logo from '../assets/logo192.png'
import {ArrowLeft, Bell, Menu, Mic, Search, Upload, User} from 'lucide-react'
import Buttons from '../components/Buttons'
import { useSidebarContext } from '../context/SideBarContextProvider'
import PageHeaderFirst from './PageHeaderFirst'
const PageHeader = () => {
    const [showFullWidthSearch,setShowFullWidthSearch]=useState(false)
    
  return (
    <div className='flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4'>
      <PageHeaderFirst hidden={showFullWidthSearch}/>
      <form className={`  gap-4 flex-grow justify-center ${showFullWidthSearch? 'flex': 'hidden md:flex'}`}>
        <div className='flex flex-grow max-w-[600px] '>
       { showFullWidthSearch &&
       <Buttons type='button' size='icon' variant='ghost' className='flex-shrink-0' onClick={() => setShowFullWidthSearch(false)}>
            <ArrowLeft/>
        </Buttons>
        }
            <input type="text" placeholder='Search' className=' rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none'></input>
            <Buttons className='py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0'><Search/></Buttons>
        </div>
        <Buttons type='button' size='icon' className='flex-shrink-0'><Mic/></Buttons>
      </form>
      
      <div className={` flex-shrink-0 md:gap-2 ${showFullWidthSearch ? 'hidden' : 'flex'}`}>
        {/* showing search and mic icon when on small screen and as soon as we go to md screen it gets hidden */}

      <Buttons size='icon' variant='ghost' className='md:hidden' onClick={() => setShowFullWidthSearch(true)}>
            <Search/>
        </Buttons>
        <Buttons size='icon' variant='ghost' className='md:hidden'>
            <Mic/>
        </Buttons>
        {/* for all screens below */}
        <Buttons size='icon' variant='ghost' className='flex-shrink-0'>
            <Upload/>
        </Buttons>
        <Buttons size='icon' variant='ghost'>
            <Bell/>
        </Buttons>
        <Buttons size='icon' variant='ghost'>
            <User/>
        </Buttons>
      </div>
    </div>
  )
}

export default PageHeader
