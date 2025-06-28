import { IntermediateMatrix, InversionResult, Matrix, Stage, Row } from "../global/types"

const dc = (item: any) => JSON.parse(JSON.stringify(item))

const mul = (row: Row, scalar: number) => row.map((x) => x * scalar)

const determinant = (matrix: Matrix) => {
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = i + 1; j < matrix.length; j++) {
            if (j === i) continue

            matrix[j] = subRow(matrix[j], mul(matrix[i], matrix[j][i] / matrix[i][i]))
        }
    }
    let det = 1
    for (let i = 0; i < matrix.length; i++) {
        det *= matrix[i][i]
    }

    return det
}

const isZeroRow = (row: Row) => {
    for (let num of row) {
        if (num !== 0) return false
    }

    return true
}

const subRow = (r1: Row, r2: Row) => {
    return [r1[0] - r2[0], r1[1] - r2[1], r1[2] - r2[2]]
}

export const invertMatrix = (matrixRef: Matrix): InversionResult | false => {
    let det = determinant(dc(matrixRef))

    if (det === 0) return false

    let matrix: Matrix = dc(matrixRef)
    let stages: Stage[] = []
    let altMatrix: Matrix = matrix.map((row, y) => (row.map((_, x) => x === y ? 1 : 0)))

    stages[0] = dc({ // assign value not reference
        matrix: matrix,
        altMatrix: altMatrix
    })

    //console.log(stages)

    // gauss jordan elimination
    // check for any zero rows
    for (let i = 0; i < matrix.length; i++) {
        if (isZeroRow(matrix[i])) {
            return false
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        let div = matrix[i][i]
        for (let j = 0; j < matrix.length; j++) {
            matrix[i][j] = matrix[i][j] / div
            altMatrix[i][j] = altMatrix[i][j] / div
        }
        for (let j = 0; j < matrix.length; j++) {
            if (j === i) continue
            const scalar = matrix[j][i]
            matrix[j] = subRow(matrix[j], mul(matrix[i], scalar))
            altMatrix[j] = subRow(altMatrix[j], mul(altMatrix[i], scalar))
        }

        stages.push(dc({
            matrix: matrix,
            altMatrix: altMatrix
        }))
    }

    return {
        stages,
        det
    }
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