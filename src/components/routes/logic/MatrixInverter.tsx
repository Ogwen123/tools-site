import React from 'react'
import { _Alert, IntermediateMatrix, Matrix } from '../../../global/types'
import Alert, { alertReset } from '../../Alert'
import { intermediateMatrixToArray, invertMatrix } from '../../../utils/maths'

const MatrixInverter = () => {

    const id = (x: number, y: number) => x + "-" + y
    const loc = (id: string): [number, number] => [parseInt(id.split("-")[0]), parseInt(id.split("-")[1])]

    const [stage, setStage] = React.useState<1 | 2 | 3>(1)
    const [dimensions, setDimensions] = React.useState<number>(2)
    const [intermediateMatrix, setIntermediateMatrix] = React.useState<IntermediateMatrix>({})
    const [matrixInputErrors, setMatrixInputErrors] = React.useState<string[]>([])
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [matrix, setMatrix] = React.useState<Matrix>()
    const [inverseSteps, setInverseSteps] = React.useState<Matrix[]>()
    const [invertible, setInvertible] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (matrix === undefined) return

        const inverted = invertMatrix(matrix)

        if (inverted === false) {
            setInvertible(false)
        } else {
            setInverseSteps(inverted)
        }

    }, [matrix])

    React.useEffect(() => {
        if (Object.keys(intermediateMatrix).length === 0) return

        setIntermediateMatrix((prev) => { // remove any entires from the intermediate matrix that do not fit in the new dimensions
            const filtered = Object.entries(prev).filter(([key, _]) => {
                const [x, y] = loc(key)

                if (x >= dimensions || y >= dimensions) {
                    return false
                } else {
                    return true
                }
            })

            const obj: IntermediateMatrix = {}
            filtered.forEach((val: [string, string]) => {
                obj[val[0]] = val[1]
            })

            return obj
        })
    }, [dimensions])

    return (
        <div className='flex fc flex-col'>
            <div className='text-2xl'>
                Matrix Inverter
            </div>
            <Alert
                content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                severity={alert[1]}
                show={alert[2]}
                title={alert[0] instanceof Array ? alert[0][0] : undefined}
                width="40%"
            />
            <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px]'>
                Invert matrices using reduced row echelon form.
            </div>
            <div className='w-[455px]'>
                <div className='flex flex-row items-center p-[10px]'>
                    <div className={'size-[15px] rounded-full z-10 bg-main'}></div>
                    <div className={'w-[200px] h-[8px] m-[-2px] ' + (stage > 1 ? "bg-main" : "bg-bgdark")}></div>
                    <div className={'size-[15px] rounded-full z-10 ' + (stage > 1 ? "bg-main" : "bg-bgdark")}></div>
                    <div className={'w-[200px] h-[8px] m-[-2px] ' + (stage > 2 ? "bg-main" : "bg-bgdark")}></div>
                    <div className={'size-[15px] rounded-full z-10 ' + (stage > 2 ? "bg-main" : "bg-bgdark")}></div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='w-[95px] text-start'>Dimensions</div>
                    <div className='w-[95px] text-center'>Matrix</div>
                    <div className='w-[95px] text-end'>Results</div>
                </div>
            </div>
            {
                stage === 1 ?
                    <div className='flex flex-col '>
                        <div className='flex flex-row mt-[50px] w-[450px] justify-evenly'>
                            <div className='flex flex-col'>
                                <div>Size</div>
                                <input type='number' min={2} max={10} value={dimensions} className='form-input' onChange={(e) => { setDimensions(e.target.valueAsNumber) }} />
                            </div>
                        </div>

                        <button
                            className='button mt-[50px]'
                            onClick={() => {
                                setStage(2)
                            }}
                        >Next</button>
                    </div>
                    :
                    stage === 2 ?
                        <div className='flex flex-col min-w-[450px]'>
                            <div className='fc flex-col mt-[50px]'>
                                {Array.from({ length: dimensions }, (_, index) => index).map((y) => {
                                    return (
                                        <div key={y} className='flex flex-row my-[5px]'>
                                            {Array.from({ length: dimensions }, (_, index2) => index2).map((x) => {
                                                return (
                                                    <input
                                                        key={id(x, y)}
                                                        className={'form-input size-20 text-center p-1 m-0 mx-[5px]' + (matrixInputErrors.includes(id(x, y)) ? " form-error" : "")}
                                                        value={intermediateMatrix[id(x, y)] ? intermediateMatrix[id(x, y)] : ""}
                                                        onChange={(e) => {
                                                            if (isNaN(parseInt(e.target.value))) {
                                                                setMatrixInputErrors((prev) => ([...prev, id(x, y)]))
                                                            } else {
                                                                setMatrixInputErrors((prev) => (prev.filter((val) => { val !== id(x, y) })))
                                                            }

                                                            setIntermediateMatrix((prev) => ({ ...prev, [id(x, y)]: e.target.value }))
                                                        }} />
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='mt-[50px] flex flex-row w-full'>
                                <button
                                    className='button mx-[5px] bg-warning'
                                    onClick={() => {
                                        setStage(1)
                                    }}
                                >Back</button>
                                <button
                                    className='button mx-[5px]'
                                    onClick={() => {
                                        //validations
                                        if (Object.keys(intermediateMatrix).length !== (dimensions ** 2)) {
                                            console.log(intermediateMatrix)
                                            setAlert(["Fill in all the matrix elements to move on.", "ERROR", true])
                                            setTimeout(() => {
                                                setAlert(alertReset)
                                            }, 5000)
                                            return
                                        }

                                        // next stage
                                        setMatrix(intermediateMatrixToArray(intermediateMatrix))
                                        setStage(3)
                                    }}
                                >Next</button>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col min-w-[450px]'>
                            <div>
                                {inverseSteps === undefined ?
                                    <div>Loading...</div>
                                    :
                                    <div>
                                        {invertible ?
                                            <div>

                                            </div>
                                            :
                                            <div>
                                                This matrix is not invertible
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className='mt-[50px] flex flex-row w-full'>
                                <button
                                    className='button mx-[5px] bg-warning'
                                    onClick={() => {
                                        setStage(2)
                                    }}
                                >Back</button>
                            </div>
                        </div>


            }

        </div>
    )
}

export default MatrixInverter