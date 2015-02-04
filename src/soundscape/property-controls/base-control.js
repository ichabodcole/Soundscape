var EventEmitter = require('events').EventEmitter;

class BaseControl extends EventEmitter {

    // Private Methods
    __getValueFromPercent (percent) {
        var diff = this.max - this.min;
        var num = (percent * diff) + this.min;
        return num.toFixed(8)/1;
    }

    __getPercentFromValue (value) {
        var diff = this.max - this.min;
        var num = ((1000 / diff) * (value - this.min)) / 1000;
        return num.toFixed(8)/1;
    }

    __applyTransforms(input) {
        if(this.useTransforms) {
            this.transforms.forEach((transform) => {
                input = transform(input);
            });
        }
        return input;
    }

    __clampToBounds(input, min, max) {
        var output = input;

        if (input < min) {
            output = min;
        } else if(input > max) {
            output = max;
        }
        return output;
    }

    __handleError (errorMessage) {
        throw new Error(this.controlName + ': ' + errorMessage);
    }

    // Constructor init code
    constructor (options={}) {
        this.controlName = options.controlName || 'Property Control';
        this.transforms = options.transforms || [];

        // Set default model values.
        this.model = {};
        this.min = options.min || 0;
        this.max = (options.max != null) ? options.max : 1;
        this.value = (options.value != null) ? options.value : this.min;
        this.useTransforms = (options.useTransforms != null) ? options.useTransforms : true;
    }

    // Public methods
    setRange (min, max) {
        this.max = max;
        this.min = min;
    }

    addTransform (transform) {
        if (typeof transform === 'function') {
            this.transforms.push(transform);
        } else {
            this.__handleError('addTransform argument must be a function');
        }
    }

    removeTransform (transform) {
        if (typeof transform === 'function') {
            this.transforms = this.transforms.filter((element, index)=> {
                return element !== transform;
            });
        } else {
            this.__handleError('removeTransform argument must be a function');
        }
    }
    // Getters and Setters
    get useTransforms () {
        return this.model.useTransforms;
    }

    set useTransforms (state) {
        this.model.useTransforms = state;
    }

    get min () {
        return this.model.min;
    }

    set min (min) {
        if(min < this.max || this.max == null) {
            this.model.min = min;
        } else {
            this.__handleError(`cannot set min property (${min}) higher than max property (${this.max})`);
        }
    }

    get max () {
        return this.model.max;
    }

    set max (max) {
        if(max > this.min || this.min == null) {
            this.model.max = max;
        } else {
            this.__handleError(`cannot set max property (${max}) lower than min property (${this.min})`);
        }
    }

    get percent () {
        var transformed = this.__applyTransforms(this.model.percent);
        return this.__clampToBounds(transformed, 0, 1);
    }

    set percent (percent) {
        if (percent >= 0 && percent <= 1) {
            this.model.percent = percent;
            this.value = this.__getValueFromPercent(percent);
        } else {
            this.__handleError(`percent property (${percent}) must be a value with in range 0...1`);
        }
    }

    get value () {
        var transformInput = this.model.value - this.min;
        var transformed = this.__applyTransforms(transformInput) + this.min;
        return this.__clampToBounds(transformed, this.min, this.max);
    }

    set value (value) {
        if (typeof value === 'number') {
            if (value >= this.min || this.min == null) {
                if(value <= this.max || this.max == null) {
                    this.model.value = value;
                    // Must access the model directly so that an
                    // infinite update loop is not created.
                    this.model.percent = this.__getPercentFromValue(value);

                    var data = {
                        percent: this.percent,
                        value: this.value
                    };

                    this.emit(BaseControl.VALUE_CHANGE, data);
                } else {
                    this.__handleError(`cannot set value property (${value}) higher than max property (${this.max})`);
                }
            } else {
                this.__handleError(`cannot set value property (${value}) lower than min property (${this.min})`);
            }
        }
    }

    // set propertyName (propertyName) {
    //     this.model.propertyName = propertyName;
    // }

    // get propertyName () {
    //     return this.model.propertyName;
    // }
}

BaseControl.VALUE_CHANGE = 'value_change';

export default BaseControl;
