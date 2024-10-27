import React from 'react'

const MapsVisualiser = () => {

    const [sets, setSets] = React.useState<{ a: string[], b: string[] }>({ a: [], b: [] })
    const [maps, setMaps] = React.useState<{ a: string[], b: string[] }>({ a: [], b: [] })
    const [settings, setSettings] = React.useState<{ injective: boolean, surjective: boolean }>({ injective: false, surjective: false })

    React.useEffect(() => {

    }, [sets])

    return (
        <div className='flex items-center flex-col h-full'>
            <div className='text-2xl h-[32px]'>
                Set Maps Visualiser
            </div>
            <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px] h-[44px]'>
                Enter 2 sets and view all the possible maps and visualise them.
            </div>
            <div className='w-full flex flex-row h-full mt-[10px]'>
                <div className='flex flex-col flex-grow h-full mr-[5px]'>
                    <div className='w-full h-[30%] border-w rounded-md mb-[5px] p-[10px]'>
                        <div className='text-textlight text-sm mb-[10px]'>Seperate values in the set using commas.</div>
                        <input
                            type="text"
                            placeholder="Set 1"
                            className="form-input"
                            onChange={(e) => {
                                setSets((set) => ({ ...set, a: e.target.value.split(",") }))
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Set 2"
                            className="form-input"
                            onChange={(e) => {
                                setSets((set) => ({ ...set, b: e.target.value.split(",") }))
                            }}
                        />
                        <div className='w-full flex flex-row justify-evenly mt-[10px]'>
                            <div className='fc'>
                                Injective
                                <input
                                    type="checkbox"
                                    className='ml-[10px] accent-main'
                                    checked={settings.injective}
                                    onChange={(e) => setSettings((settings) => ({ ...settings, injective: e.target.checked }))}
                                />
                            </div>
                            <div className='fc'>
                                Surjective
                                <input
                                    type="checkbox"
                                    className='ml-[10px] accent-main'
                                    checked={settings.surjective}
                                    onChange={(e) => setSettings((settings) => ({ ...settings, surjective: e.target.checked }))}
                                />
                            </div>
                        </div>
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