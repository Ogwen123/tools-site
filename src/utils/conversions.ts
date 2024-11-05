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
    console.log(binary)
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
    if (validateInput(denaryStr, "DEN") === false) return false

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