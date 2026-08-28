# HTTP WebCrawler 

A small web crawler built with Node.js to deepen understanding of HTTP protocols and JavaScript. The project also applies Test-Driven Development (TDD) to the functions covered by the test suite.

## Features

- Receives a starting URL from the command line.
- Crawls pages on the same hostname.
- Finds absolute links and root-relative links in HTML documents.
- Normalizes URLs by removing the protocol and a trailing slash from the path.
- Counts how many times each page is found.
- Prints a report sorted by the number of links found for each page.
- Handles HTTP errors, fetch errors, and non-HTML responses without stopping the whole crawl.

## Prerequisites

- Node.js 18 or newer, which provides the native `fetch` API used by the crawler.
- npm, included with Node.js.
- Internet access when crawling a live website.

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/sandrobcs/webcrawlerhttp.git
cd webcrawlerhttp
npm install
```

## Usage

Start the crawler with one URL:

```bash
npm start -- https://example.com
```

Another example using a real website:

```bash
npm start -- https://roadmap.sh
```

The crawler logs each page as it visits it and then prints a report similar to:

```text
Starting crawl: https://example.com
Crawling: https://example.com
==============================
=========== REPORT ===========
==============================
Found 3 links to page: example.com
Found 1 links to page: example.com/about
==============================
==============================
```

The command accepts exactly one URL. Running it without a URL, or with more than one command-line argument, prints an error and exits.

## Tests

Run the Jest test suite with:

```bash
npm test
```

The tests cover URL normalization, extraction of absolute and relative links, invalid URLs, and report sorting.

## Project Structure

```text
webcrawlerhttp/
├── package.json          # Project metadata, scripts, and dependencies
├── src/
│   ├── main.js           # Command-line entry point
│   ├── crawl.js          # Crawling, URL normalization, and link extraction
│   └── report.js          # Report sorting and printing
└── tests/
    ├── crawl.test.js     # Tests for crawling-related helper functions
    └── report.test.js    # Tests for report sorting
```

## How It Works

1. `src/main.js` reads the URL from `process.argv` and starts the crawl.
2. `crawlPage` creates URL objects for the base and current URLs. It stops when the current URL has a different hostname from the base URL.
3. The current URL is normalized and stored in a `pages` object. If it has already been found, its count is incremented and the page is not fetched again.
4. For a new URL, the crawler fetches the resource. Responses with an error status or a non-HTML content type are reported and skipped.
5. HTML responses are parsed with `jsdom`. The crawler extracts links from `a` elements, converts root-relative links to absolute URLs, and recursively visits the resulting URLs.
6. `printReport` uses `sortPages` to order the collected pages by hit count, from highest to lowest, and prints the results.

## Known Limitations

- Crawling is restricted to the same hostname as the starting URL. Links to other hostnames are ignored.
- The crawler handles absolute links and root-relative links beginning with `/`; it does not implement general browser-style resolution for every possible relative-link format.
- There is no persistence, authentication, parallel crawling, or report export.
- Pages are fetched recursively and one at a time, so large sites may take a long time to crawl.
- The crawler depends on the target website responding to requests and serving valid HTML for further link discovery.

## Technologies

- Node.js
- CommonJS modules
- Native `fetch`
- [jsdom](https://github.com/jsdom/jsdom) for parsing HTML
- [Jest](https://jestjs.io/) for automated tests

## Future Improvements

- Add tests for `crawlPage` and error-handling paths.
- Provide optional report formats such as JSON or CSV.
