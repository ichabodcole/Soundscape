import SoundModule from '../../../../src/soundscape/modules/sound-module';

describe ('SoundModule', function () {
    var config, data;

    it ('should be defined', function () {
        expect(SoundModule).toBeDefined();
    });

    beforeEach (function () {
        config = {
            audioCtx: {
                createGain: function () {
                    return {
                        gain: {
                            value: 1
                        }
                    };
                }
            },
            masterGain: jasmine.createSpyObj('gain', ['gain']),
            pubSub: jasmine.createSpyObj('pubSub', ['broadcast', 'on', 'off'])
        };

        data = {
            id: "1",
            type: "module-type",
            title: "My SoundModule"
        };
    });

    describe ('constructor', function () {
        var sm;

        beforeEach (function () {
            sm = new SoundModule(config, data);
        });

        it ('should not throw an error', function () {
            expect(function () {
                new SoundModule(config, data);
            }).not.toThrow();
        });

        it ('should set up the module events', function () {
            expect(config.pubSub.on).toHaveBeenCalled();
        });

        it ('should set up default values', function () {
            expect(sm.volume).toBe(0.5);
        });

        it ('should exend the model the optional data obj', function () {
            expect(sm.title).toBe("My SoundModule");
        });
    });

    describe ('properties', function () {
        var sm;

        beforeEach (function () {
            sm = new SoundModule(config, data);
        });

        describe ('id', function () {
            it ('should return an id string', function () {
                expect(sm.id).toEqual('1');
            });
        });

        describe ('title', function () {
            it ('should return a title string', function () {
                expect(sm.title).toEqual('My SoundModule');
            });

            it ('should set the title', function () {
                sm.title = 'Hello World';
                expect(sm.title).toEqual('Hello World');
            });
        });

        describe ('type', function () {
            it ('should return a type string', function () {
                expect(sm.type).toEqual('module-type');
            });
        });

        describe ('gain', function () {
            it ('should return the gain value as number', function () {
                expect(sm.gain).toBe(1);
            });

            it ('should set the gain property', function () {
                sm.gain = 0;
                expect(sm.gain).toBe(0);
            })
        });

        describe ('solo', function () {
            it ('should return a boolean with a default value of false', function () {
                expect(sm.solo).toBe(false);
            });

            it ('should set the solo property', function () {
                sm.solo = false;
                expect(sm.solo).toBe(false);
                sm.solo = true;
                expect(sm.solo).toBe(true);
            });

            it ('should call pubSub.broadcast using channel soundmodule and topic solo', function () {
                sm.solo = true;
                expect(config.pubSub.broadcast).toHaveBeenCalledWith('soundmodule', 'solo', { solo: true });
            });

            it ('should not broadcast a message if solo is set to a value other than true false', function () {
                sm.solo = 'someValue';
                expect(config.pubSub.broadcast).not.toHaveBeenCalled();
            });
        });

        describe ('mute', function () {
            it ('should return a boolean with a default value of false', function () {
                expect(sm.mute).toBe(false);
            });

            it ('should set the gain property to 0 when true', function () {
                sm.gain = 1;
                expect(sm.gain).toBe(1);
                sm.mute = true;
                expect(sm.gain).toBe(0);
            });

            xit ('should set the gain property to the previous volume value when set to false', function () {

            });
        });

        describe ('enable', function () {
            it ('should return a boolean with a default value of true', function () {
                expect(sm.enable).toBe(true);
            });
        });

        describe ('volume', function () {
            it ('should be defined', function () {
                expect(sm.volume).toBeDefined();
            });

            it ('should return the models volume.value property', function () {
                expect(sm.volume).toBe(0.5);
            });
        });

        describe ('volumeControl', function ( ){
            it ('should be defined', function () {
                expect(sm.volumeControl).toBeDefined();
            });
        });
    });

    describe ('methods', function () {
        var sm;

        beforeEach (function () {
            sm = new SoundModule(config, data);
        });

        describe ('start', function (){

        });

        describe ('stop', function () {

        });

        describe ('remove', function () {
            it ('should set the solo attribute to false', function () {
                sm.solo = true;
                sm.remove();
                expect(sm.solo).toBe(false);
            });

            it ('should remove the soloEvent listener', function () {
                sm.remove();
                expect(config.pubSub.off).toHaveBeenCalled();
            });
        });

        describe ('soloCheck', function () {
            it ('should disable the module if soloed is false and soloCount is greater than 0', function ( ) {
                var soloCount = 1;

                sm.soloCheck(soloCount);
                expect(sm.enable).toBe(false);
            });

            it ('should enable the module if soloed is true', function () {
                var soloCount = 1;

                sm.enable = false;
                sm.solo = true;
                sm.soloCheck(soloCount);
                expect(sm.enable).toBe(true);
            });

            it ('should enable the module if the soloCount is equal to 0', function () {
                var soloCount = 0;
                sm.enable = false;
                sm.soloCheck(soloCount);
                expect(sm.enable).toBe(true);
            });
        });

        describe ('onVolumeUpdate', function () {

        });

        describe ('onSoloUpdate', function () {
            it ('should call the soloCheck method', function () {
                spyOn(sm, 'soloCheck');
                sm.onSoloUpdate(null, {soloCount: 1});
                expect(sm.soloCheck).toHaveBeenCalled();
            });

            it ('should return true if the passed objects soloCount is valid', function () {
                expect(sm.onSoloUpdate(null, {soloCount: 1.1})).toBe(true);
                expect(sm.onSoloUpdate(null, {soloCount: Math.PI})).toBe(true);
            });

            it ('should return false if the passed objects soloCount is not valid', function () {
                expect(sm.onSoloUpdate(null, {soloCount: 'nan'})).toBe(false);
                expect(sm.onSoloUpdate(null, {soloCount: Number.NaN})).toBe(false);
            });
        });

        describe ('getPropertyAttribute', function () {

        });

        describe ('setPropertyAttribute', function () {

        });
    });
});
