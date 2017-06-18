/////////////////////////////////////////////////////////////////////////////////////////////
//
// cc.log
//
//    Library that helps with logging messages, warnings and errors.
//
// License
//    Apache License Version 2.0
//
// Copyright Nick Verlinden (info@createconform.com)
//
///////////////////////////////////////////////////////////////////////////////////////////// 

(function(){
    function Log() {
        var self = this;

        this.Console = function(id) {
            if (!(this instanceof Console)) {
                throw new TypeError("Constructor 'Console' cannot be invoked without 'new'.");
            }

            if (Object.prototype.toString.call(id) !== "[object String]") {
                throw new TypeError("Invalid module id. Mandatory parameter 'id' should be an object of type 'String'.");
            }

            this.error = Function.prototype.bind.call(console.error, console, id);
            this.info = Function.prototype.bind.call(console.info, console, id);
            this.log = Function.prototype.bind.call(console.log, console, id);
            this.warn = Function.prototype.bind.call(console.warn, console, id);
        };
        this.Console.prototype = console;
    }

    var singleton;
    (function (obj, factory) {
        var supported = false;
        if (typeof define === "function" && (define.amd || define.using)) {
            define(factory);
            supported = true;
        }
        if (typeof module === "object" && module.exports && typeof require != "undefined" && typeof require.main != "undefined" && require.main !== module) {
            module.exports = factory();
            supported = true;
        }
        if (!supported) {
            obj.returnExports = factory();
        }
    }(this, function() {
        if (singleton) {
            return singleton;
        }
        singleton = new (Function.prototype.bind.apply(Log, arguments));
        return singleton;
    }));
})();