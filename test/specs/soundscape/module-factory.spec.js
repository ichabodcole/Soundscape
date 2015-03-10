import ModuleFactory from '../../../src/soundscape/module-factory';
import { ModuleType, ModuleEvent } from '../../../src/soundscape/constants';
import SoundModule from '../../../src/soundscape/modules/sound-module';

describe('ModuleFactory', function() {
    var mod, options;

    beforeEach(function() {
        options = { id: 'someValidId' };
        mod = ModuleFactory.create(ModuleType.COLOR_NOISE_MODULE, options);
    });

    describe('create',function() {
        it('should be defined', function() {
            expect(ModuleFactory.create).toBeDefined();
        });

        it('should return a sound module based on the type argument', function() {
            var ColorNoiseMod = ModuleFactory.create(ModuleType.COLOR_NOISE_MODULE);
            expect(ColorNoiseMod instanceof SoundModule).toBe(true);
        });

        it('should throw an error when given an invalid module type', function() {
            expect(function() {
                ModuleFactory.create('invalidType');
            }).toThrow(new Error('ModuleFactory.create: unknown module type (invalidType)'));
        });

        describe('decorating the SoundModule', function() {
            describe('properties', function() {
                describe('id', function() {
                    it('should be defined', function() {
                        expect(mod.id).toBeDefined();
                    });

                    it('should defalt to a uuid string 36 characters long', function() {
                        var mod = ModuleFactory.create(ModuleType.COLOR_NOISE_MODULE);
                        expect(mod.id.length).toBe(36);
                    });

                    it('should use the options arguments id property if present', function() {
                        expect(mod.id).toBe(options.id);
                    });
                });

                describe('solo', function() {
                    it('should be defined', function() {
                        expect(mod.solo).toBeDefined();
                    });

                    it('should default to false', function() {
                        expect(mod.solo).toBe(false);
                    });

                    it('should set the solo property', function() {
                        mod.solo = true;
                        expect(mod.solo).toBe(true);
                    });

                    it('should emit a SOLO event', function() {
                        spyOn(mod, 'emit');
                        mod.solo = true;
                        var expectedData = {
                            id: options.id,
                            state: true
                        };
                        expect(mod.emit).toHaveBeenCalledWith(ModuleEvent.SOLO, expectedData);
                    });

                    it('should use the options arguments soloed property if present', function() {
                        var mod = ModuleFactory.create(ModuleType.COLOR_NOISE_MODULE, { soloed: true });
                        expect(mod.solo).toBe(true);
                    });
                });
            });
        });
    });
});
