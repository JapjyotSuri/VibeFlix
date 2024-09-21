import React, { useEffect, useRef, useState } from 'react'
import Buttons from './Buttons'
import { ChevronLeft, ChevronRight } from 'lucide-react'
interface categoriesProp{
    categories: string[],
    selectedCategory: string,
    onSelect: (category: string) => void
}
const AMOUNT_TO_SHIFT=200;
const CategoryPills = ({categories,selectedCategory,onSelect}: categoriesProp) => {
    const [translate,setTranslate]=useState(0)
    const [isLeftVisible,setIsLeftVisible]=useState(false)
    const [isRightVisible,setIsRightVisible]=useState(true)
    const containerRef=useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(containerRef.current == null) return
        const observer=new ResizeObserver(entries => {//ResizeObserver listens for changes in the size of an element
            console.log(entries)
            const container=entries[0]?.target;//this is equivalent to writing containerRef.current
            if(container == null){
                return
            }
            setIsLeftVisible(translate > 0)
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth)//if translate+clientwidth becomes more than scrollwidth it means we havve reached the far end of the content and now we have to make the arrow disappear from the rigth
        })
        observer.observe(containerRef.current)
        return () => {//on unmounting to destroy the observer listner 
            observer.disconnect()
        }
    },[categories,translate])
  return (
    <div className='overflow-x-hidden relative' ref={containerRef}>
        {/* w-max-content sets the width of the container to the largest container in it */}
      <div className='flex whitespace-nowrap gap-3 transition-transform w-[max-content] ' style={{transform: `translateX(-${translate}px)`}} > 
        {
            categories.map((category) => (
                <Buttons onClick={() => onSelect(category)} className="py-1 px-3 rounded-lg whitespace-nowrap" variant={selectedCategory === category ? 'dark' : 'default'}>{category}</Buttons>
            ))

            
        }
         
         
      </div>
      { isLeftVisible && <div className='absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full'>
        <Buttons variant='ghost' size='icon' className='h-full aspect-square w-auto p-1.5' onClick={() => {setTranslate((translate) => {
            const newTranslate=translate - AMOUNT_TO_SHIFT;
            if(newTranslate <= 0){
                return 0
            }
            return newTranslate;
        })}}><ChevronLeft/></Buttons>
      </div>}
      { isRightVisible && <div className='absolute -0 right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end'>
        <Buttons variant='ghost' size='icon' className='h-full aspect-square w-auto p-1.5' onClick={() => {

            setTranslate((translate) => {
                if(containerRef == null){
                    return translate;
                }
                const newTranslate=translate+AMOUNT_TO_SHIFT;
                const edge=containerRef.current?.scrollWidth//The scrollWidth property represents the total width of the content, including the parts that are not visible due to overflow that is content that extends beyond the viewable area and would require scrolling.
                const width=containerRef.current?.clientWidth//The clientWidth property represents the visible width of an element,including padding but excluding borders, margins, and the scrollbar.It refers to the width of the content area that is currently visible.
                if( width && edge && newTranslate + width >= edge){
                    return edge-width
                }
                return newTranslate
            })
        }}><ChevronRight/></Buttons>
      </div>}
    </div>
  )
}

export default CategoryPills
