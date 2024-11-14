const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Crawling ${currentURL} actively.`)
    try {
        const htmlGet = await fetch(currentURL)
        if (htmlGet.status > 399) {
            console.log(`error code: ${htmlGet.status} on page ${currentURL}.`)
        }
        console.log(await htmlGet.text())

        const contentType = htmlGet.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page ${currentURL}.`)
        }
    } catch (err) {
        console.log(`error in fetch: ${err.message} on page ${currentURL}.`)
    }
}

function getURLsFromHTML(htmlbody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlbody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) == '/'){
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(`${linkElement}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with abs url: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeUrl(urlString) {
    const fnUrl = new URL(urlString)
    const output = `${fnUrl.hostname}${fnUrl.pathname}`

    if (output.length > 0 && output.slice(-1) == '/') {
        return output.slice(0, -1)
    }

    return output
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
}