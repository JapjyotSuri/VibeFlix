import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, LibraryIcon, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from 'lucide-react'
import React, { Children, ElementType, ReactNode, useState } from 'react'
import Buttons, { buttonStyles } from '../components/Buttons'
import { twMerge } from 'tailwind-merge'
import { playlists, subscriptions } from '../data/Sidebar'
import { title } from 'process'
import { useSidebarContext } from '../context/SideBarContextProvider'
import PageHeaderFirst from './PageHeaderFirst'

const Sidebar = () => {
    const {isLargeOpen,isSmallOpen,close}=useSidebarContext();
  return (
    // for smaller screens
    <>
    {/* in the below we are using conditional styling that when our isLargeOpen is false we want to show the small sidebar with homw,shorts,subscriptions and library buttons */}
    <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? 'lg:hidden': 'lg:flex'} `}>
       <SmallSideBarItem Icon={Home} title="Home" url='/'></SmallSideBarItem>
       <SmallSideBarItem Icon={Repeat} title="Shorts" url='/shorts'></SmallSideBarItem>
       <SmallSideBarItem Icon={Clapperboard} title="Subscription" url='/subscription'></SmallSideBarItem>
       <SmallSideBarItem Icon={Library} title="Library" url='/Library'></SmallSideBarItem>
    </aside>
    {
        //to close the sidebar if we click on someother part of the screen other than the sidebar

        isSmallOpen && (
            <div onClick={close} className='lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50'/>
        )
    }
     {/* for larger screens */}
    <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2 lg:flex  ${isLargeOpen? 'lg:flex' : 'lg:hidden'} ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}`}>
        <div className='lg:hidden pt-2 pb-4 px-2 sticky top-0'><PageHeaderFirst/></div>
        <LargSidebarSection visibleItemCount={1}>
            <LargeSideBarItem isActive Icon={Home} title="Home" url='/' />
            <LargeSideBarItem isActive={false} Icon={Clapperboard} title="Subscriptions" url='/' />
        </LargSidebarSection>
        <hr></hr>
        <LargSidebarSection visibleItemCount={5}>
            <LargeSideBarItem isActive={false} Icon={LibraryIcon} title="Library" url='/' />
            <LargeSideBarItem isActive={false}Icon={History} title="History" url='/' />
            <LargeSideBarItem isActive={false} Icon={PlaySquare} title="Your Videos" url='/' />
            <LargeSideBarItem isActive={false} Icon={Clock} title="Watch Later" url='/' />
            {
                playlists.map((playlist) => (
                    <LargeSideBarItem key={playlist.id} isActive={false} Icon={ListVideo}  title={playlist.name} url={`/playlist?list=${playlist.id}`}></LargeSideBarItem>
                ))
            }
        </LargSidebarSection>
        <hr></hr>
        
        <LargSidebarSection visibleItemCount={5} title='Subscriptions'>
            
            {
                subscriptions.map((sub) => (
                    <LargeSideBarItem key={sub.id} isActive={false} Icon={sub.imgUrl}  title={sub.channelName} url={`/@${sub.id}`}></LargeSideBarItem>
                ))
            }
        </LargSidebarSection>
        
        <hr></hr>
        <LargSidebarSection title='Explore'>
        <LargeSideBarItem
            Icon={Flame}
            title="Trending"
            url="/trending"
            isActive={false}
          />
          <LargeSideBarItem
            Icon={ShoppingBag}
            title="Shopping"
            url="/shopping"
            isActive={false}
          />
          <LargeSideBarItem Icon={Music2} title="Music" url="/music" isActive={false}/>
          <LargeSideBarItem
            Icon={Film}
            title="Movies & TV"
            url="/movies-tv"
            isActive={false}
          />
          <LargeSideBarItem Icon={Radio} title="Live" url="/live" isActive={false}/>
          <LargeSideBarItem
            Icon={Gamepad2}
            title="Gaming"
            url="/gaming"
            isActive={false}
          />
          <LargeSideBarItem Icon={Newspaper} title="News" url="/news" isActive={false} />
          <LargeSideBarItem
            Icon={Trophy}
            title="Sports"
            url="/sports"
            isActive={false}
          />
          <LargeSideBarItem
            Icon={Lightbulb}
            title="Learning"
            url="/learning"
            isActive={false}
          />
          <LargeSideBarItem
            Icon={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
            isActive={false}
          />
          <LargeSideBarItem
            Icon={Podcast}
            title="Podcasts"
            url="/podcasts"
            isActive={false}
          />
        </LargSidebarSection>
    </aside>
    </>
  )
}

export default Sidebar
type SmallSideBarItemProps={
    Icon: ElementType,
    title: string,
    url: string
}
function SmallSideBarItem({Icon,title,url}: SmallSideBarItemProps){
    return(
        <a 
        href={url}
        className={twMerge(buttonStyles({variant: 'ghost'}),'py-4 px-1 flex flex-col items-center rounded-lg gap-1')}
        >
        <Icon className='w-6 h-6' />
        <div className='text-sm'>{title}</div>
        </a>
    )
}
type largeSideBarItemProps={
    Icon: ElementType | string,
    title: string,
    url: string,
    isActive: boolean
}
type largeSideBarSectionProps={
    children: ReactNode
    title?: string,
   visibleItemCount?: number
}
function LargSidebarSection({children,title,visibleItemCount}: largeSideBarSectionProps){
    const [expanded,setExpanded]=useState(false)
    const childrenArray=Children.toArray(children).flat()//fat makes a 2d array into a 1d array
    const visibleChildren=expanded? childrenArray :childrenArray.slice(0,visibleItemCount)
    const showExpandButton= visibleItemCount &&  childrenArray.length > visibleItemCount;
    const ButtonIcon=expanded ? ChevronUp : ChevronDown
    return <div>
         {title && <div className='ml-4 mt-2 text-lg mb-1'>{title}</div>}
        {visibleChildren}
        {showExpandButton && 
        <Buttons variant='ghost' className='w-full flex items-center rounded-lg gap-4 p-3' onClick={() => setExpanded(e => !e)}>
            <ButtonIcon className='w-6 h-6'/>
          <div>{expanded ? 'show Less': 'show More'}</div>
        </Buttons>

       
        }
        </div>
}
function LargeSideBarItem({Icon,title,url,isActive=false}: largeSideBarItemProps){ 
    return (
    <a href={url} className={twMerge(buttonStyles({variant: 'ghost'}),`w-full flex items-center rounded-lg gap-4 p-3 ${isActive ?  'font-bold bg-neutral-100 hover:bg-secondary': undefined }`)}>
        {
            //here we are checking if type of icon is string as in the subscription section we are giving it the url of the image that is going to be a string
        typeof Icon === 'string' ? 
        <img src={Icon} className='h-6 w-6 rounded-full'></img> : <Icon className="w-6 h-6"></Icon>
        } 
        <div className='text-sm'>{title}</div>
    </a>
    )
}