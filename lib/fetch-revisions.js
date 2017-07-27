'use strict'

const fetchPageRevision = require('fetch-wikipedia-page-revision')
const through = require('through2')

const fetchRevision = (change, _, cb) => {
	fetchPageRevision(change.pageSlug, change.newRevision)
	.then((content) => {
		change.newContent = content
		cb(null, change)
	})
	.catch(cb)
}

const fetchRevisions = () => through.obj(fetchRevision)

module.exports = fetchRevisions
