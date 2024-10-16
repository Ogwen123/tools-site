import React from 'react'
import { TruthTableOutput } from '../../../global/types'

const TruthTableGenerator = () => {

    const [input, setInput] = React.useState<string>("")
    const [output, setOutput] = React.useState<TruthTableOutput>()

    const [validInput, setValidInpput] = React.useState<{ valid: boolean, error: string | undefined }>({ valid: true, error: undefined })

    const generateInputCombinations = (variables: string[]) => {

    }

    const valid = (str: string) => {

    }

    const handleInput = () => {
        // check the input is valid
        // split formula up by brackets
        // solve each bracket
        // bring all the results together
        // solve the final formula
    }

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
                    <div className='text-error'>
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