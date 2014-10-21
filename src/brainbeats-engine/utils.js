var utils = {
    isObject: function (obj) {
        return (typeof obj === 'object' && obj != null);
    },
    // Stolen from http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
    mixin: function (receiver, supplier) {
        Object.keys(supplier).forEach(function(property) {
            Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
        });
    }
};

export default utils;
