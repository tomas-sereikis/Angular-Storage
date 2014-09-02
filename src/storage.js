(function(angular) {
    "use strict";

    /**
     * factory provides only one function instance call
     * on next calls it returns the same response as from previously called function
     *
     * @param {Function} fn
     * @returns {Function}
     */
    var factory = function(fn) {
        var response;
        return function() {
            return response ? response : (response = fn.apply(this, arguments));
        };
    };

    /**
     * @constructor
     */
    var CacheStorage = function() { };
    CacheStorage.prototype = {
        /**
         * returns cache adapter
         * @return {Object}
         */
        getCacheAdapter: function() {
            throw new Error('Cache adapter is not implemented!');
        },

        /**
         * @param index
         * @param value
         * @returns {boolean}
         */
        put: function(index, value) {
            // serialize value as json stringify
            var stringify = JSON.stringify(value);

            try {
                this.getCacheAdapter().setItem(index, stringify);
                return true;
            } catch (e) {
                // log error
                console.error(e);
                return false;
            }
        },

        /**
         * @param index
         * @returns {*}
         */
        get: function(index) {
            if (this.has(index)) {
                try {
                    return JSON.parse(this.getCacheAdapter().getItem(index));
                } catch (e) {
                    // log error
                    console.error(e);
                }
            }
        },

        /**
         * @param index
         * @returns {boolean}
         */
        has: function(index) {
            return this.getCacheAdapter().hasOwnProperty(index);
        }
    };

    angular
        .module('tseed.storage', [ ])
        .factory("$sessionStorage", ['$window', factory(function ($window) {
            /** @name $sessionStorage */
            var $sessionStorage = function() { };
            $sessionStorage.prototype = new CacheStorage();

            /**
             * cache adapter as session storage
             * @returns {*}
             */
            $sessionStorage.prototype.getCacheAdapter = function() {
                return $window.sessionStorage;
            };

            return new $sessionStorage();
        })])
        .factory("$localStorage", ['$window', factory(function ($window) {
            /** @name $localStorage */
            var $localStorage = function() { };
            $localStorage.prototype = new CacheStorage();

            /**
             * cache adapter as local storage
             * @returns {*}
             */
            $localStorage.prototype.getCacheAdapter = function() {
                return $window.localStorage;
            };

            return new $localStorage();
        })]);
})(angular);