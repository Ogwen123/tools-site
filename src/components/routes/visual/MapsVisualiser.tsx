import React from 'react'

const MapsVisualiser = () => {

    const [sets, setSets] = React.useState<{ a: string[], b: string[] }>({ a: [], b: [] })
    const [maps, setMaps] = React.useState<{ a: string[], b: string[] }>({ a: [], b: [] })

    return (
        <div className='flex items-center flex-col h-full'>
            <div className='text-2xl h-[32px]'>
                Set Maps Visualiser
            </div>
            <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px] h-[44px]'>
                Enter 2 sets and view all the possible maps and visualise them
            </div>
            <div className='w-full flex flex-row h-full mt-[10px]'>
                <div className='flex flex-col flex-grow h-full mr-[5px]'>
                    <div className='w-full h-[30%] border-w rounded-md mb-[5px] p-[10px]'>
                        inputs
                    </div>
                    <div className='w-full h-[70%] border-w rounded-md mt-[5px] p-[10px]'>
                        map outputs
                    </div>
                </div>
                <div className='h-full flex-grow border-w rounded-md ml-[5px] p-[10px]'>
                    map visuals
                </div>
            </div>
        </div>
    )
}

export default MapsVisualiser