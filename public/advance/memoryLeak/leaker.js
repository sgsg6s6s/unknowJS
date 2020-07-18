const Leaker = function (...rest) {
	this.init(...rest)
};

Leaker.prototype = {
	init: function (type, parent, observer) {
		this.name = parent ? parent.name + '=>' + 'children' : 'Root';
		this.type = type;
		this.parent = parent;
		this.child = null;
		this.observer = observer;
		this.interval = null;

		if (type == 1) {
			this.startInterval();
		} else if (type == 2) {
			console.info(this)
		} else if (type == 3) {
			this.createChildren()
		} else if (type == 4) {
			this.createChildren()
			this.registerCallback()
		}
	},

	startInterval: function () {
		this.interval = setInterval(() => {
			this.onInterval();
		}, 100);
	},

	createChildren() {
		if (!this.parent) { // 防止无限递归循环
			this.child = new Leaker(this.type, this, this.observer);
		}
	},

	registerCallback: function () {
		this.observer.add(this);
	},

	destroy: function () {

		if (this.interval !== null) {
			clearInterval(this.interval);
		}

		if (this.child) {
			this.child.destroy();
			// this.child = null
		}

		// this.parent = null
		// Leak的销毁方法可以处理第三方的引用，例子故意注释下面代码
		// if (this.observer) {
		// 	this.observer.remove(this);
		// }
	},

	destroyLoop: function () {
		this.destroy()
		this.child = null
		this.parent = null
	},

	onInterval: function () {
		console.log("Interval");
	}
};