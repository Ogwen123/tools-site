import React from 'react'
import { TruthTableInputError, TruthTableOutput } from '../../../global/types'

const validSymbols = ["∧", "∨", "¬", "→", "(", ")", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

const TruthTableGenerator = () => {

    const [input, setInput] = React.useState<string>("")
    const [output, setOutput] = React.useState<TruthTableOutput>()

    const [validInput, setValidInput] = React.useState<TruthTableInputError>({ valid: true, error: undefined })

    const generateInputCombinations = (variables: string[]) => {

    }

    const valid = (str: string): TruthTableInputError => {
        // check brackets

        let bracket_diff = 0

        for (let i of str) {
            if (i === "(") bracket_diff++
            else if (i === ")") bracket_diff--
        }

        if (bracket_diff > 0) {
            return { valid: false, error: "ERROR: Mismatched Brackets. Too many opening brackets." }
        } else if (bracket_diff < 0) {
            return { valid: false, error: "ERROR: Mismatched Brackets. Too many closing brackets." }
        }

        // check symbols

        return { valid: true, error: undefined }
    }

    React.useEffect(() => {
        // check the input is valid
        const res = valid(input)

        setValidInput(res)
        // split formula up by brackets
        // solve each bracket
        // bring all the results together
        // solve the final formula
    }, [input])

    return (
        <div className='flex fc flex-col'>
            <div className='text-2xl'>
                Truth Table Generator
            </div>
            <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px]'>
                For now only ∧, ∨, ¬, →, ( and ) are supported. More formats will be supported in the future.
            </div>
            <div>
                {
                    !validInput.valid &&
                    <div className='text-error mt-[10px]'>
                        {validInput.error !== undefined ? validInput.error : "Please enter a valid formula."}
                    </div>
                }
            </div>
            <div className='w-2/5 mt-[10px]'>
                <div>
                    <input
                        type="text"
                        placeholder="Formula"
                        className='form-input'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className='mt-[10px]'>
                    {output === undefined ?
                        <div className='w-full text-center'>
                            Waiting on an input...
                        </div>
                        :
                        <div>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TruthTableGenerator