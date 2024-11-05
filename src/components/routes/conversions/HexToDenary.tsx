//import React from 'react'

import React from "react"
import { _Alert } from "../../../global/types"
import { binaryToDenary, denaryToHex, hexToBinary } from "../../../utils/conversions"
import Alert, { alertReset } from "../../Alert"

const HexToDenary = () => {
    const [hex, setHex] = React.useState<string>("")
    const [denary, setDenary] = React.useState<string>("")
    const [lastChanged, setLastChanged] = React.useState<"HEX" | "DEN">("HEX")
    const [alert, setAlert] = React.useState<_Alert>(["Alert", "ERROR", false])


    const convert = () => {
        if (lastChanged === "HEX") {
            const binaryValue = hexToBinary(hex)

            if (binaryValue === false) {
                setAlert(["Invalid Hex.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }

            const denaryValue = binaryToDenary(binaryValue, false)

            if (denaryValue === false) {
                setAlert(["An error occured during conversion, this could be due to invalid hex.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }

            setDenary(denaryValue.toString())
        } else {
            const hexValue = denaryToHex(denary)

            if (hexValue === false) {
                setAlert(["Invalid Denary.", "ERROR", true])
                setTimeout(() => { setAlert(alertReset) }, 5000)
                return
            }

            setHex(hexValue)
        }
    }

    return (
        <div className='flex fc flex-col'>
            <div className='text-4xl mt-[100px]'>Hex to Denary</div>
            <div className='w-2/5 mt-[30px] bg-bgdark rounded-md p-[10px]'>
                <Alert
                    content={alert[0] instanceof Array ? alert[0][1] : alert[0]}
                    severity={alert[1]}
                    show={alert[2]}
                    title={alert[0] instanceof Array ? alert[0][0] : undefined}
                />
                <div className='my-[10px]'>
                    <div>Hexadecimal</div>
                    <input
                        value={hex}
                        onChange={(e) => {
                            setHex(e.target.value.toUpperCase())
                            setLastChanged("HEX")
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
                <button className='button my-[10px]' onClick={() => convert()}>Convert</button>
            </div>
        </div>
    )
}

export default HexToDenary