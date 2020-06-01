;(function() {
  console.info('一、JS的运行环境')
  console.info('1. ECMAScript,包括Annex B')
  console.info('1.1 严格模式，不允许0开头的8进制数（SyntaxError）;非严格模式允许')
  console.info(
    '1.2 window.escape和window.unescape能转义为%分隔的16进制字符串和回转为字符串',
    window.escape('? foo=97%&bar=3%'),
    window.unescape(window.escape('? foo=97%&bar=3%'))
  )
  console.info(
    '1.3 "abcdef".substr(1, 4) 第二参数代表长度',
    'abcdef'.substr(1, 4),
    '"abcdef".substring(1, 4) 第二参数代表结束下标',
    'abcdef'.substring(1, 4)
  )
  console.info('2. Web ECMAScript')
  console.info('2.1 <!-- -->合法的单行注释')
  console.info('2.2 String.prototype一些返回dom字符串的方法，比如：anchor、link、sub等，不推荐使用')
  console.info(
    '2.3 RegExp扩展，match之后，RegExp对象可以获取很多值，比如$1-$9,$_,还有RegExp["$&"]或RegExp.lastMatch'
  )
  console.info('"123456".match(/d/g)', '123456'.match(/\d/g))
  console.info('RegExp.$_ =>', RegExp.$_)
  console.info('RegExp.$1 =>', RegExp.$1)
  console.info('RegExp.$9 =>', RegExp.$9)
  console.info('RegExp.lastMatch =>', RegExp.lastMatch)
  console.info('RegExp["$&"] =>', RegExp['$&'])

  console.info('二、dom元素')
  console.info('id为login的dom对象成为全局dom对象', window.login)

  console.info('三、script标签')
  console.info('1. 变量提升不会跨script标签，但共享同一个作用域，意味着存在先后顺序')
  console.info('2. script标签内遇到</script>会视为代码块结束，如果真的需要使用请拆分为字符串拼接')
  console.info('3. 可以动态创建script标签')

  const scriptTag = document.createElement('script')
  scriptTag.text = 'console.info("<script> at last</script>")'
  document.body.append(scriptTag)

  console.info('四、JS引擎的限制')
  console.info('1. 字符串常量允许的最大字符数')
  console.info('2. 作为参数传递到函数中的大小（栈大小，以字节为单位）')
  console.info('3. 函数声明中的参数个数')
  console.info('4. 未经优化的调用栈的最大层数，即函数调用链的最大长度')
  console.info('5. 程序以阻塞方式在浏览器运行的最长时间')
  console.info('6. 变量名的最大长度')

  console.info('----------appendix A end-------------')
})()
