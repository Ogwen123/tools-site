import React from 'react'

const MatrixInverter = () => {

    const [stage, setStage] = React.useState<1 | 2 | 3>(1)

    return (
        <div className='flex fc flex-col'>
            <div className='text-2xl'>
                Matrix Inverter
            </div>
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
                    <div className='flex flex-col'>
                        <div className='flex flex-row mt-[50px] w-[450px] justify-evenly'>
                            <div className='flex flex-col'>
                                <div>Rows (m)</div>
                                <input type='number' min={1} max={10} defaultValue={0} className='form-input' />
                            </div>
                            <div className='flex flex-col'>
                                <div>Columns (n)</div>
                                <input type='number' min={1} max={10} defaultValue={0} className='form-input' />
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
                        <div>

                        </div>
                        :
                        <div>

                        </div>


            }

        </div>
    )
}

export default MatrixInverter