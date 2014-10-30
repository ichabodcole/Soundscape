define(['services/utils'], function (utils) {
    describe('utils', function () {

        beforeEach(function() {
            utils = utils.default;
        })

        it('should exist', function () {
            expect(utils.isObject).toBeDefined();
        });
    });
})
