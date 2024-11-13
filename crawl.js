function normalizeUrl(urlString) {
    const fnUrl = new URL(urlString)
    const output = `${fnUrl.hostname}${fnUrl.pathname}`

    if (output.length > 0 && output.slice(-1) == '/') {
        return output.slice(0, -1)
    }
    
    return output
}

module.exports = {
    normalizeUrl
}