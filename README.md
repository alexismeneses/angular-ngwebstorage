angular-ngwebstorage
====================

angular-ngwebstorage is a module for [AngularJS](https://angularjs.org/) allowing to bind angular scoped objects into a webstorage, synchronizing them whenever they change, in a 3-way data binding fashion.


A word on Webstorage
--------------------

Webstorage is a key-value database supported directly by web-browser allowing modern applications to store some values locally.

There are two kind of webstorages so far:
- sessionStorage which store values for the lifetime of the current window/tab  
- localStorage which store values without any expiration

angular-ngwebstorage supports both kind of storages.


Module usage
------------

First setup the use of the module in your application and choose objects you want to bind

```javascript
// add ngWebstorage as a dependency for your own module
angular.module('myApp', ['ngWebstorage'])

// inject $webstorage where necessary
.controller('MyCtrl', function($scope, $webstorage) {
  // initialize a storage for the current scope with localstorage
  var storage = $webstorage($scope, 'local');

  // bind an object on the storage, creating it with a default value if necessary 
  storage.bind('mySyncObject', null, function()
  {
    return { firstName: 'John', lastName: 'Doe' };
  });
});
```

And then use the normal angular databinding that will do a 3-way databinding (view, model, storage).

```html
<!-- load the module -->
<script type="text/javascript" src="angular-ngwebstorage.js"></script>

<div ng-controller="MyCtrl">
  <input ng-model="mySyncObject.firstName">
  <input ng-model="mySyncObject.lastName">
</div>
```


License
-------

Copyright © 2014, Alexis Meneses

This software is licensed under the MIT License.
