'use strict'

const {stringify} = require('querystring')
const {fetch} = require('fetch-ponyfill')()

const endpoint = 'https://en.wikipedia.org/w/api.php'

const fetchPageRevision = (revision) => {
	const target = endpoint + '?' + stringify({
		action: 'query',
		format: 'json',
		prop: 'revisions',
		rvprop: 'content',
		revids: revision + ''
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
		return res.json()
	})
	.then((body) => {
		if (body.query.badrevids) {
			throw new Error('bad revision ID ' + body.query.badrevids[0].revid)
		}

		const pageId = Object.keys(body.query.pages)[0]
		const page = body.query.pages[pageId]
		if (!page) throw new Error('invalid response, missing page ' + pageId)

		const revision = page.revisions[0]
		if (!revision) throw new Error('invalid response, missing revisions')

		return revision['*']
	})
}

module.exports = fetchPageRevision
