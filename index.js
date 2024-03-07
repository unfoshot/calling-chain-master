/**
 * Created by ngtmuzi on 2016/5/29.
 */
'use strict';
const receiveFn = (...args) => args;

/**
 * chain proxy maker
 * @params {Any} defaultValue
 * @type {Function}
 */
const chainProxy = module.exports = function (defaultValue) {
  var hasDefault   = arguments.length > 0;

  var handle = {
    get: function (target, property, receiver) {
      //set prototype to base Proxy Object _
      if (property === 'prototype') return _;
      if (property === 'apply') return target.apply;
      if (property === 'call') return target.call;
      if (property === 'bind') return target.bind;

      //is number
      if (!isNaN(+property)) return new Proxy(target.bind(null, `[${property}]`), handle);
      //return a new Proxy, go on
      else return new Proxy(target.bind(null, '.' + property), handle);
    },

    apply: function (target, thisArg, argumentsList) {
      //if method calling on Proxy Object
      if (thisArg && thisArg.prototype === _) {
        //save arguments to chain, and go on
        return new Proxy(target.bind(null, argumentsList), handle);

      } else {  //calling on outside

        //get the calling chain
        var chains = target();
        //pick arguments
        var args   = [].concat(...chains.filter(Array.isArray));

        //make function body
        var argNum     = 0;
        var expression = chains.reduce(function (a, b) {
          if (typeof b === 'string') return a + b;
          else if (Array.isArray(b)) return a + `(${b.map(()=> `args[${argNum++}]`)})`;
        }, 'return _');

        var fnStr = `
        try{
          ${expression};
        }catch(err){
          ${hasDefault ? 'return defaultValue;' : ''}
          err.stack = err.name + ': ' + err.message + '\\n\\tat: ' + '${expression}';
          throw err;
        }`;

        var finalFn = new Function(['args', '_', 'defaultValue'], fnStr);
        return finalFn(args, argumentsList[0], defaultValue);
      }
    }
  };

  var _ = new Proxy(receiveFn, handle);
  return _;
};