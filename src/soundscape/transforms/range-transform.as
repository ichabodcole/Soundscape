import Transform from './transform';

export class RangeTransform extends Transform {
    constructor(min, max) {
        this.min = min;
        this.max = max;

        var config = {
            transform: function(input) {
                var diff = this.max - this.min;
                var increment = 1 / diff;
                return (increment * input) + this.min;
            }
        }

        super(config);
    }
}

export default RangeTransform;
