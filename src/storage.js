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
    var StorageAbstract = function() { };
    StorageAbstract.prototype = {
        
        /**
         * returns storage implementation
         * @return {Object}
         */
        getImplementation: function() {
            throw new Error('getImplementation method is required!');
        },

        /**
         * puts item to storage
         * if save was unsuccessful then returns false
         * if save was successful then returns true
         *
         * @param index
         * @param value
         * @returns {boolean}
         */
        put: function(index, value) {
            // serialize value as json stringify
            var stringify = JSON.stringify(value);

            try {
                this.getImplementation().setItem(index, stringify);
                return true;
            } catch (e) {
                // log error
                console.error(e);
                return false;
            }
        },

        /**
         * gets item from storage
         * @param index
         * @returns {*}
         */
        get: function(index) {
            if (this.has(index)) {
                try {
                    return JSON.parse(this.getImplementation().getItem(index));
                } catch (e) {
                    // log error
                    console.error(e);
                }
            }
        },

        /**
         * checks if item exists in storage
         * @param index
         * @returns {boolean}
         */
        has: function(index) {
            return this.getImplementation().hasOwnProperty(index);
        },

        /**
         * removes item from storage
         * @param index
         */
        remove: function(index) {
            this.getImplementation().removeItem(index);
        },

        /**
         * clear all items from storage
         */
        clear: function() {
            this.getImplementation().clear();
        },

        /**
         * returns list of keys stored in storage
         * @returns {Array}
         */
        keys: function() {
            var keys = [ ];
            for (var i = 0; i < this.getImplementation().length; i++) {
                keys.push(this.getImplementation().key(i));
            }

            return keys;
        }
    };

    angular
        .module('tseed.storage', [ ])
        .factory('$sessionStorage', ['$window', factory(function ($window) {
            /** @name $sessionStorage */
            var $sessionStorage = function() { };
            $sessionStorage.prototype = new StorageAbstract();
            $sessionStorage.prototype.getImplementation = function() {
                return $window.sessionStorage;
            };

            return new $sessionStorage();
        })])
        .factory('$localStorage', ['$window', factory(function ($window) {
            /** @name $localStorage */
            var $localStorage = function() { };
            $localStorage.prototype = new StorageAbstract();
            $localStorage.prototype.getImplementation = function() {
                return $window.localStorage;
            };

            return new $localStorage();
        })]);
})(angular);
