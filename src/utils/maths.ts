import { IntermediateMatrix, Matrix } from "../global/types"

export const invertMatrix = (matrix: Matrix): Matrix[] | false => {
    let stages: Matrix[] = []
    let altMatrix = matrix.map((row, y) => (row.map((_, x) => x === y ? 1 : 0)))

    console.log(altMatrix)

    // TODO
    // add row swapping logic

    // row echelon
    for (let loc = 0; loc < matrix.length - 1; loc++) {
        for (let i = 1; i < matrix.length - loc; i++) {
            const operatorLine = matrix[loc]
            const operandLine = matrix[loc + i]

            const multiplier = operandLine[loc] / operatorLine[loc]

            for (let j = 0; j < operatorLine.length; j++) {
                operandLine[j] = operandLine[j] - (operatorLine[j] * multiplier)
            }
            matrix[loc + i] = operandLine
        }
    }

    // calculate determinant
    let det = 1
    for (let i = 0; i < matrix.length; i++) {
        det *= matrix[i][i]
    }

    if (det === 0) return false

    // reduced row echelon
    console.log(det)
    console.log(matrix)
    return stages
}

export const intermediateMatrixToArray = (intermediate: IntermediateMatrix): Matrix => {
    // find dimensions
    let x = 0
    let y = 0
    for (let i of Object.keys(intermediate)) {
        const currentX = parseInt(i.split("-")[0])
        const currentY = parseInt(i.split("-")[1])

        if (currentX > x) {
            x = currentX
        }

        if (currentY > y) {
            y = currentY
        }
    }
    x++
    y++
    // create array
    let matrix: Matrix = []

    for (let i = 0; i < y; i++) {
        matrix[i] = []
        for (let j = 0; j < x; j++) {
            matrix[i][j] = parseInt(intermediate[j + "-" + i])
        }
    }

    return matrix
}