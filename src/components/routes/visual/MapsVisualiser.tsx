import React from 'react'
import { _Alert } from '../../../global/types'

const MapsVisualiser = () => {

    const [sets, setSets] = React.useState<{ a: number[], b: number[] }>({ a: [], b: [] })
    const [maps, setMaps] = React.useState<number[][][]>([])
    const [selectedMapping, setSelectedMapping] = React.useState<number>(-1)
    const [settings, setSettings] = React.useState<{ injective: boolean, surjective: boolean }>({ injective: false, surjective: false })
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])

    const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

    React.useEffect(() => {
        let valid = true

        if ((document.getElementById("set-input-1") as HTMLInputElement)?.value!.replace(/ /g, "").split(",").map(validateInput).includes(null)) { console.log("1"); valid = false }
        if ((document.getElementById("set-input-2") as HTMLInputElement)?.value!.replace(/ /g, "").split(",").map(validateInput).includes(null)) { console.log("2"); valid = false }
        console.log(valid)
        if (valid) setAlert(["Alert", "ERROR", false])
    }, [sets])

    React.useEffect(() => {
        if (selectedMapping == -1) return
        const canvas = document.getElementById("mapCanvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d")!
        ctx.lineWidth = 1
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        maps[selectedMapping].forEach((value, _) => {
            ctx.beginPath();

            // calculate start point
            const startHeight = (canvas?.height / (sets.a.length + 1)) * (sets.a.indexOf(value[0]) + 1)

            const endHeight = (canvas?.height / (sets.b.length + 1)) * (sets.b.indexOf(value[1]) + 1)

            ctx.moveTo(0, startHeight);

            ctx.lineTo(canvas.width, endHeight);

            ctx.stroke();
            return (
                <div hidden></div>
            )
        })
    }, [selectedMapping])

    const generateMaps = () => {
        let args = []

        for (let _ in sets.a) {
            args.push(sets.b)
        }

        const cartB = cartesian(...args)

        let map: number[][][] = []

        for (let i of cartB) {
            map.push(i.map(function (val: any, index: any) {
                return [sets.a[index], val];
            }))
        }

        setSelectedMapping(0)
        setMaps(map)
    }

    const validateInput = (value: string, index: number, arr: string[]) => {
        if (!value) return undefined
        if (!/^[\d-]+$/.test(value)) {
            setAlert(["All entries must be a number!", "ERROR", true])
            return null
        } else if (arr.indexOf(value) !== index) {
            setAlert(["All entries must be unique!", "ERROR", true])
            return null
        } else {
            return parseInt(value)
        }
    }

    return (
        <div className='flex items-center flex-col h-full'>
            <div className='text-2xl h-[32px]'>
                Set Maps Visualiser
            </div>
            {
                alert[2] ?
                    <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px] h-[44px] bg-error'>
                        {alert[0]}
                    </div>
                    :
                    <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px] h-[44px]'>
                        Enter 2 sets and view all the possible maps and visualise them.
                    </div>
            }
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
                            id="set-input-1"
                            onChange={(e) => {
                                // @ts-ignore
                                setSets((set) => {
                                    return ({
                                        ...set,
                                        a: e.target.value.replace(/ /g, "").split(",").map(validateInput).filter((value, _) => value !== undefined && value !== null)
                                    });
                                })
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Set 2"
                            className="form-input"
                            id="set-input-2"
                            onChange={(e) => {
                                // @ts-ignore
                                setSets((set) => {
                                    return ({
                                        ...set,
                                        b: e.target.value.replace(/ /g, "").split(",").map(validateInput).filter((value, _) => value !== undefined && value !== null)
                                    });
                                })
                            }}
                        />
                        <button
                            className='button mt-auto disabled:bg-opacity-30 disabled:text-gray-500 disabled:hover:bg-main disabled:hover:bg-opacity-30'
                            onClick={generateMaps}
                            disabled={alert[2]}
                        >Generate Maps</button>
                    </div>
                    <div className='w-full h-[65%] border-w rounded-md mt-[5px] p-[10px] overflow-auto'>
                        {maps.map((map, index) => {
                            return (
                                <div
                                    key={index}
                                    className={'bg-bgdark rounded-md w-full p-[10px] hover:bg-opacity-50 mb-[10px]' + (selectedMapping === index ? " bg-main" : "")}
                                    onClick={() => {
                                        setSelectedMapping(index)
                                    }}
                                >
                                    {
                                        map.map((pair, index) => {

                                            return (
                                                <div key={index}>
                                                    {pair[0]}↦{pair[1]}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='h-full flex-grow border-w rounded-md ml-[5px] p-[10px]'>
                    {maps.length == 0 ?
                        <div>
                            Select a mapping and its visual will appear here...
                        </div>
                        :
                        <div className='h-full flex flex-row'>
                            <div className='w-[20%] flex flex-col h-full justify-evenly'>
                                {sets.a.map((value, index) => {
                                    return (
                                        <div key={index} className='fc'>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                            <canvas className='w-[60%]' id="mapCanvas">
                            </canvas>
                            <div className='w-[20%] flex flex-col h-full justify-evenly items-center'>
                                {sets.b.map((value, index) => {
                                    return (
                                        <div key={index}>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MapsVisualiser