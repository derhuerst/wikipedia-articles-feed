'use strict'

const pipe = require('pump')
const readEdits = require('wikipedia-edits-stream')

const isEnglishArticleChange = require('./lib/is-english-article-change')
const parseChanges = require('./lib/parse-changes')
const fetchRevisions = require('./lib/fetch-revisions')

const articlesFeed = () => {
	const out = fetchRevisions()

	pipe(
		readEdits(),
		isEnglishArticleChange(),
		parseChanges(),
		out,
		(err) => out.emit('error', err)
	)

	return out
}

module.exports = articlesFeed
