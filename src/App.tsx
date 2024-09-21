import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from './layouts/PageHeader';
import CategoryPills from './components/CategoryPills';
import { categories, videos } from './data/home';
import VideoGridItems from './components/VideoGridItems';
import  Sidebar  from './layouts/Sidebar';
import SideBarContextProvider from './context/SideBarContextProvider';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  
  return (
    <SideBarContextProvider>
    <div className='max-h-screen flex flex-col'>
      <PageHeader />
      {/* here one fr means that one column will tak auto width and the other will take all the remaining space */}
      <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
        <Sidebar/>
        <div className='overflow-x-hidden px-4 pb-4'>
          <div className='sticky top-0 bg-white z-10 pb-4'>
            <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
          </div>
          <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
            {
              videos.map((video) => (
                <VideoGridItems key={video.id} {...video}/>
              ))
            }
            
          </div>
        </div>
      </div>
    </div>
    </SideBarContextProvider>
  );
}

export default App;
