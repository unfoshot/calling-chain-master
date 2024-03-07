# chainProxy
A module help you make calling chain.

I like `bluebird` but I hate some method like `.get` and `.call`, it's ugly!

And some time I want safely get some property in an object.

So I write this module make sync calling to be easy like spark language.



# Note
This module only can run in Node 6.x because it use `Proxy`


# Usage
You can use it like:

```javascript
var _ = require('chainproxy')();

Promise.resolve({a: 12333})
  .then(_.a.toString().split('')[0].toString().replace('1', 'replaceStr').length)
  .then(console.log.bind(null, 'result:'), console.error.bind(null, 'catch error:'));
```
You can set a default value to `require('chainproxy')();` param.

If sync calling have throw some error like `TypeError`, the expression will return the default value;
if not set default value, expression will throw the error.

This expression actually create function like that:

```javascript
function (args, _, defaultValue){
  try{
    _.a.toString().split(args[0])[args[1]].toString().replace(args[2], args[3]).length
  }catch(err){
    if(defaultValue) return defaultValue;
    else throw err;
  }
}
```
So you can see it's vary quick and easy to use.