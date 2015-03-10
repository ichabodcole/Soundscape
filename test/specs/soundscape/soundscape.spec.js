import { Soundscape, SoundscapeEvent } from '../../../src/soundscape/soundscape';
import { Channel } from '../../../src/soundscape/services/events';
import SoundModule from '../../../src/soundscape/modules/sound-module';
import { ModuleType, ModuleEvent } from '../../../src/soundscape/constants';

function addSoundModules(scp, options={}, total=1) {
    for(var i=0; i<total; i++) {
        scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
    }
    return scp.modules;
}

describe ('Soundscape', function () {
    var scp, options;

    beforeEach(function() {
        options = {

        };

        scp = new Soundscape();
    });

    it ('should be defined', function () {
        expect(Soundscape).toBeDefined();
    });

    describe ('constructor', function () {

        it('should not throw an error', function() {
            expect(function() {
                new Soundscape();
            }).not.toThrow();
        });
    });

    describe ('properties', function () {

        describe('audioCtx', function() {
            it('should be an AudioContext instance', function() {
                expect(scp.audioCtx instanceof AudioContext).toBe(true);
            });
        });

        describe('modules', function() {
            it('should be defined', function() {
                expect(scp.modules).toBeDefined();
            });

            it('should be an Array instance', function() {
                expect(scp.modules instanceof Array).toBe(true);
            });
        });

        describe('state', function() {
            it('should be defined', function() {
                expect(scp.state).toBeDefined();
            });

            it('should default to STOPPED', function() {
                expect(scp.state).toBe(Soundscape.STOPPED);
            });
        });

        describe('soloedModules', function() {
            it('should be defined', function() {
                expect(scp.soloedModules).toBeDefined();
            });

            it('should return a list of soloed modules', function() {
                var mod1 = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                var mod2 = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);

                mod1.solo = true;
                mod2.solo = true;

                var expectedModules = [mod1, mod2];
                expect(scp.soloedModules).toEqual(expectedModules);
            });
        });

        describe('volume', function() {
            it('should be defined', function() {
                expect(scp.volume).toBeDefined();
            });

            it('should have a default value of 0.5', function() {
                expect(scp.volume).toBe(0.5);
            });

            it('should set the masterGain value', function() {
                scp.volume = 0.65;
                expect(scp.masterGain.gain.value).toBeCloseTo(0.65);
            });
        });
    });

    describe ('methods', function () {
        describe('addModule', function() {
            var options, addedMod;

            beforeEach(function() {
                options = {};
                addedMod = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
            });

            it('should increase the modules array length', function() {
                expect(scp.modules.length).toBe(1);
            });

            it('should call the __setupModule method', function() {
                spyOn(scp, '__setupModule');
                addSoundModules(scp, options, 1);
                expect(scp.__setupModule).toHaveBeenCalled();
            });

            it('should return a SoundModule instance', function() {
                expect(addedMod instanceof SoundModule).toBe(true);
            });

            it('should emit an ADD_MODULE event', function() {
                spyOn(scp, 'emit');
                var addedMod = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                expect(scp.emit).toHaveBeenCalledWith(SoundscapeEvent.ADD_MODULE, addedMod);
            });
        });

        describe('removeModule', function() {
            var addedMod, removedMod, options;

            beforeEach(function() {
                options = {};
                addedMod = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
            });

            it('should be defined', function() {
                expect(scp.removeModule).toBeDefined();
            });

            it('should remove a module from the modules array when passed a valued module id', function() {
                scp.removeModule(addedMod.id);
                expect(scp.modules.length).toBe(0);
            });

            it('should return the removed module', function() {
                removedMod = scp.removeModule(addedMod.id);
                expect(removedMod).toEqual(addedMod);
            });

            it('should emit an REMOVE_MODULE event', function() {
                spyOn(scp, 'emit');
                scp.removeModule(addedMod.id);
                expect(scp.emit).toHaveBeenCalledWith(SoundscapeEvent.REMOVE_MODULE, addedMod);
            });
        });

        describe('getModuleById', function() {
            it('should be defined', function() {
                expect(scp.getModuleById).toBeDefined();
            });

            it('should return a module when give a valid module id', function() {
                var addedMod = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                var returnedMod = scp.getModuleById(addedMod.id);
                expect(returnedMod).toEqual(addedMod);
            });
        });

        describe('start', function() {
            it('should be defined', function() {
                expect(scp.start).toBeDefined();
            });

            it('should set the state property value to ACTIVE', function() {
                scp.start();
                expect(scp.state).toBe(Soundscape.ACTIVE);
            });

            it('should emit a START event', function() {
                spyOn(scp, 'emit');
                scp.start();
                expect(scp.emit).toHaveBeenCalledWith(SoundscapeEvent.START);
            });

            it('should call the startModules method', function() {
                spyOn(scp, '__startModules');
                scp.start();
                expect(scp.__startModules).toHaveBeenCalled();
            });
        });

        describe('stop', function() {
            beforeEach(function() {
                scp.start();
            });

            it('should be defined', function() {
                expect(scp.stop).toBeDefined();
            });

            it('should set the state property to STOPPED', function() {
                scp.stop();
                expect(scp.state).toBe(Soundscape.STOPPED);
            });

            it('should emit a STOP event', function() {
                spyOn(scp, 'emit');
                scp.stop();
                expect(scp.emit).toHaveBeenCalledWith(SoundscapeEvent.STOP);
            });

            it('should call the stopModules methods', function() {
                spyOn(scp, '__stopModules');
                scp.stop();
                expect(scp.__stopModules).toHaveBeenCalled();
            });
        });


        describe('destroy', function() {
            it('should be defined', function() {
                expect(scp.destroy).toBeDefined();
            });

            it('should teardown the modules', function() {
                spyOn(scp, '__cleanupModule');
                addSoundModules(scp, options, 5);
                scp.destroy();
                expect(scp.__cleanupModule).toHaveBeenCalled();
                expect(scp.__cleanupModule.calls.count()).toBe(5);
            });
        });

        describe('__startModules', function() {
            it('should call the start method on all modules', function() {
                var mod1 = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                var mod2 = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(mod1, 'start');
                spyOn(mod2, 'start');
                scp.__startModules();
                expect(mod1.start).toHaveBeenCalled();
                expect(mod2.start).toHaveBeenCalled();
            });
        });

        describe('__stopModules', function() {
            it('should call the stop method on all modules', function() {
                var mod1 = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                var mod2 = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(mod1, 'stop');
                spyOn(mod2, 'stop');
                scp.__stopModules();
                expect(mod1.stop).toHaveBeenCalled();
                expect(mod2.stop).toHaveBeenCalled();
            });
        });

        // Tests for Private methods
        describe('__setupModule', function() {
            it('should call the modules on method with a SOLO event type and soloListener', function() {
                var module = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(module, 'on');
                scp.__setupModule(module);
                expect(module.on).toHaveBeenCalledWith(ModuleEvent.SOLO, scp.soloListener);
            });

            it('should call the modules on connect with the soundscapes gainNode', function() {
                var module = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(module, 'connect');
                scp.__setupModule(module);
                expect(module.connect).toHaveBeenCalledWith(scp.gainNode);
            });

            it('should start the module if the Soundscape is ACTIVE', function() {
                scp.start();
                var module = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(module, 'start');
                scp.__setupModule(module);
                expect(module.start).toHaveBeenCalled();
            });
        });

        describe('__cleanupModule', function() {
            it('should call the modules removeListener method with a SOLO event type and soloListener', function() {
                var module = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(module, 'removeListener');
                scp.__cleanupModule(module);
                expect(module.removeListener).toHaveBeenCalledWith(ModuleEvent.SOLO, scp.soloListener);
            });

            it('should call the modules on connect with the soundscapes gainNode', function() {
                var module = scp.addModule(ModuleType.COLOR_NOISE_MODULE, options);
                spyOn(module, 'disconnect');
                scp.__cleanupModule(module);
                expect(module.disconnect).toHaveBeenCalled();
            });
        });

        describe('__onSoloModule', function() {
            var modules;

            beforeEach(function() {
                modules = addSoundModules(scp, options, 5);
            });

            it('should be defined', function() {
                expect(scp.__onSoloModule).toBeDefined();
            });

            it('should disconnect all unsoloed modules', function() {
                var unSoloedModule = modules[1];
                spyOn(unSoloedModule, 'disconnect');
                scp.__onSoloModule();
                expect(unSoloedModule.disconnect).toHaveBeenCalled();
            });

            it('should not disconnect soloed modules', function() {
                var soloedModule = modules[1];
                soloedModule.solo = true;
                spyOn(soloedModule, 'disconnect');
                scp.__onSoloModule();
                expect(soloedModule.disconnect).not.toHaveBeenCalled();
            });

            it('should connect any soloed modules', function() {
                var soloedModule = modules[1];
                soloedModule.solo = true;
                spyOn(soloedModule, 'connect');
                scp.__onSoloModule();
                expect(soloedModule.connect).toHaveBeenCalled();
            });

            it('should not connect unsoloed modules', function() {
                var unSoloedModule = modules[1];
                spyOn(unSoloedModule, 'connect');
                scp.__onSoloModule();
                expect(unSoloedModule.connect).not.toHaveBeenCalled();
            });
        });

    });

    describe('Events', function() {
        describe('COMPLETE', function() {

        });
    });
});
