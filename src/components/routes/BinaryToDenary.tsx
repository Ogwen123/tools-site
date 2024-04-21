//import React from 'react'

const BinaryToDenary = () => {
    return (
        <div className='flex fc flex-col'>
            <div className='text-4xl mt-[100px]'>Binary to Hexidecimal</div>
            <div className='w-2/5 mt-[30px] bg-bgdark rounded-md p-[10px]'>
                <div className='my-[10px]'>
                    <div>Binary</div>
                    <input
                        value={binary}
                        onChange={(e) => {
                            setBinary(e.target.value)
                            setLastChanged("BIN")
                        }}
                        placeholder='Binary'
                        className='form-input bg-bg'
                    ></input>
                </div>
                <div className='my-[10px]'>
                    <div>Hex</div>
                    <input
                        value={hex}
                        onChange={(e) => {
                            setHex(e.target.value)
                            setLastChanged("HEX")
                        }}
                        placeholder='Hex'
                        className='form-input bg-bg'
                    ></input>
                </div>
                <div className='my-[10px]'>
                    <div className='flex items-center flex-row'>
                        <div className='mr-[10px]'>Two's Compliment</div>
                        <input
                            type="checkbox"
                            className='accent-main h-4 w-4'
                            checked={tc}
                            onChange={(e) => {
                                setTc(e.target.checked)
                            }}
                        />
                    </div>
                </div>
                <button className='button my-[10px]' onClick={() => convert()}>Convert</button>
            </div>
        </div>
    )
}

export default BinaryToDenary