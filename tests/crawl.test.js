const { normalizeURL, getURLsFromHTML } = require("../src/crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "https://blog.sandro.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.sandro.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip http", () => {
  const input = "http://blog.sandro.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.sandro.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://blog.sandro.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.sandro.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BLOG.sandro.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.sandro.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.sandro.dev/">
                Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = `https://blog.sandro.dev/`;
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.sandro.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = `https://blog.sandro.dev`;
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.sandro.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML multiple", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.sandro.dev/">
                Blog
            </a>
            <a href="/path/">
                Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = `https://blog.sandro.dev`;
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.sandro.dev/", "https://blog.sandro.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML bad url", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = `https://blog.sandro.dev`;
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
