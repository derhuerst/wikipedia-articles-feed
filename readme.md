# wikipedia-articles-feed

**A realtime [hyperdrive](https://github.com/mafintosh/hyperdrive) feed of Wikipedia articles.**

[![npm version](https://img.shields.io/npm/v/wikipedia-articles-feed.svg)](https://www.npmjs.com/package/wikipedia-articles-feed)
[![build status](https://img.shields.io/travis/derhuerst/wikipedia-articles-feed.svg)](https://travis-ci.org/derhuerst/wikipedia-articles-feed)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/wikipedia-articles-feed.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install wikipedia-articles-feed
```


## Usage

```js
const createFeed = require('wikipedia-articles-feed')

createFeed('some-path.hyperdrive', console.log, console.error)
```

```
Usage:
    wikipedia-articles-feed <hyperdrive-dir>
Arguments:
    hyperdrive-dir  Which hyperdrive to write to.
```


## Related

- [wikipedia-edits-stream](https://github.com/derhuerst/wikipedia-edits-stream) – A live stream of page edits on Wikipedia.
- [fetch-wikipedia-page-revision](https://github.com/derhuerst/fetch-wikipedia-page-revision) – Fetch a revision of a Wikipedia page as mobile HTML.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/wikipedia-articles-feed/issues).
