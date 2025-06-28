import React from 'react'
import { _Alert, IntermediateMatrix, Matrix as _Matrix, Stage, SavedMatrix } from '../../../global/types'
import Alert, { alertReset } from '../../Alert'
import { arrayToIntermediateMatrix, intermediateMatrixToArray, invertMatrix } from '../../../utils/maths'
import Matrix from './matrix inverter/Matrix'
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const MatrixInverter = () => {

    const id = (x: number, y: number) => x + "-" + y
    const loc = (id: string): [number, number] => [parseInt(id.split("-")[0]), parseInt(id.split("-")[1])]

    const [stage, setStage] = React.useState<1 | 2 | 3>(1)
    const [dimensions, setDimensions] = React.useState<number>(2)
    const [intermediateMatrix, setIntermediateMatrix] = React.useState<IntermediateMatrix>({})
    const [matrixInputErrors, setMatrixInputErrors] = React.useState<string[]>([])
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])
    const [matrix, setMatrix] = React.useState<_Matrix>()
    const [inverseSteps, setInverseSteps] = React.useState<Stage[]>()
    const [invertible, setInvertible] = React.useState<boolean>(true)
    const [determinant, setDeterminant] = React.useState<number>()
    const [savedMatrices, setSavedMatrices] = React.useState<SavedMatrix[]>()
    const [nameInput, setNameInput] = React.useState<boolean>(false)
    const [showStages, setShowStages] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (localStorage.getItem("saved_matrices") === null) return

        const savedMatrices: SavedMatrix[] = JSON.parse(localStorage.getItem("saved_matrices")!)
        setSavedMatrices(savedMatrices)
    }, [])

    React.useEffect(() => {
        if (matrix === undefined) return

        const inverted = invertMatrix(matrix)

        if (inverted === false) {
            setInvertible(false)
            setInverseSteps([])
        } else {
            setInverseSteps(inverted.stages)
            setDeterminant(inverted.det)
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

    const saveMatrix = () => {
        const name = (document.getElementById("name-input") as HTMLInputElement).value

        const value: SavedMatrix = { name: name, matrix: intermediateMatrixToArray(intermediateMatrix) }

        if (localStorage.getItem("saved_matrices") === null) localStorage.setItem("saved_matrices", JSON.stringify([value]))
        else {
            const savedMatrices: SavedMatrix[] = JSON.parse(localStorage.getItem("saved_matrices")!)
            savedMatrices.push(value)
            localStorage.setItem("saved_matrices", JSON.stringify(savedMatrices))
        }

        setNameInput(false)
    }

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
                        <div>
                            <div className='text-lg fc mt-[50px] mb-[10px]'>Saved Matrices</div>
                            {
                                savedMatrices?.map((value, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='bg-bgdark p-[10px] my-[10px] hover:bg-bgdark/75 rounded-md flex flex-row justify-between items-center group'
                                            onClick={() => {
                                                setStage(2)
                                                setIntermediateMatrix(arrayToIntermediateMatrix(value.matrix))
                                                setDimensions(value.matrix.length)
                                            }}
                                        >
                                            {value.name} <ArrowRightIcon className='size-6 group-hover:text-main transition-all group-hover:size-8' />
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                            {
                                nameInput &&
                                <input placeholder='Name' id="name-input" className='form-input mt-[50px] mb-[-40px]' />
                            }
                            <button
                                className='button mt-[50px]'
                                onClick={() => {
                                    if (nameInput === true) {
                                        saveMatrix()
                                    } else {
                                        setNameInput(true)
                                    }
                                }}
                            >Save</button>
                            <div className='flex flex-row w-full'>
                                <button
                                    className='button mr-[5px] bg-warning'
                                    onClick={() => {
                                        setStage(1)
                                    }}
                                >Back</button>
                                <button
                                    className='button ml-[5px]'
                                    onClick={() => {
                                        //validations
                                        if (Object.keys(intermediateMatrix).length !== (dimensions ** 2)) {
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
                                >Solve</button>
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
                                                <div className='mt-[50px]'>
                                                    <button className={'w-full p-[10px] bg-bgdark flex flex-row items-center hover:text-main ' + (showStages ? "rounded-tl-md rounded-tr-md" : "rounded-md")} onClick={() => { setShowStages((prev) => !prev) }}>
                                                        {showStages ? <ChevronDownIcon className='size-5' /> : <ChevronRightIcon className='size-5' />}   Stages
                                                    </button>
                                                    {showStages &&
                                                        <div className='w-full p-[10px] rounded-bl-md rounded-br-md bg-bgdark flex flex-col items-center'>
                                                            {
                                                                inverseSteps.map((val, index) => {
                                                                    return (
                                                                        <div
                                                                            key={"matrix" + index}
                                                                            className='mt-[10px]'
                                                                        >
                                                                            Step {index + 1}
                                                                            <Matrix
                                                                                matrix={val.matrix}
                                                                                altMatrix={val.altMatrix}
                                                                                classname='mt-[5px]'
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                                <div className='mt-[10px] text-center'>
                                                    Determinant: {determinant}
                                                </div>
                                                <Matrix
                                                    matrix={inverseSteps[inverseSteps.length - 1].altMatrix}
                                                    classname='mt-[10px]'
                                                />
                                            </div>
                                            :
                                            <div className='fc text-lg mt-[40px]'>
                                                This matrix is not invertible. (Determinant is 0)
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