import React from 'react'
import { binaryToDenary, denaryToBinary } from '../../utils/conversions'
import { _Alert } from '../../global/types'
import Alert, { alertReset } from '../Alert'

const BinaryToDenary = () => {

    const [binary, setBinary] = React.useState<string>("")
    const [denary, setDenary] = React.useState<string>("")
    const [tc, setTc] = React.useState<boolean>(false)
    const [lastChanged, setLastChanged] = React.useState<"BIN" | "DEN">()
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])


    const convert = () => {
        console.log("123")
        if (lastChanged === "BIN") {
            const denaryValue = binaryToDenary(binary, tc)

            if (denaryValue === false) {
                setAlert(["Invalid binary format.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }

            setDenary(denaryValue.toString())
        } else {
            const binaryValue = denaryToBinary(denary, tc)

            if (binaryValue === false) {
                setAlert(["Invalid denary.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }

            setBinary(binaryValue)
        }
    }

    return (
        <div className='flex fc flex-col'>
            <div className='text-4xl mt-[100px]'>Binary to Denary</div>
            <div className='w-2/5 mt-[30px] bg-bgdark rounded-md p-[10px]'>
                <Alert
                    content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                    severity={alert[1]}
                    show={alert[2]}
                    title={alert[0] instanceof Array ? alert[0][0] : undefined}
                />
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
                    <div>Denary</div>
                    <input
                        value={denary}
                        onChange={(e) => {
                            setDenary(e.target.value)
                            setLastChanged("DEN")
                        }}
                        placeholder='Denary'
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