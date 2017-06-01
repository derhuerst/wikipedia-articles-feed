'use strict'

const hyperdrive = require('hyperdrive')

const articlesFeed = require('./articles-feed')

const createFeed = (dir, onProgress, onError) => {
	const archive = hyperdrive(dir)

	articlesFeed()
	.on('error', onError)
	.on('data', (change) => {
		archive.writeFile(change.pageSlug + '.html', change.newContent, (err) => {
			if (err) onError(err, change)
			else onProgress(change)
		})
	})

	return archive
}

module.exports = createFeed
