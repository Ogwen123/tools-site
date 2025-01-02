import HexToDenary from "../components/routes/conversions/HexToDenary.tsx";
import { ColourConversionResult, ColourInput, RGB } from "../global/types.ts";

export const validateInput = (input: string, type: "HEX" | "BIN" | "DEN"): boolean => {

    const validChars = {
        HEX: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
        BIN: ["0", "1"]
    }

    if (type === "DEN") {
        return !isNaN(parseInt(input))
    } else {
        for (let char of input) {
            if (!validChars[type].includes(char)) {
                return false
            }
        }
    }
    return true
}

export const denaryToBinary = (denaryStr: string, twosComp: boolean): string | false => {
    if (validateInput(denaryStr, "DEN") === false) return false

    let denary = parseInt(denaryStr)

    const negative = (denary < 0 ? true : false)

    denary = Math.abs(denary)

    let binaryLength = 0

    let binary = ""

    while (true) {
        binaryLength += 4

        if (denary < 2 ** binaryLength) {
            break
        }
    }

    for (let i = binaryLength - 1; i >= 0; i--) {
        if (denary - 2 ** i >= 0) {
            binary += "1"
            denary -= 2 ** i
        } else {
            binary += "0"
        }
    }

    if (negative) {
        if (twosComp) {
            const tempBinary = binary
            binary = ""

            if (tempBinary[0] === "1") {
                binary += "1111"
            }

            let rightMostOne = 0

            for (let i = 0; i < tempBinary.length; i++) {
                if (tempBinary[i] === "1") {
                    rightMostOne = i
                }
            }

            for (let i = 0; i < tempBinary.length; i++) {
                if (i < rightMostOne) {
                    if (tempBinary[i] === "1") {
                        binary += "0"
                    } else if (tempBinary[i] === "0") {
                        binary += "1"
                    } else {
                        binary += "0"
                    }
                } else {
                    binary += tempBinary[i]
                }
            }
        } else {
            binary = "-" + binary
        }
    }

    return binary
}

export const binaryToDenary = (binary: string, twosComp: boolean): number | false => {
    if (validateInput(binary, "BIN") === false) return false

    const convert = (binary: string): number => {
        let number = 0
        let count = binary.length - 1

        for (let i of binary) {
            number += parseInt(i) * 2 ** count
            count -= 1
        }

        return number
    }

    if (twosComp) {
        const mostSigBit = binary[0]
        const normalBinary = binary.slice(1)
        const mostSigNumber = parseInt(mostSigBit) * (2 ** (binary.length - 1))

        return (mostSigNumber - (mostSigNumber * 2)) + convert(normalBinary)

    } else {
        return convert(binary)
    }
}

export const denaryToHex = (denaryStr: string): string | false => {
    if (!validateInput(denaryStr, "DEN")) return false

    const convert = (number: number) => { // convert a denary number under 16 to hex
        if (number >= 16) return
        return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"][number]
    }

    const denary = parseInt(denaryStr)

    let hex = ""

    let intDivs: number[] = [denary]

    while (true) {
        if (intDivs[0] < 16) break
        intDivs = [Math.floor(intDivs[0] / 16), ...intDivs]
    }

    for (let i of intDivs) {
        hex += convert(i % 16)
    }

    return hex
}

export const hexToBinary = (hex: string): string | false => {
    if (validateInput(hex, "HEX") === false) return false

    let binary = ""

    const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

    for (let i of hex) {
        const num = hexValues.indexOf(i)

        binary += denaryToBinary(num.toString(), false)
    }

    return binary
}


export const colourToRGB = (input: ColourInput): RGB => {
    const DEFAULT = { blue: 0, green: 0, red: 0, string: "" }

    // helper functions
    const formatHSLAndHWB = (string: string) => {
        const values = string.split("(")[1].replace(/ /g, "").split(",")
        values[2] = values[2].replace(")", "")

        let numbers = [parseInt(values[0])]

        if (values[1].includes("%")) {
            numbers.push(parseInt(values[1].replace("%", "")) / 100)
        } else {
            numbers.push(parseFloat(values[1]))
        }

        if (values[2].includes("%")) {
            numbers.push(parseInt(values[2].replace("%", "")) / 100)
        } else {
            numbers.push(parseFloat(values[2]))
        }
        console.log(numbers)
        return numbers
    }

    const formatCMYK = (string: string) => {
        const values = string.replace("cmyk(", "").replace(")", "").replace(/%/g, "").replace(/ /g, "").split(",")
        console.log(values)
        return values.map((val) => parseFloat(val))
    }

    const HSLToRGB = (H: number, S: number, L: number) => {
        const C = (1 - Math.abs(2 * L - 1)) * S

        const HPrime = H / 60
        const X = C * (1 - Math.abs((HPrime % 2) - 1))

        let res: [number, number, number] = [0, 0, 0];

        if (HPrime >= 0 && HPrime < 1) {
            res = [C, X, 0]
        } else if (HPrime >= 1 && HPrime < 2) {
            res = [X, C, 0]
        } else if (HPrime >= 2 && HPrime < 3) {
            res = [0, C, X]
        } else if (HPrime >= 3 && HPrime < 4) {
            res = [0, X, C]
        } else if (HPrime >= 4 && HPrime < 5) {
            res = [X, 0, C]
        } else if (HPrime >= 5 && HPrime < 6) {
            res = [C, 0, X]
        }

        const m = L - (C / 2)

        const r = Math.round((res[0] + m) * 255)
        const g = Math.round((res[1] + m) * 255)
        const b = Math.round((res[2] + m) * 255)
        return { blue: r, green: g, red: b, string: `rgb(${r}, ${g}, ${b})` }
    }

    const HSVToRGB = (H: number, S: number, V: number) => {
        const C = V * S
        const HPrime = H / 60

        const X = C * (1 - Math.abs((HPrime % 2) - 1))

        let res: [number, number, number] = [0, 0, 0];

        if (HPrime >= 0 && HPrime < 1) {
            res = [C, X, 0]
        } else if (HPrime >= 1 && HPrime < 2) {
            res = [X, C, 0]
        } else if (HPrime >= 2 && HPrime < 3) {
            res = [0, C, X]
        } else if (HPrime >= 3 && HPrime < 4) {
            res = [0, X, C]
        } else if (HPrime >= 4 && HPrime < 5) {
            res = [X, 0, C]
        } else if (HPrime >= 5 && HPrime < 6) {
            res = [C, 0, X]
        }

        const m = V - C

        const r = Math.round((res[0] + m) * 255)
        const g = Math.round((res[1] + m) * 255)
        const b = Math.round((res[2] + m) * 255)
        console.log(`rgb(${r}, ${g}, ${b})`)
        return { blue: r, green: g, red: b, string: `rgb(${r}, ${g}, ${b})` }
    }

    // conversions

    if (input.type === "RGB") {
        let numbers = input.input.split("(")[1].replace(/ /g, "").split(",")
        numbers[2] = numbers[2].replace(")", "")
        return { blue: parseInt(numbers[0]), green: parseInt(numbers[0]), red: parseInt(numbers[0]), string: input.input }
    } else if (input.type === "HEX") {
        const r = binaryToDenary(hexToBinary(input.input.slice(1, 3)) as string, false)
        const g = binaryToDenary(hexToBinary(input.input.slice(3, 5)) as string, false)
        const b = binaryToDenary(hexToBinary(input.input.slice(5, 7)) as string, false)

        if (r === false || g === false || b === false) return DEFAULT

        return { blue: r, green: g, red: b, string: `rgb(${r}, ${g}, ${b})` }
    } else if (input.type === "HSL") {

        const [H, S, L] = formatHSLAndHWB(input.input)

        return HSLToRGB(H, S, L)
    } else if (input.type == "HWB") {
        const [H, W, B] = formatHSLAndHWB(input.input)
        const S = 1 - (W / (1 - B))
        const V = 1 - B

        return HSVToRGB(H, S, V)
    } else if (input.type === "CMYK") {
        const [C, M, Y, K] = formatCMYK(input.input)

        const r = Math.round(255 * (1 - (C / 100)) * (1 - (K / 100)))
        const g = Math.round(255 * (1 - (M / 100)) * (1 - (K / 100)))
        const b = Math.round(255 * (1 - (Y / 100)) * (1 - (K / 100)))

        return { blue: r, green: g, red: b, string: `rgb(${r}, ${g}, ${b})` }
    }
    return DEFAULT
}

export const RGBToColours = (rbg: RGB): ColourConversionResult => {
    // hex
    const hex = "#" + denaryToHex(rbg.red.toString()) + denaryToHex(rbg.green.toString()) + denaryToHex(rbg.blue.toString())

    return {
        active: true,
        cmyk: "",
        hex: "",
        hsl: "",
        hwb: "",
        rgb: ""
    }
}