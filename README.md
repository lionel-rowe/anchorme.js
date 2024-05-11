# Anchorme.js

[![Documentation](http://puu.sh/ukS4g/ccc520ade4.jpg)](http://alexcorvi.github.io/anchorme.js/)
[Getting Started, Documentations, Demos and more](http://alexcorvi.github.io/anchorme.js/)

![npm](https://img.shields.io/npm/dm/anchorme.svg)
![npm](https://img.shields.io/npm/v/anchorme.svg)
![GitHub release](https://img.shields.io/github/release/alexcorvi/anchorme.js.svg)
![license](https://img.shields.io/github/license/alexcorvi/anchorme.js.svg)

Tiny, fast, efficient, feature rich Javascript library to detect links / URLs / Emails in text and convert them to clickable HTML anchor links.

> **⚠️ Warning**
>
> Output is not guaranteed to be [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting)-safe. If you call `anchorme` on untrusted user input, make sure to properly sanitize the output immediately before rendering, using a well-tested library such as [DOMPurify](https://github.com/cure53/DOMPurify). For example:
>
> ```js
> el.innerHTML = DOMPurify.sanitize(anchorme(userInput)); // ✅ safe, assuming DOMPurify is correctly configured for your use case and threat model
> el.textContent = anchorme.list(userInput).map((x) => x.string).join(', '); // ✅ safe, as we're only setting text, not rendering HTML
> el.innerHTML = anchorme(TRUSTED_CONTENT_FROM_CMS); // ✅ safe, as we trust the input
>
> el.innerHTML = anchorme(userInput); // 🚨 unsafe
> el.innerHTML = anchorme(DOMPurify.sanitize(userInput)); // 🚨 unsafe, as sanitization must be performed on output, not input
> el.innerHTML = anchorme.list(userInput).map((x) => x.string).join(', '); // 🚨 unsafe, as we're still setting innerHTML
> ```

## Main features

-   **Sensitivity**:
    -   It's Highly sensitive with the least false positives.
    -   It validates URLs and Emails against full IANA list.
    -   Validates port numbers (if present).
    -   Validates IP octet numbers (if present).
    -   Works on non latin alphabets URLs.
-   **Robustness**:
    -   Skips HTML, so it doesn't break your HTML if it had a URL as an attribute for an element, or a link that is already inside an anchor.
    -   Links with or without protocols.
    -   Works with IPs, FTPs, Emails and files.
    -   Can detect parenthesis and quotation marks as part of the URL or as a surrounding to the URL.
    -   Easily extensible with your own code (e.g. for hashtags and mentions).
-   **Fast**: Performance is one of the main things that were kept in mind while writing this library.
    -   It's incredibly fast since 99% of all the heavy lifting is based on a single optimized regular expression.
    -   Processing H.G. Wells novel, the time machine, took only 2.2 milliseconds on my machine.
    -   This library is also a lot faster than other alternatives (linkify & autolinker). [Link to benchmark](https://alexcorvi.github.io/anchorme.js/benchmark.html)
-   **Light Weight**: Although it's a feature rich library with a full IANA list included, it's only **9KB** when minified and GZipped.

---

-   [React component by Pavel Potáček](https://github.com/potty/react-anchorme)
