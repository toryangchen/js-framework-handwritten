// new Promise((resolve, rejected) => {
// 	resolve(1)
// }).then(
// 	value => {
// 		return 'toryang' + value
// 	},
// 	reason => {
// 		console.log('reason', reason)
// 	}
// ).then(
// 	value => {
// 		console.log('value', value)
// 	},
// 	reason => {
// 		console.log('reason', reason)
// 	}
// );

let p1 = new Promise(resolve => {
	resolve(1)
})
let p2 = p1.then(() => {
	return p2;
})