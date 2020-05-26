function mixins(source, target, override = true) {
  for (const key in source) {
    if (!(key in target) || override) {
      target[key] = source[key]
    }
  }
  return target
}

function ignition() {
  console.info('Turn on my engine')
}

function drive() {
  if (this && this != window) {
    this.ignition()
  }
  console.info('Drive in vehicle')
}

console.info('1. 显示混入')

const vehicle = {
  engines: 1,
  ignition,
  drive
}

console.info('直接用父类实例（共享）和mixins函数构造实例')
const car = mixins(
  vehicle,
  {
    wheels: 4,
    drive() {
      vehicle.drive.call(this)
      console.info('drive by ' + this.wheels + ' wheels')
    }
  },
  false
)

car.drive()
console.info('car is ', car)

console.info('2. 显示混入')

const car2 = mixins(vehicle, {})
mixins(
  {
    wheels: 4,
    drive() {
      vehicle.drive.call(this)
      console.info('drive by ' + this.wheels + ' wheels')
    }
  },
  car2
)

car2.drive()

console.info('3. 寄生继承')
function Vehicle() {
  this.engines = 1
}
Vehicle.prototype.ignition = ignition
Vehicle.prototype.drive = drive

function Car() {
  const car = new Vehicle()
  car.wheels = 4
  const oldDrive = car.drive
  car.drive = function name() {
    oldDrive.call(this)
    console.info('drive by ' + this.wheels + ' wheels')
  }
  return car // 弃用了Car的实例，使用了Vehicle的实例进行修改
}

const car3 = new Car()
car3.drive()
console.info(car, car2, car3)

console.info('4. 隐式混入，定义一个类似构造函数')

const parent = {
  info: function(name, age) {
    this.name = name
    this.age = age
  }
}
const children = {
  info: function(name, age) {
    parent.info.call(this, name, age)
  }
}

parent.info('zhangsan', 43) // 父亲实例生效
children.info('wang2', 18) // 子实例生效

console.info(parent, children)

console.info('--------end----------------')
