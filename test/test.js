/**
 * Created by xuezhongxiong on 2016/5/30.
 */
'use strict';
/**
 * @type {Object}
 */
var _1 = require('../index')(undefined);
var _2 = require('../index')();
var _3 = require('../index')({foo: 'bar'});

Promise.resolve({a: 12333})
  .then(_1.ab.toString().split('')[0].toString().replace('1', 'replaceStr').length)
  .then(console.log.bind(null, 'result 1:'), console.error.bind(null, 'catch error1:'))

  .then(()=>({a: 12333}))
  .then(_2.ab.toString().split('')[0].toString().replace('1', 'replaceStr').length)
  .then(console.log.bind(null, 'result 2:'), console.error.bind(null, 'catch error2:'))

  .then(()=>({a: 12333}))
  .then(_3.ab.toString().split('')[0].toString().replace('1', 'replaceStr').length)
  .then(console.log.bind(null, 'result 2:'), console.error.bind(null, 'catch error2:'));
