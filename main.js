const { crawlPage } = require('./crawl.js')

process.argv

function main(){
    if (process.argv.length < 3){
        console.log(`No website provided.`)
        process.exit(1)
    }
    if (process.argv.length > 3){
        console.log(`Too many command line args.`)
        process.exit(1)
    }

    const baseUrl = process.argv[2]
    
    console.log(`Starting crawl of ${baseUrl}`)
    crawlPage(baseUrl)
}

main()