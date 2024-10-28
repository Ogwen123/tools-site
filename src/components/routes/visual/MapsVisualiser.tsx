import React from 'react'

const MapsVisualiser = () => {

    const [sets, setSets] = React.useState<{ a: string[], b: string[] }>({ a: [], b: [] })
    const [maps, setMaps] = React.useState<string[][]>([])
    const [settings, setSettings] = React.useState<{ injective: boolean, surjective: boolean }>({ injective: false, surjective: false })

    const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));


    const generateMaps = () => {
        //let pairs = []
        //for (let i of sets.a) {
        //    let buffer = []
        //    for (let j of sets.b) {
        //        buffer.push([i, j])
        //    }
        //    pairs.push(buffer)
        //}
        //console.log(pairs)
        let args = []

        for (let _ in sets.a) {
            args.push(sets.b)
        }

        const cartB = cartesian(...args)

        let map: string[][] = []

        for (let i of cartB) {
            map.push(i.map(function (val: any, index: any) {
                return [sets.a[index], val];
            }))
        }

        setMaps(map)
    }

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
                    <div className='w-full flex flex-col h-[35%] border-w rounded-md mb-[5px] p-[10px] overflow-auto'>

                        <div className='w-full flex flex-row justify-between mb-[10px]'>
                            <div className='text-textlight text-sm'>Seperate values in the set using commas.</div>
                            <div className='justify-evenly flex flex-row w-1/2'>
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
                        <button className='button mt-auto' onClick={generateMaps}>Generate Maps</button>
                    </div>
                    <div className='w-full h-[65%] border-w rounded-md mt-[5px] p-[10px]'>
                        {maps.map((map, index) => {
                            return (
                                <div key={index}>
                                    {map}
                                </div>
                            )
                        })}
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