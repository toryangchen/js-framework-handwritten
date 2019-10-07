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
						resolve(x)
					} catch (e) {
						reject(e)
					}
				})
			}

			if (this.state === Promise.REJECTED) {
				setTimeout(() => {
					try {
						const x = onRejected(this.reason)
						resolve(x)
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
							resolve(x)
						} catch (e) {
							reject(e)
						}
					})
				})

				this.onRejectedCallbacks.push(reason => {
					setTimeout(() => {
						try {
							const x = onRejected(this.reason)
							resolve(x)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return promise2
	}

}
Promise.PENDING = 'pending';
Promise.FULFILLED = 'fulfilled';
Promise.REJECTED = 'rejected';

module.exports = Promise;