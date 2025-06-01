import { IntermediateMatrix, Matrix, Stage } from "../global/types"

export const invertMatrix = (matrixRef: Matrix): Stage[] | false => {
    let matrix = matrixRef
    let stages: Stage[] = []
    let altMatrix: Matrix = matrix.map((row, y) => (row.map((_, x) => x === y ? 1 : 0)))

    const temp = {
        matrix: matrix,
        altMatrix: altMatrix
    }

    stages[0] = Object.assign({}, temp)

    // TODO
    // add row swapping logic

    // row echelon
    for (let loc = 0; loc < matrix.length - 1; loc++) {
        console.log("loop")
        for (let i = 1; i < matrix.length - loc; i++) {
            const operatorLine = matrix[loc]
            const operandLine = matrix[loc + i]
            const altOperatorLine = altMatrix[loc]
            const altOperandLine = altMatrix[loc + i]

            const multiplier = operandLine[loc] / operatorLine[loc]

            for (let j = 0; j < operatorLine.length; j++) {
                operandLine[j] = operandLine[j] - (operatorLine[j] * multiplier)
                altOperandLine[j] = altOperandLine[j] - (altOperatorLine[j] * multiplier)

            }
            matrix[loc + i] = operandLine
            altMatrix[loc + i] = altOperandLine
        }
        stages.push({
            matrix: matrix,
            altMatrix: altMatrix
        })
    }
    console.log(stages)
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
            const value = intermediate[j + "-" + i] || "0"
            matrix[i][j] = parseInt(value)
        }
    }

    return matrix
}

export const arrayToIntermediateMatrix = (array: Matrix) => {
    let intermediate: IntermediateMatrix = {}

    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[0].length; x++) {
            intermediate[x + "-" + y] = array[y][x].toString()
        }
    }

    return intermediate
}