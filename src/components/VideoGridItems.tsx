import React, { useEffect, useRef, useState } from 'react'
import { formatDuration } from '../Utils/formatDuration'
import { FormateTimeAgo } from '../Utils/FormateTimeAgo'
import { Video } from 'lucide-react'
interface VideoGridItems{
    id: string,
    title: string,
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}
const ViewFormatter=new Intl.NumberFormat(undefined, {
   notation: 'compact'//converts 10000 to 10k
})
const VideoGridItems: React.FC<VideoGridItems> = ({id,title, channel,views,postedAt,duration,thumbnailUrl,videoUrl }) => {
    const [isVideoPlaying,setIsVideoPlaying]=useState(false)
    const videoRef=useRef<HTMLVideoElement>(null)
    useEffect(() => {
        
        const handleVideoPlayback = async () => {
            if (videoRef.current == null) {
                return;
            }
    
            try {
                if (isVideoPlaying) {
                    videoRef.current.currentTime = 0;
                    await videoRef.current.play(); // Ensure play is fully resolved
                } else {
                    videoRef.current.pause();
                }
            } catch (error) {
                console.error("Error handling video playback:", error);
            }
        };
    
        handleVideoPlayback();

    },[isVideoPlaying])
  return (
    <div className='flex flex-col gap-2' onMouseEnter={() => setIsVideoPlaying(true)} onMouseLeave={() => setIsVideoPlaying(false)}>
        <a href={`/watch?v=${id}`} className='relative aspect-video'>
            <img src={thumbnailUrl} className={`block w-full h-full object-cover  transition-[border-radius] duration-200 ${isVideoPlaying? 'rounded-none': 'rounded-xl' }`}></img>
            <div className='absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded' >{formatDuration(duration)}</div>
            <video ref={videoRef} muted playsInline src={videoUrl} className={`absolute inset-0 block h-full object-cover transition-opacity duration-200 ${isVideoPlaying ? 'opacity-100 delay-200': 'opacity-0'}`}></video>
        </a>
        <div className='flex gap-2'>
            <a href={`/@${channel.id}`} className='flex-shrink-0'><img className='w-12 h-12 rounded-full' src={channel.profileUrl}></img></a>
            <div className='flex flex-col'>
                <a href={`/watch?v=${id}`} className='font-bold'>{title}</a>
                <a href={`/@${channel.id}`} className='text-secondary-text text-sm'>{channel.name}</a>
                <div className='text-secondary-text text-sm'>{ViewFormatter.format(views)} Views | {FormateTimeAgo(postedAt)}</div>
            </div>
        </div>
    </div>
  )
}

export default VideoGridItems
