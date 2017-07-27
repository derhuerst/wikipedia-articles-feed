'use strict'

const filter = require('stream-filter')

// https://www.mediawiki.org/wiki/Manual:RCFeed#Properties
// https://www.mediawiki.org/wiki/Manual:Recentchanges_table
// https://www.mediawiki.org/wiki/Manual:Log_actions
// https://meta.wikimedia.org/wiki/Help:Namespace#List_of_namespaces
const isEnglishArticleChange = (c) => {
	return c.wiki === 'enwiki'
	&& (c.type === 'edit' || c.type === 'new')
	&& c.namespace === 0 // todo: categories (namespace 14)
}

const stream = () => filter.obj(isEnglishArticleChange)

module.exports = stream
