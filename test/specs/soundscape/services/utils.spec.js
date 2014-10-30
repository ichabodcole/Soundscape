var utils = require('../../../../src/soundscape/services/utils');

describe('utils', function () {

    beforeEach(function() {
        utils = utils.default;
    })

    it('should exist', function () {
        expect(utils.isObject).toBeDefined();
    });
});
