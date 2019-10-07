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

		if (this.state === Promise.FULFILLED) {
			setTimeout(() => {
				onFulfilled(this.value)
			})

		}

		if (this.state === Promise.REJECTED) {
			setTimeout(() => {
				onRejected(this.reason)
			})
		}

		if (this.state === Promise.PENDING) {
			this.onFulfilledCallbacks.push(value => {
				setTimeout(() => {
					onFulfilled(value)
				})
			})

			this.onRejectedCallbacks.push(reason => {
				setTimeout(() => {
					onRejected(reason)
				})
			})
		}
	}
}

Promise.PENDING = 'pending';
Promise.FULFILLED = 'fulfilled';
Promise.REJECTED = 'rejected';

module.exports = Promise;