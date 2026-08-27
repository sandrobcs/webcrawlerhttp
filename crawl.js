const { JSDOM } = require(`jsdom`)

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

function getURLsFromHTML(HTMLBodyElement, baseURL){
    const urls = []
    const dom = new JSDOM(HTMLBodyElement)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for (const linkElement of linkElements) {
        if(linkElement.href.slice(0, 1) === '/'){
            //relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`erro with relative url: ${err.message}`)
            }
            
        } else {
            //absolute url
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`erro with absolute url: ${err.message}`)
            }
            
        }
    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}