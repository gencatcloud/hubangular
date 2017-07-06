/**
 * Created by arodriguezp on 22/08/2016.
 */

/**
 * Hack in support for Function.name for browsers that don't support it.
 * IE, I'm looking at you.
 *
 * http://stackoverflow.com/a/27329618
 **/
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            var funcNameRegex = /function\s([^(]+)\(/;
            var results = (funcNameRegex).exec((this).toString());
            return (results && results.length > 1) ? results[1].trim() : "";
        },
        set: function (value) {
        }
    });
}

function inheritFrom(parent, child) {
    child.prototype = Object.create(parent.prototype);
}
