'use strict'

const through = require('through2')

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

	cb(null, change)
}

const parseChanges = () => through.obj(parseChange)

module.exports = parseChanges
