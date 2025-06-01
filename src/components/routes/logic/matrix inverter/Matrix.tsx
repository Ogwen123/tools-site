import React from 'react'
import { Matrix as _Matrix } from '../../../../global/types'

interface MatrixInterface {
    matrix: _Matrix,
    altMatrix?: _Matrix
}

interface MatrixCompInterface {
    matrix: _Matrix,
    xLabels?: boolean,
    yLabels?: boolean
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
                    <div>
                        <MatrixComp2 matrix={matrix} xLabels={false} />
                        <MatrixComp2 matrix={matrix} yLabels={false} />
                        <MatrixComp2 matrix={matrix} xLabels={false} yLabels={false} />
                        <MatrixComp2 matrix={matrix} />
                    </div>
                    :
                    <div className='text-error'>Invalid Matrix</div>
            }
        </div>
    )
}

const MatrixComp = ({ matrix, xLabels = true, yLabels = true, sharpSide = "N" }: MatrixCompInterface) => {
    return (
        <div className='fc flex-col mt-[50px]'>
            <div className='flex flex-row'>
                {xLabels && yLabels &&
                    <div className={'p-[5px] border border-gray-600 size-10 ' + (sharpSide !== "L" ? "rounded-tl-lg" : "")}> {/*empty square in top left*/}

                    </div>
                }
                {xLabels &&
                    Array.from({ length: matrix[0].length }, (_, index) => index).map((index) => { // top labels
                        return (
                            <div
                                key={index + "toprow"}
                                className={"p-[5px] border border-gray-600 size-10 fc text-white/50 text-sm " +
                                    (index === matrix[0].length - 1 && sharpSide !== "R" ? "rounded-tr-lg" : index === 0 && !yLabels && !xLabels ? "rounded-tl-lg" : "")
                                }
                            >
                                {index + 1}
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
                                className={'p-[5px] border border-gray-600 size-10 fc text-white/50 text-sm ' +
                                    ((y === matrix.length - 1 && sharpSide !== "L") ? "rounded-bl-lg" : (y === 0 && sharpSide !== "L") ? "rounded-tl-lg" : "")
                                }
                            >
                                {y + 1}
                            </div>
                        }
                        {Array.from({ length: matrix[0].length }, (_, index2) => index2).map((x) => {
                            return (
                                <div
                                    key={x + "-" + y + "res"}
                                    className={'border border-gray-600 size-10 fc ' +
                                        (x === matrix[0].length - 1 && y === matrix.length - 1 && sharpSide !== "R" ? "rounded-br-lg " : "") +
                                        (!yLabels && y === matrix.length - 1 && x === 0 && sharpSide !== "L" ? "rounded-bl-lg " : "") +
                                        (!xLabels && x === matrix[0].length - 1 && y == 0 ? "rounded-tr-lg " : "") +
                                        (!yLabels && !xLabels ? "rounded-tl-lg " : "")
                                    }
                                >
                                    {matrix[y][x]}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

const MatrixComp2 = ({ matrix, xLabels = true, yLabels = true, sharpSide = "N" }: MatrixCompInterface) => {
    return (
        <div className='fc'>
            <div className='inline-block mt-[50px] border border-gray-600 rounded-lg overflow-hidden flex-shrink'>
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
                                    {index + 1}
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
                                    {y + 1}
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