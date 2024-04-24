import React from 'react'
import { PointData } from '../../../global/types'

interface PointListItemProps {
    pointData: PointData,
    updatePoint: (newPointData: PointData) => void
}

const PointListItem = ({ pointData, updatePoint }: PointListItemProps) => {
    return (
        <div>
            <input type="text" placeholder='X' value={pointData.x.toString()}></input>
            <input type="text" placeholder='Y' value={pointData.y.toString()}></input>
            <input type="text" placeholder='Colour' value={pointData.colour}></input>
        </div>
    )
}

export default PointListItem