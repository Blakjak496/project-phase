const Parser = require('rss-parser');

let parser = new Parser();

const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/"

const parseFeed = async (url) => {
    let feed = await parser.parseURL(CORS_PROXY + url)
    return {
        title: feed.title,
        link: feed.link,
        items: feed.items
    }
}

module.exports = { parseFeed };