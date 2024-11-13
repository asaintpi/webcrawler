const { normalizeUrl } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL test', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML', () => {
    const input = `
    <html>
        <body>
            <a href="https://blog.boot.dev">
                Boot.dev Blog 
            </a>
        </body>
    </html>
    `

    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const input = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog 
            </a>
        </body>
    </html>
    `

    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative and absolute', () => {
    const input = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog 1
            </a>
            <a href="/path2/">
                Boot.dev Blog 2 
            </a>
        </body>
    </html>
    `

    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})