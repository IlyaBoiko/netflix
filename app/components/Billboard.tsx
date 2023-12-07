import React from 'react'
import getBillboardVideo from '../actions/getBillboardVideo'
import PlayButton from './PlayButton'



const Billboard = async () => {
    const bilboardVideoData = await getBillboardVideo()

    
    if (!bilboardVideoData) {
        return null
    }


    return (
        <div className='relative h-[56.25vw] '>
            <video
                poster={bilboardVideoData?.thumbnailUrl}  
                src={bilboardVideoData?.videoUrl}
                className='w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500'
                muted
                loop
                autoPlay>
            </video>
            <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
                <p className='text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                    {bilboardVideoData?.title}
                </p>
                <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                    {bilboardVideoData?.description}
                </p>
                <div className='flex-row flex items-center mt-3 md:mt-4 gap-3'>
                    <PlayButton movieId={bilboardVideoData?.id} />
                </div>
            </div>
        </div>
    )
}

export default Billboard;