function customVue(options = {}) {
	this.$options = options
	var data = this._data = this.$options.data
	observe(data)

	// 这里将data 数据挂载到this实例上
	for (let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get() {
				return this._data[key]
			},
			set(newVal) {
				this._data[key] = newVal
			}
		})
	}
}

// 数据劫持
function Observe(data) {
	for (let key in data) {
		let val = data[key];
		observe(val)
		Object.defineProperty(data, key, {
			enumerable: true,
			get() {
				return val;
			},
			set(newVal) {
				if (newVal === val) {
					return
				}
				val = newVal
				observe(newVal)
			}
		})

	}
}

function observe(data) {
	if (typeof data !== 'object') {
		return
	}
	return new Observe(data);
}