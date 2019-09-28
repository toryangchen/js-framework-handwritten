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
	initComputed.call(this);

	new Compile(options.el, this)
}

function initComputed() {
	let vm = this;
	let computed = this.$options.computed;
	Object.keys(computed).forEach(function(key) {
		Object.defineProperty(vm, key, {
			get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
			set() {}
		})
	})
}


// 数据劫持
function Observe(data) {
	let dep = new Dep();
	for (let key in data) {
		let val = data[key];
		observe(val)
		Object.defineProperty(data, key, {
			enumerable: true,
			get() {
				Dep.target && dep.addSub(Dep.target)
				return val;
			},
			set(newVal) {
				if (newVal === val) {
					return
				}
				val = newVal
				observe(newVal)
				dep.notify()
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


function Compile(el, vm) {
	vm.$el = document.querySelector(el);
	let fragment = document.createDocumentFragment();
	while (child = vm.$el.firstChild) {
		fragment.appendChild(child);
	}
	replace(fragment)

	function replace(fragment) {
		Array.from(fragment.childNodes).forEach(function(node) {
			let text = node.textContent;
			let reg = /\{\{(.*)\}\}/;
			if (node.nodeType == 3 && reg.test(text)) {
				console.log(RegExp.$1)
				let arr = RegExp.$1.split('.')
				let val = vm;
				arr.forEach(function(k) {
					val = val[k]
				})
				new Watcher(vm, RegExp.$1, function(newVal) {
					node.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
				})
				node.textContent = text.replace(/\{\{(.*)\}\}/, val)
			}
			if (node.nodeType === 1) {
				let nodeAttrs = node.attributes;
				Array.from(nodeAttrs).forEach(function(attr) {
					console.log(attr.name)
					let name = attr.name
					let exp = attr.value
					if (name.indexOf('v-') == 0) {
						node.value = vm[exp]
					}
					new Watcher(vm, exp, function(newVal) {
						node.value = newVal;
					})

					node.addEventListener('input', function(e) {
						let newVal = e.target.value;
						vm[exp] = newVal;
					})
				})
			}

			if (node.childNodes) {
				replace(node)
			}
		})
	}

	vm.$el.appendChild(fragment);
}

// 发布订阅模式，观察数据是否改变
function Dep() {
	this.subs = [];
}

Dep.prototype.addSub = function(sub) {
	this.subs.push(sub)
}

Dep.prototype.notify = function() {
	this.subs.forEach(item => item.update())
}

function Watcher(vm, exp, fn) {
	this.vm = vm
	this.exp = exp
	this.fn = fn

	Dep.target = this
	let val = vm
	let arr = exp.split('.');
	arr.forEach(function(k) {
		val = val[k]
	})
	Dep.target = null
}

Watcher.prototype.update = function() {
	let val = this.vm
	let arr = this.exp.split('.')
	arr.forEach(function(k) {
		val = val[k]
	})
	this.fn(val);
}