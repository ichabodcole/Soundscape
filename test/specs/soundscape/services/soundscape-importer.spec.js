import Soundscape from '../../../../src/soundscape/soundscape';
import { ModuleType, NoiseType, ControlType } from '../../../../src/soundscape/constants';
import Importer from '../../../../src/soundscape/services/soundscape-importer';

describe('Service: Importer', function() {
    var soundscape, soundscapeData;

    beforeEach(function() {

        soundscapeData = {
            duration: 10000,
            modules: [
                {
                    type: ModuleType.COLOR_NOISE_MODULE,
                    options: {
                        id: 7,
                        noiseType: NoiseType.PINK,
                        volume: {
                            min: 0,
                            max: 100,
                            value: 0.25,
                            controlType: ControlType.FOLLOW_CONTROL,
                            followId: 18,
                            followProp: 'volume'
                        }
                    }
                },
                {
                    type: ModuleType.BINAURAL_BEAT_MODULE,
                    options: {
                        id: 23
                    }
                },
                {
                    type: ModuleType.BINAURAL_BEAT_MODULE,
                    options: {
                        id: 15
                    }
                },
                {
                    type: ModuleType.COLOR_NOISE_MODULE,
                    options: {
                        id: 18,
                        volume: {
                            value: 0.55
                        }
                    }
                }
            ]
        };

        soundscape = new Soundscape();
    });

    describe('import', function() {

        beforeEach(function() {
            Importer.import(soundscape, soundscapeData);
        });

        it ('should be defined', function() {
            expect(Importer.import).toBeDefined();
        });

        it ('should populate the soundscapes modules array', function() {
            expect(soundscape.modules.length).toEqual(4);
        });


        describe('module setup', function() {
            describe('the first module', function() {
                var module;

                beforeEach(function() {
                    module = soundscape.modules[0];
                });

                describe('id', function() {
                    it ('should set up the id property', function() {
                        expect(module.id).toBe(7);
                    });
                });

                describe('noiseType', function() {
                    it ('should set up the noiseType starting value', function() {
                        expect(module.noiseType).toBe(NoiseType.PINK);
                    });
                });

                describe('volume', function() {
                    it ('should set up the volume controls starting value', function() {
                        expect(module.volume.value).toBe(0.25);
                    });

                    it('should set up the volume controls control type', function() {
                        expect(module.volume.controlType).toBe(ControlType.FOLLOW_CONTROL);
                    });
                })
            })

            it('should setup follow controls after all the initial modules have been created', function() {
                var followerControl = soundscape.modules[0].volume.control;
                var followedControl = soundscape.modules[3].volume.control;
                expect(followerControl.target).toBe(followedControl);
            });
        });

    });
});
