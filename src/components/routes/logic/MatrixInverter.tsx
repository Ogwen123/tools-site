import React from 'react'
import { _Alert, IntermediateMatrix } from '../../../global/types'
import Alert, { alertReset } from '../../Alert'
import { intermediateMatrixToArray } from '../../../utils/maths'

const MatrixInverter = () => {

    const id = (x: number, y: number) => x + "-" + y

    const [stage, setStage] = React.useState<1 | 2 | 3>(1)
    const [dimensions, setDimensions] = React.useState<{ n: number, m: number }>({ n: 2, m: 2 })
    const [intermediateMatrix, setIntermediateMatrix] = React.useState<IntermediateMatrix>({})
    const [matrixInputErrors, setMatrixInputErrors] = React.useState<string[]>([])
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [matrix, setMatrix] = React.useState<number[][]>()

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
                Invert Matrices
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
                                <div>Rows (m)</div>
                                <input type='number' min={2} max={10} value={dimensions.m} className='form-input' onChange={(e) => { setDimensions((prev) => ({ n: prev.n, m: e.target.valueAsNumber })) }} />
                            </div>
                            <div className='flex flex-col'>
                                <div>Columns (n)</div>
                                <input type='number' min={2} max={10} value={dimensions.n} className='form-input' onChange={(e) => { setDimensions((prev) => ({ m: prev.m, n: e.target.valueAsNumber })) }} />
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
                                {Array.from({ length: dimensions.m }, (_, index) => index).map((y) => {
                                    return (
                                        <div key={y} className='flex flex-row my-[5px]'>
                                            {Array.from({ length: dimensions.n }, (_, index2) => index2).map((x) => {
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
                                    className='button mx-[5px]'
                                    onClick={() => {
                                        setStage(1)
                                    }}
                                >Back</button>
                                <button
                                    className='button mx-[5px]'
                                    onClick={() => {
                                        //validations
                                        if (Object.keys(intermediateMatrix).length !== (dimensions.n * dimensions.m)) {
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
                        <div>

                        </div>


            }

        </div>
    )
}

export default MatrixInverter