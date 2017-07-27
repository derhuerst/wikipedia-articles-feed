'use strict'

const pipe = require('pump')
const readEdits = require('wikipedia-edits-stream')
const filter = require('stream-filter')
const through = require('through2')

const fetchPageRevision = require('./fetch-page-revision')

// https://www.mediawiki.org/wiki/Manual:RCFeed#Properties
// https://www.mediawiki.org/wiki/Manual:Recentchanges_table
// https://www.mediawiki.org/wiki/Manual:Log_actions
// https://meta.wikimedia.org/wiki/Help:Namespace#List_of_namespaces
const isEnglishWikipediaChange = (c) => {
	return c.wiki === 'enwiki'
	&& (c.type === 'edit' || c.type === 'new')
	&& c.namespace === 0 // todo: categories (namespace 14)
}

const parseChange = (c, _, cb) => {
	const change = {
		// todo: id?, bot, user, timestamp, minor
		type: c.type,
		pageTitle: c.title,
		pageSlug: c.meta.uri.split('wiki/')[1], // todo: make this robust
		pageURL: c.meta.uri,
		oldRevision: c.revision.old,
		newRevision: c.revision.new,
		server: c.server_url,
		comment: c.comment
	}

	fetchPageRevision(change.pageSlug, change.newRevision)
	.then((content) => {
		change.newContent = content
		cb(null, change)
	})
	.catch(cb)
}

const articlesFeed = () => {
	const out = through.obj(parseChange)

	pipe(
		readEdits(),
		filter.obj(isEnglishWikipediaChange),
		out,
		(err) => out.emit('error', err)
	)

	return out
}

module.exports = articlesFeed
