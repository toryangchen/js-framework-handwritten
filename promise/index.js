new Promise((resolve, rejected) => {
	resolve(1)
}).then(
	value => {
		return 'toryang' + value
	},
	reason => {
		console.log('reason', reason)
	}
).then(
	value => {
		console.log('value', value)
	},
	reason => {
		console.log('reason', reason)
	}
);