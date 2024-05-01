export const wordCount = (string: string) => {
    return string.split(" ").filter((letter, _) => {
        return letter !== ""
    }).length
}

export const countLetters = (string: string) => {
    return string.split("").filter((letter, _) => {
        return letter !== ""
    }).length
}

export const countLettersWithoutSpaces = (string: string) => {
    return string.split("").filter((letter, _) => {
        return letter !== "" && letter !== " "
    }).length
}