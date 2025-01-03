import React from 'react';
import { ColourConversionResult, ColourFormat, ColourInput } from "../../../global/types.ts";
import { colourToRGB, RGBToColours } from "../../../utils/conversions.ts";
import { Square2StackIcon } from "@heroicons/react/20/solid";

const ColourConversions = () => {
    const [colour, setColour] = React.useState<ColourInput>({ input: "", type: "NONE" })
    const [conversionResult, setConversionResult] = React.useState<ColourConversionResult>({
        active: false,
        cmyk: "",
        hex: "",
        hsl: "",
        hwb: "",
        rgb: ""
    })

    React.useEffect(() => {
        if (colour.type === "NONE" || colour.input === "") return

        setConversionResult(RGBToColours(colourToRGB(colour)))
    }, [colour])

    const detectFormat = (input: string): ColourFormat => {
        const rgbRegex = /rgb\(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\)/
        const hexRegex = /#[\dA-Fa-f]{6}/
        const hslRegex = /hsl\(([0-9]|[1-9][0-9]|[12][0-9]{2}|3[0-5][0-9]|360), ?(([0-9]|[1-9][0-9]|100)%|(0|0\.[0-9]{1,2}|1)), ?(([0-9]|[1-9][0-9]|100)%|(0|0\.[0-9]{1,2}|1))\)/
        const hwbRegex = /hwb\(\d{1,3}, ?(([0-9]|[1-9][0-9]|100)%|(0|0\.[0-9]{1,2}|1)), ?(([0-9]|[1-9][0-9]|100)%|(0|0\.[0-9]{1,2}|1))\)/
        const cmykRegex = /cmyk\(((0|[1-9][0-9]?)(\.[0-9]{1,2})?|100)%, ?((0|[1-9][0-9]?)(\.[0-9]{1,2})?|100)%, ?((0|[1-9][0-9]?)(\.[0-9]{1,2})?|100)%, ?((0|[1-9][0-9]?)(\.[0-9]{1,2})?|100)%\)/

        if (rgbRegex.test(input)) {
            return "RGB"
        } else if (hexRegex.test(input)) {
            return "HEX"
        } else if (hslRegex.test(input)) {
            return "HSL"
        } else if (hwbRegex.test(input)) {
            return "HWB"
        } else if (cmykRegex.test(input)) {
            return "CMYK"
        } else {
            return "NONE"
        }

    }

    return (
        <div className="flex fc flex-col">
            <div className='text-4xl mt-[100px]'>Colour Conversions</div>
            <div className='w-2/5 mt-[30px] bg-bgdark rounded-md p-[10px]'>
                <input
                    className="form-input bg-bg"
                    onChange={(e) => {
                        setColour({
                            input: e.currentTarget.value,
                            type: detectFormat(e.currentTarget.value)
                        })
                    }}
                    placeholder="RGB, Hex, HSL, HWB, CMYK"
                />
                <div className="text-center">
                    <span className="text-subtext">Detected format:</span> <span
                        className={colour.type === "NONE" ? "text-error" : "text-main"}>{colour.type === "NONE" ? "None" : colour.type}</span>
                </div>
                <div className="text-lg flex flex-row justify-between">
                    <div>
                        <span className="text-subtext">RGB</span> : {conversionResult.active ? conversionResult.rgb : "None"}
                    </div>
                    <Square2StackIcon className="colour-copy" onClick={() => { if (conversionResult.active) navigator.clipboard.writeText(conversionResult.rgb) }} />
                </div>
                <div className="text-lg flex flex-row justify-between">
                    <div>
                        <span className="text-subtext">Hex</span> : {conversionResult.active ? conversionResult.hex : "None"}
                    </div>
                    <Square2StackIcon className="colour-copy" onClick={() => { if (conversionResult.active) navigator.clipboard.writeText(conversionResult.hex) }} />
                </div>
                <div className="text-lg flex flex-row justify-between">
                    <div>
                        <span className="text-subtext">HSL</span> : {conversionResult.active ? conversionResult.hsl : "None"}
                    </div>
                    <Square2StackIcon className="colour-copy" onClick={() => { if (conversionResult.active) navigator.clipboard.writeText(conversionResult.hsl) }} />
                </div>
                <div className="text-lg flex flex-row justify-between">
                    <div>
                        <span className="text-subtext">HWB</span> : {conversionResult.active ? conversionResult.hwb : "None"}
                    </div>
                    <Square2StackIcon className="colour-copy" onClick={() => { if (conversionResult.active) navigator.clipboard.writeText(conversionResult.hwb) }} />
                </div>
                <div className="text-lg flex flex-row justify-between">
                    <div>
                        <span className="text-subtext">CMYK</span> : {conversionResult.active ? conversionResult.cmyk : "None"}
                    </div>
                    <Square2StackIcon className="colour-copy" onClick={() => { if (conversionResult.active) navigator.clipboard.writeText(conversionResult.cmyk) }} />
                </div>
            </div>
        </div>
    );
};

export default ColourConversions;