export const validHexColour = (hex: string) => {
    return /[0-9A-Fa-f]{6}/.test(hex.replace("#", ""))
}