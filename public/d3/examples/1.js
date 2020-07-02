d3.selectAll('p').style('color', 'blue')
d3.select('body').style('background-color', 'black')
d3.selectAll('p').style('color', function() {
  return 'hsl(' + Math.random() * 360 + ',100%,50%)'
})

typeof a
console.info('引用1.js，不需要加defer和async')
