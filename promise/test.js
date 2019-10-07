const Promise = require('./promise');

new Promise((resolve, rejected) => {
		resolve(1)
	})
	.then(
		value => {
			throw new Error('hhahah')
			return 'toryang' + value
		},
		reason => {
			console.log('reason', reason)
		}
	)
	.then(
		value => {
			console.log('value', value)
		},
		reason => {
			console.log('reason', reason)
		}
	);