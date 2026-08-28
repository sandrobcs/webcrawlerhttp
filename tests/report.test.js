const { sortPages } = require("../src/report.js");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://blog.sandro.dev/path": 1,
    "https://blog.sandro.dev": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.sandro.dev", 3],
    ["https://blog.sandro.dev/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages", () => {
  const input = {
    "https://blog.sandro.dev/path4": 1,
    "https://blog.sandro.dev/path3": 3,
    "https://blog.sandro.dev/path2": 2,
    "https://blog.sandro.dev/path1": 8,
    "https://blog.sandro.dev": 10,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.sandro.dev", 10],
    ["https://blog.sandro.dev/path1", 8],
    ["https://blog.sandro.dev/path3", 3],
    ["https://blog.sandro.dev/path2", 2],
    ["https://blog.sandro.dev/path4", 1],
  ];
  expect(actual).toEqual(expected);
});
