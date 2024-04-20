export const parsedPathname = (pn?: string) => {
    let pathname = pn || location.pathname
    let res = ""
    if (pathname.startsWith("/")) {
        res = pathname.slice(1)
    }

    return res
}