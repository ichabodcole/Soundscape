import Soundscape from '../../../src/soundscape/soundscape';
import Timer from '../../../src/soundscape/services/timer';
import { Channel } from '../../../src/soundscape/services/events';
import SoundModule from '../../../src/soundscape/modules/sound-module';

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

        describe('timer', function() {
            it('should be a Timer instance', function() {
                expect(scp.timer instanceof Timer).toBe(true);
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

        describe('duration', function() {
            it('should be defined', function() {
                expect(scp.duration).toBeDefined();
            });

            it('should set the duration property', function() {
                scp.duration = 5000;
                expect(scp.duration).toBe(5000);
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
                var soloedModules = [
                    scp.addModule(new SoundModule()),
                    scp.addModule(new SoundModule())
                ];
                scp.soloModule(scp.modules[0].id);
                scp.soloModule(scp.modules[1].id);
                expect(scp.soloedModules).toEqual(soloedModules);
            });
        });
    });

    describe ('methods', function () {
        describe('addModule', function() {
            var mod, returned;

            beforeEach(function() {
                mod = new SoundModule();
                returned = scp.addModule(mod);
            });

            it('should throw an error if the module argument is not a SoundModule instance', function() {
                expect(function(){
                    scp.addModule({});
                }).toThrow(new Error('addModule module arument must be a SoundModule instance'));
            });

            it('should increase the modules array length', function() {
                expect(scp.modules.length).toBe(1);
            });

            it('should return an object with and id property', function() {
                expect(returned.id).toBeDefined();
            });

            it('should return an object with a soloed property set to false', function() {
                expect(returned.soloed).toBe(false);
            });

            it('should return an object with a module property', function() {
                expect(returned.module).toBeDefined();
            });

            it('should emit an ADD_MODULE event', function() {
                spyOn(scp, 'emit');
                var returned = scp.addModule(mod);
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.ADD_MODULE, returned);
            });
        });

        describe('removeModule', function() {
            var mod, added, removed;

            beforeEach(function() {
                mod = new SoundModule();
                added = scp.addModule(mod);
            });

            it('should be defined', function() {
                expect(scp.removeModule).toBeDefined();
            });

            it('should remove a module from the modules array when passed a valued module id', function() {
                removed = scp.removeModule(added.id);
                expect(scp.modules.length).toBe(0);
            });

            it('should return the removed module', function() {
                removed = scp.removeModule(added.id);
                expect(removed).toEqual(added);
            });

            it('should emit an REMOVE_MODULE event', function() {
                spyOn(scp, 'emit');
                var returned = scp.addModule(mod);
                scp.removeModule(returned.id);
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.REMOVE_MODULE, returned);
            });
        });

        describe('getModuleById', function() {
            it('should be defined', function() {
                expect(scp.getModuleById).toBeDefined();
            });

            it('should return a module when give a valid module id', function() {
                var mod = new SoundModule();
                var added = scp.addModule(mod);
                var returned = scp.getModuleById(added.id);
                expect(returned).toEqual(added);
            });
        });

        describe('play', function() {
            it('should be defined', function() {
                expect(scp.play).toBeDefined();
            });

            it('should call the timers start method', function () {
                spyOn(scp.timer, 'start');
                scp.play();
                expect(scp.timer.start).toHaveBeenCalled();
            });

            it('should set the state property value to PLAYING', function() {
                scp.play();
                expect(scp.state).toBe(Soundscape.PLAYING);
            });

            it('should emit a PLAYING event', function() {
                spyOn(scp, 'emit');
                scp.play();
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.PLAY);
            });

            it('should call the start method of all SoundModules', function() {
                var mod1 = new SoundModule();
                var mod2 = new SoundModule();

                spyOn(mod1, 'start');
                spyOn(mod2, 'start');

                scp.addModule(mod1);
                scp.addModule(mod2);

                scp.play();

                expect(mod1.start).toHaveBeenCalled();
                expect(mod2.start).toHaveBeenCalled();
            });
        });

        describe('stop', function() {
            it('should be defined', function() {
                expect(scp.stop).toBeDefined();
            });

            it('should set the state property to STOPPED', function() {
                scp.play();
                scp.stop();
                expect(scp.state).toBe(Soundscape.STOPPED);
            });

            it('should call the timers stop method', function() {
                scp.play();
                spyOn(scp.timer, 'stop');
                scp.stop();
                expect(scp.timer.stop).toHaveBeenCalled();
            });

            it('should emit a STOP event', function() {
                scp.play();
                spyOn(scp, 'emit');
                scp.stop();
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.STOP);
            });

            it('should call the stop method of all SoundModules', function() {
                var mod1 = new SoundModule();
                var mod2 = new SoundModule();

                spyOn(mod1, 'stop');
                spyOn(mod2, 'stop');

                scp.addModule(mod1);
                scp.addModule(mod2);

                scp.play();
                scp.stop();

                expect(mod1.stop).toHaveBeenCalled();
                expect(mod2.stop).toHaveBeenCalled();
            });
        });

        describe('pause', function() {
            it('should be defined', function() {
                expect(scp.pause).toBeDefined();
            });

            it('should set the state property to PAUSED', function() {
                scp.play();
                scp.pause()
                expect(scp.state).toBe(Soundscape.PAUSED);
            });

            it('should call the timers pause method', function() {
                scp.play();
                spyOn(scp.timer, 'pause');
                scp.pause();
                expect(scp.timer.pause).toHaveBeenCalled();
            });

            it('should emit a PAUSE event', function() {
                scp.play();
                spyOn(scp, 'emit');
                scp.pause();
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.PAUSE);
            });

            it('should call the stop method of all SoundModules', function() {
                var mod1 = new SoundModule();
                var mod2 = new SoundModule();

                spyOn(mod1, 'stop');
                spyOn(mod2, 'stop');

                scp.addModule(mod1);
                scp.addModule(mod2);

                scp.play();
                scp.pause();

                expect(mod1.stop).toHaveBeenCalled();
                expect(mod2.stop).toHaveBeenCalled();
            });
        });

        describe('soloModule', function() {
            beforeEach(function() {
                var mod1 = new SoundModule();
                var mod2 = new SoundModule();
                var mod3 = new SoundModule();
                scp.addModule(mod1);
                scp.addModule(mod2);
                scp.addModule(mod3);
            });

            it('should be defined', function() {
                expect(scp.soloModule).toBeDefined(0);
            });

            it('should emit a SOLO_MODULE event', function() {
                spyOn(scp, 'emit');
                var scpModule = scp.modules[0];
                scp.soloModule(scpModule.id);
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.SOLO_MODULE, scpModule);
            });

            it('should set the module entrys soloed value to true', function() {
                var scpModule = scp.modules[0];
                scp.soloModule(scpModule.id);
                expect(scpModule.soloed).toBe(true);
            });

            it('should call the soloed modules stop method', function() {
                var scpModule = scp.modules[0];
                spyOn(scpModule.module, 'stop');
                scp.soloModule(scpModule.id);
                expect(scpModule.module.stop).toHaveBeenCalled();
            });

            it('should return the soloed soundscape module', function() {
                var scpModule = scp.modules[0];
                var soloed = scp.soloModule(scpModule.id);
                expect(soloed).toEqual(scpModule);
            });
        });

        describe('unsoloModule', function() {
            beforeEach(function() {
                var mod1 = new SoundModule();
                var mod2 = new SoundModule();
                var mod3 = new SoundModule();
                scp.addModule(mod1);
                scp.addModule(mod2);
                scp.addModule(mod3);
            });

            it('should be defined', function() {
                expect(scp.unsoloModule).toBeDefined(0);
            });

            it('should emit a UNSOLO_MODULE event', function() {
                spyOn(scp, 'emit');
                var scpModule = scp.modules[0];
                scp.soloModule(scpModule.id);
                scp.unsoloModule(scpModule.id);
                expect(scp.emit).toHaveBeenCalledWith(Soundscape.UNSOLO_MODULE, scpModule);
            });

            it('should set the module entrys soloed value to false', function() {
                var scpModule = scp.modules[0];
                scp.soloModule(scpModule.id);
                scp.unsoloModule(scpModule.id);
                expect(scpModule.soloed).toBe(false);
            });

            it('should call the soloed modules start method', function() {
                var scpModule = scp.modules[0];
                spyOn(scpModule.module, 'start');
                scp.soloModule(scpModule.id);
                scp.unsoloModule(scpModule.id)
                expect(scpModule.module.start).toHaveBeenCalled();
            });

            it('should return the unsoloed soundscape module', function() {
                var scpModule = scp.modules[0];
                scp.soloModule(scpModule.id);
                var unsoloed = scp.soloModule(scpModule.id);
                expect(unsoloed).toEqual(scpModule);
            });
        });
    });

    describe('Events', function() {
        describe('COMPLETE', function() {

        });
    });
});
