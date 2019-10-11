class Promise {

	constructor(executor) {

		// 参数校验
		if (typeof executor !== 'function') {
			throw new TypeError(`Promise resolver ${exector} is not a function`);
		}
		this.initValue();
		this.initBind();

		try {
			executor(this.resolve, this.reject);
		} catch (e) {
			this.reject(e);
		}
	}

	initBind() {
		this.resolve = this.resolve.bind(this);
		this.reject = this.reject.bind(this);
	}

	initValue() {
		this.value = null;
		this.reason = null;
		this.state = Promise.PENDING;
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];
	}

	resolve(value) {
		if (this.state === Promise.PENDING) {
			this.state = Promise.FULFILLED;
			this.value = value;
			this.onFulfilledCallbacks.forEach(fn => fn(this.value));
		}
	}

	reject(reason) {
		if (this.state === Promise.PENDING) {
			this.state = Promise.REJECTED;
			this.reason = reason;
			this.onRejectedCallbacks.forEach(fn => fn(this.reason));
		}
	}

	then(onFulfilled, onRejected) {

		// 参数校验
		if (typeof onFulfilled !== 'function') {
			onFulfilled = function(value) {
				return value
			}
		}

		if (typeof onRejected !== 'function') {
			onRejected = function(reason) {
				throw reason
			}
		}

		// 实现链式调用，且改变了后面then方法的值，必须通过新的实例
		let promise2 = new Promise((resolve, reject) => {
			if (this.state === Promise.FULFILLED) {
				setTimeout(() => {
					try {
						const x = onFulfilled(this.value)
						Promise.resolvePromise(promise2, x, resolve, reject)
						// resolve(x)
					} catch (e) {
						reject(e)
					}
				})
			}

			if (this.state === Promise.REJECTED) {
				setTimeout(() => {
					try {
						const x = onRejected(this.reason)
						Promise.resolvePromise(promise2, x, resolve, reject)
						// resolve(x)
					} catch (e) {
						reject(e)
					}

				})
			}

			if (this.state === Promise.PENDING) {
				this.onFulfilledCallbacks.push(value => {
					setTimeout(() => {
						try {
							const x = onFulfilled(this.value)
							Promise.resolvePromise(promise2, x, resolve, reject)
							// resolve(x)
						} catch (e) {
							reject(e)
						}
					})
				})

				this.onRejectedCallbacks.push(reason => {
					setTimeout(() => {
						try {
							const x = onRejected(this.reason)
							Promise.resolvePromise(promise2, x, resolve, reject)
							// resolve(x)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return promise2
	}

	race(promises) {
		return new promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(resolve, reject)
			}
		})
	}

	all(promises) {
		let array = [];
		let i = 0;

		function processData(index, data) {
			arr[index] = data;
			i++;
			if (i == promises.length) {
				resolve(arr);
			};
		};

		return new Promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(data => {
					processData(i, data);
				}, reject)
			}
		})
	}

}
Promise.PENDING = 'pending';
Promise.FULFILLED = 'fulfilled';
Promise.REJECTED = 'rejected';
Promise.resolvePromise = function(promise2, x, resolve, reject) {
	if (promise2 === x) {
		reject(new TypeError("Chaining cycle detected for promise"))
	}

	let called = false;
	if (x instanceof Promise) {
		x.then(value => {
			// resolve(value)
			Promise.resolvePromise(promise2, value, resolve, reject)
		}, reason => {
			reject(reason)
		})
	} else if (x !== null && (typeof x === "object" || typeof x === 'function')) {
		try {
			const then = x.then;
			if (typeof then === 'function') {
				then.call(x, value => {
					if (called) return;
					called = true;
					Promise.resolvePromise(promise2, value, resolve, reject);
				}, reason => {
					if (called) return;
					called = true;
					reject(reason);
				})
			} else {
				if (called) return;
				called = true;
				resolve(x);
			}
		} catch (e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}

Promise.defer = Promise.deferred = function() {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve;
		dfd.reject = reject;
	});
	return dfd;
}

module.exports = Promise;