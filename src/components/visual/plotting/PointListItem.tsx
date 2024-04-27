import React from 'react'
import { PointData } from '../../../global/types'
import { validHexColour } from '../../../utils/utils'

interface PointListItemProps {
    pointData: PointData,
    updatePoint: (newPointData: PointData) => void
}

const PointListItem = ({ pointData, updatePoint }: PointListItemProps) => {

    const [pointBuffer, setPointBuffer] = React.useState<PointData>(pointData)

    const [alert, setAlert] = React.useState<[string, boolean]>(["Nothing", false])

    return (
        <div className='bg-bgdark p-[10px] my-[10px] rounded-md'>
            {
                alert[1] &&
                <div className='text-error text-sm'>
                    {alert[0]}
                </div>
            }
            <div className='flex flex-row'>
                <input
                    type="text"
                    placeholder='X'
                    className='form-input bg-bg p-[5px] mr-[5px]'
                    value={isNaN(pointBuffer.x) ? "" : pointBuffer.x.toString()}
                    onChange={(e) => {
                        //let x = 0
                        if (isNaN(parseFloat(e.target.value)) && e.target.value !== "") {
                            setAlert(["Invalid Number", true])
                            return
                        }/* else {
                            if (e.target.value !== "") {
                                x = parseFloat(e.target.value)
                            }
                        }*/
                        setAlert(["Nothing", false])
                        setPointBuffer((prev) => ({ ...prev, x: parseFloat(e.target.value) }))
                    }}
                />
                <input
                    type="text"
                    placeholder='Y'
                    className='form-input bg-bg p-[5px] ml-[5px]'
                    value={isNaN(pointBuffer.y) ? "" : pointBuffer.y.toString()}
                    onChange={(e) => {
                        if (isNaN(parseFloat(e.target.value)) && e.target.value !== "") {
                            setAlert(["Invalid Number", true])
                            return
                        }
                        setAlert(["Nothing", false])
                        setPointBuffer((prev) => ({ ...prev, y: parseFloat(e.target.value) }))
                    }}
                />
            </div>
            <div className='flex flex-row items-center'>
                <div style={{ backgroundColor: validHexColour(pointBuffer.colour) ? pointBuffer.colour : "#FFF" }} className='h-[30px] w-[38px] rounded-md mr-[5px]'></div>
                <input
                    type="text"
                    placeholder='Colour'
                    className='form-input bg-bg p-[5px] mx-[5px]'
                    value={pointBuffer.colour}
                    onChange={(e) => {
                        let colour = e.target.value

                        if (!e.target.value.startsWith("#")) {
                            colour = "#" + colour
                        }
                        setPointBuffer((prev) => ({ ...prev, colour }))
                    }}
                />
                <input type="checkbox" className='accent-main ml-[5px] h-[30px] w-[30px]' checked={pointBuffer.show} />
            </div>
        </div>
    )
}

export default PointListItem