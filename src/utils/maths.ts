import { IntermediateMatrix } from "../global/types"

const invertMatrix = () => {

}

export const intermediateMatrixToArray = (intermediate: IntermediateMatrix) => {
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
    let matrix: number[][] = []

    for (let i = 0; i < y; i++) {
        matrix[i] = []
        for (let j = 0; j < x; j++) {
            matrix[i][j] = parseInt(intermediate[j + "-" + i])
        }
    }
    console.log(matrix)
    return matrix
}