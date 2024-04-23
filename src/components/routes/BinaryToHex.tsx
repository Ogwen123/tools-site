import React from 'react'
import { binaryToDenary, denaryToHex, hexToBinary } from '../../utils/conversions'
import Alert, { alertReset } from '../Alert'
import { _Alert } from '../../global/types'

const BinaryToHex = () => {

    const [binary, setBinary] = React.useState<string>("")
    const [hex, setHex] = React.useState<string>("")
    const [lastChanged, setLastChanged] = React.useState<"BIN" | "HEX">()
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])

    const convert = () => {
        if (lastChanged === "BIN") {
            const denary = binaryToDenary(binary, false)
            if (denary === false) {
                setAlert(["Invalid binary format.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }
            const hexValue = denaryToHex(denary.toString())
            if (hexValue === false) {
                setAlert(["An error occured while converting, this could be because of invalid binary.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }
            setHex(hexValue.toString())
        } else {
            let tempHex = hex
            if (hex.startsWith("0x")) {
                tempHex = hex.slice(2)
            }

            const binaryValue = hexToBinary(tempHex)

            if (binaryValue === false) {
                setAlert(["Invalid binary format.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }

            setBinary(binaryValue)
        }
    }

    return (
        <div className='flex fc flex-col'>
            <div className='text-4xl mt-[100px]'>Binary to Hexidecimal</div>
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
                    <div>Hex</div>
                    <input
                        value={hex}
                        onChange={(e) => {
                            setHex(e.target.value.toUpperCase().replace(/X/g, "x"))
                            setLastChanged("HEX")
                        }}
                        placeholder='Hex'
                        className='form-input bg-bg'
                    ></input>
                </div>
                <button className='button my-[10px]' onClick={() => convert()}>Convert</button>
            </div>
        </div>
    )
}

export default BinaryToHex