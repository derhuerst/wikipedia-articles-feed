'use strict'

const readEdits = require('wikipedia-edits-stream')
const filter = require('stream-filter')
const through = require('through2')

const fetchPageRevision = require('./fetch-page-revision')

// https://www.mediawiki.org/wiki/Manual:RCFeed#Properties
// https://www.mediawiki.org/wiki/Manual:Recentchanges_table
// https://www.mediawiki.org/wiki/Manual:Log_actions
// https://meta.wikimedia.org/wiki/Help:Namespace#List_of_namespaces
const isEnglishWikipediaEdit = (edit) => {
	return edit.wiki === 'enwiki'
	&& (edit.type === 'edit' || edit.type === 'new')
	&& edit.namespace === 0 // todo: categories (namespace 14)
}

const parseEdit = (edit, _, cb) => {
	Promise.all([
		fetchPageRevision(edit.revision.old),
		fetchPageRevision(edit.revision.new)
	])
	.then(([oldRevision, newRevision]) => {
		cb(null, {
			// todo: id?, bot, user, timestamp, minor
			type: edit.type,
			pageTitle: edit.title,
			pageURL: edit.meta.uri,
			oldRevision: {id: edit.revision.old, content: oldRevision},
			newRevision: {id: edit.revision.new, content: newRevision},
			server: edit.server_url,
			comment: edit.comment
		})
	})
	.catch(cb)
}

const articlesFeed = () => {
	return readEdits() // todo: error handling
	.pipe(filter.obj(isEnglishWikipediaEdit)) // todo: error handling
	.pipe(through.obj(parseEdit)) // todo: error handling
}

module.exports = articlesFeed
