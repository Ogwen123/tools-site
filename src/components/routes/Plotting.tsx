import React from 'react'
import { PointData } from '../../global/types'

const Plotting = () => {

    window.onload = () => {
        setParentWidth(document.getElementById("parent")?.offsetWidth! || 1600)
    }

    const idTracker = 0

    const updatePoint = () => {

    }

    const addPoint = () => {

    }

    const [parentWidth, setParentWidth] = React.useState<number>(1600)
    const [points, setPoints] = React.useState<PointData[]>([{ id: 0, x: 10, y: 10, colour: "#009788", show: true }])

    const HEIGHT = 750
    const WIDTH = 1200

    return (
        <div>
            <div className="flex w-full" id="parent">
                <div
                    className="min-w-[200px] m-[10px]"
                    style={{
                        width: parentWidth - WIDTH - 20 - 1 + "px" /* the -20 is for the margins and the -4 is for the border*/
                    }}
                >
                    <button className="button" onClick={() => addPoint()}>
                        Add Point
                    </button>
                </div>

                <div
                    className="relative bg-bgdark z-1 rounded-md m-[10px] border-solid border-hrdark border-[1px]"
                    style={{ height: HEIGHT + "px", width: WIDTH + "px" }}
                >
                    <div
                        className="relative border-b-solid border-b-white border-b-[1px] border-r-solid border-r-white border-r-[1px]"
                        style={{
                            height: HEIGHT / 2 + "px",
                            width: WIDTH / 2 + "px",
                            left: "0",
                            top: "0"
                        }}
                    >
                        {
                            points.map((point, index) => {
                                return (
                                    <div key={index}>
                                        {point.id}
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div
                        className="absolute border-b-solid border-b-white border-b-[1px] border-l-solid border-l-white border-l-[1px]"
                        style={{
                            height: HEIGHT / 2 + "px",
                            width: WIDTH / 2 + "px",
                            left: WIDTH / 2 + "px",
                            top: "0"
                        }}
                    >

                    </div>


                    <div
                        className="absolute border-t-solid border-t-white border-t-[1px] border-r-solid border-r-white border-r-[1px]"
                        style={{
                            height: HEIGHT / 2 + "px",
                            width: WIDTH / 2 + "px",
                            left: "0",
                            top: HEIGHT / 2 + "px"
                        }}
                    >

                    </div>


                    <div
                        className="absolute border-t-solid border-t-white border-t-[1px] border-l-solid border-l-white border-l-[1px]"
                        style={{
                            height: HEIGHT / 2 + "px",
                            width: WIDTH / 2 + "px",
                            left: WIDTH / 2 + "px",
                            top: HEIGHT / 2 + "px"
                        }}
                    >

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plotting