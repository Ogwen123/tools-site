import React from 'react'
import { Matrix as _Matrix } from '../../../../global/types'

interface MatrixInterface {
    matrix: _Matrix,
    altMatrix?: _Matrix
}

interface MatrixCompInterface {
    matrix: _Matrix,
    xLabels?: boolean,
    yLabels?: boolean,
    xLabelPreface?: string,
    yLabelPreface?: string,
    sharpSide?: "L" | "R" | "N"
}

const Matrix = ({ matrix, altMatrix }: MatrixInterface) => {

    const [valid, setValid] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (matrix.length < 2) {
            setValid(false)
            return
        }

        if (!matrix.every((elem) => elem.length === matrix[0].length)) {
            setValid(false)
            return
        }
    }, [])

    return (
        <div>
            {
                valid ?
                    <div className='mt-[50px]'>
                        {
                            !altMatrix ?
                                <MatrixComp matrix={matrix} />
                                :
                                <div className='fc flex-row'>
                                    <MatrixComp matrix={matrix} sharpSide='R' />
                                    <MatrixComp matrix={altMatrix} yLabels={false} sharpSide='L' xLabelPreface='A' />
                                </div>
                        }
                    </div>
                    :
                    <div className='text-error'>Invalid Matrix</div>
            }
        </div>
    )
}

const MatrixComp = ({ matrix, xLabels = true, yLabels = true, xLabelPreface, yLabelPreface, sharpSide = "N" }: MatrixCompInterface) => {
    return (
        <div className='fc'>
            <div className={'inline-block border border-gray-600  overflow-hidden flex-shrink ' +
                (sharpSide === "N" ? "rounded-lg" : sharpSide === "R" ? "rounded-l-lg" : "rounded-r-lg")
            }>
                <div className='flex flex-row'>
                    {xLabels && yLabels &&
                        <div className={'p-[5px] border border-gray-600 size-10 '}> {/*empty square in top left*/}

                        </div>
                    }
                    {xLabels &&
                        Array.from({ length: matrix[0].length }, (_, index) => index).map((index) => { // top labels
                            return (
                                <div
                                    key={index + "toprow"}
                                    className={"p-[5px] border border-gray-600 size-10 fc text-white/50 text-sm "}
                                >
                                    {xLabelPreface && xLabelPreface}{index + 1}
                                </div>
                            )
                        })
                    }
                </div>
                {Array.from({ length: matrix.length }, (_, index) => index).map((y) => {
                    return (
                        <div key={y} className='flex flex-row'>
                            {
                                yLabels && // side labels
                                <div
                                    className={'p-[5px] border border-gray-600 size-10 fc text-white/50 text-sm '}
                                >
                                    {yLabelPreface && yLabelPreface}{y + 1}
                                </div>
                            }
                            {Array.from({ length: matrix[0].length }, (_, index2) => index2).map((x) => {
                                return (
                                    <div
                                        key={x + "-" + y + "res"}
                                        className={'border border-gray-600 size-10 fc '}
                                    >
                                        {matrix[y][x]}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Matrix