#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const swarm = require('hyperdiscovery')

const pkg = require('./package.json')
const createFeed = require('.')

const argv = minimist(process.argv.slice(2))

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    wikipedia-articles-feed <hyperdrive-dir>
Arguments:
    hyperdrive-dir  Which hyperdrive to write to.
Options:
    --share -s  Share archive with the network? Default: false
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`wikipedia-articles-feed v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const dest = argv._[0]
if (!dest) {
	showError('Missing hyperdrive directory.')
}

const onProgress = (change) => {
	console.info(change.type, change.pageTitle)
}

const onError = (err, change) => {
	console.error(change.type, change.pageTitle, err.message)
	process.exitCode = 1
}

const feed = createFeed(dest, onProgress, onError)

if (argv.share || argv.s) {
	// todo: properly find when the key is available
	const i = setInterval(() => {
		if (!feed.discoveryKey) return

		clearInterval(i)
		console.info('key', feed.discoveryKey.toString('hex'))

		const sw = swarm(feed)
		sw.on('connection', (peer, type) => {
			console.info('connected to', peer, 'over', type, 'now', sw.connections.length, 'connections')
		})
	}, 100)
}
