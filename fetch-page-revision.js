'use strict'

const {stringify} = require('querystring')
const {fetch} = require('fetch-ponyfill')()

const endpoint = 'https://en.wikipedia.org/wiki/'

const fetchPageRevision = (slug, revision) => {
	const target = endpoint + slug + '?' + stringify({
		useformat: 'mobile',
		oldid: revision + ''
	})

	return fetch(target, {
		mode: 'cors',
		redirect: 'follow',
		headers: {
			'user-agent': 'https://gtihub.com/derhuerst/wikipedia-articles-feed'
		}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.text()
	})
	.then((html) => {
		// todo: clean HTML

		return html
	})
}

module.exports = fetchPageRevision
