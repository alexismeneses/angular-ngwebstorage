/*
 Copyright (c) 2014, Alexis Meneses

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
(function() {
    "use strict";

    angular.module("ngWebstorage", [])

    .factory(
        "$webstorage",
        function ()
        {
            return function (scope, storage, prefix)
            {
                return new WebStorage(scope, storageProviders[storage], prefix);
            }
        }
    );

    var storageProviders = {
        'local': localStorage,
        'session': sessionStorage,
    };

    var WebStorage = function(scope, provider, prefix)
    {
        var self = this;
        self.scope = scope;
        self.provider = provider;
        self.prefix = prefix;
    }

    /**
     * Synchronize an Angular object in the storage
     * @param name name of the angular object to synchronize (ie: a key in $scope)
     * @param storageKey Optional: key to use in the storage (default to name argument)
     * @param defaultFn Optional: default value to use if not yet present in the storage
     * @returns {*} Current value
     */
    WebStorage.prototype.bind = function(name, storageKey, defaultFn)
    {
        var self = this;
        if (!storageKey)
        {
            storageKey = name;
        }
        if (self.prefix)
        {
            storageKey = self.prefix + storageKey;
        }
        self.scope.$watch(
            name,
            function(newValue, oldValue)
            {
                if (newValue)
                {
                    self.provider.setItem(storageKey, JSON.stringify(newValue));
                }
            },
            true
        );

        var value = self.provider.getItem(storageKey);
        if (value == null || value == undefined)
        {
            if (typeof(defaultFn) == 'function')
            {
                value = defaultFn();
            }
            else
            {
                value = defaultFn;
            }
        }
        else
        {
            value = JSON.parse(value);
        }
        self.scope[name] = value;
        return value;
    }
})();
