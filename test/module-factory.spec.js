import ModuleFactory from '../lib/module-factory';
import { SoundscapeEvents } from '../lib/index';
import { ModuleTypes, ColorNoiseModule } from 'sound-modules';

describe('ModuleFactory', function() {
    var mod, options,
        ctx = new AudioContext();

    beforeEach(function() {
        options = { id: 'someValidId' };
        mod = ModuleFactory.create(ModuleTypes.COLOR_NOISE_MODULE, ctx, options);
    });

    describe('create',function() {
        it('should be defined', function() {
            expect(ModuleFactory.create).toBeDefined();
        });

        it('should return a sound module based on the type argument', function() {
            var ColorNoiseMod = ModuleFactory.create(ModuleTypes.COLOR_NOISE_MODULE, ctx);
            expect(ColorNoiseMod instanceof ColorNoiseModule).toBe(true);
        });

        it('should throw an error when given an invalid module type', function() {
            expect(function() {
                ModuleFactory.create('invalidType');
            }).toThrow(new Error('ModuleFactory.create: unknown module type (invalidType)'));
        });

        describe('decorating the SoundModule', function() {
            describe('properties', function() {
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
                        expect(mod.emit).toHaveBeenCalledWith(SoundscapeEvents.SOLO, expectedData);
                    });

                    it('should use the options arguments soloed property if present', function() {
                        var mod = ModuleFactory.create(ModuleTypes.COLOR_NOISE_MODULE, ctx, { solo: true });
                        expect(mod.solo).toBe(true);
                    });
                });
            });
        });
    });
});
