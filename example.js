'use strict'

const path = require('path')

const createFeed = require('.')

const dest = path.join(__dirname, 'example.wiki.hyperdrive')

const onProgress = (change) => {
	console.info(change.type, change.pageTitle)
}

const onError = (err, change) => {
	if (change) console.error(change.type, change.pageTitle, err.message)
	else console.error(err.message)
	process.exitCode = 1
}

createFeed(dest, onProgress, onError)
// todo
