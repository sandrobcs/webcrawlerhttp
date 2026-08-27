const { JSDOM } = require(`jsdom`);

async function crawlPage(baseURL, currentURL, pages) {
  const baseURlObj = new URL(baseURL);
  const currentURlObj = new URL(currentURL);

  if (baseURlObj.hostname !== currentURlObj.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`crawling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentURL}`,
      );
      return pages
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentURL}`,
      );
      return pages
    }

    const htmlBody = await resp.text();

    nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
    return pages;
  } catch (err) {
    console.log(`error in fetch: ${err.message} in page: ${currentURL}`);
  }
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getURLsFromHTML(HTMLBodyElement, baseURL) {
  const urls = [];
  const dom = new JSDOM(HTMLBodyElement);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative url
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`erro with relative url: ${err.message}`);
      }
    } else {
      //absolute url
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`erro with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
