import Soundscape from '../../../src/soundscape/soundscape';

describe ('Soundscape', function () {

    it ('should be defined', function () {
        expect(Soundscape).toBeDefined();
    });

    describe ('constructor', function () {
        it ('should throw an error of no AudioContext is passed in', function () {
            expect(Soundscape).toThrow();
        });
    });

    describe ('methods', function () {
        var scp,
            ctx = new AudioContext();

        beforeEach (function () {
            scp = new Soundscape(ctx);
        });

        describe ('play', function () {
            it ('should be defined', function() {
                expect(scp.play).toBeDefined();
            });

            it ('should change the soundscape state property to "playing"', function () {
                scp.play();
                expect(scp.state).toEqual('playing');
            });

            xit ('should call the start method of all sound modules', function () {
                var sm,
                    type = 'noise-module';

                sm = scp.addSoundModule({ type: type });
                spyOn(sm, 'start');
                scp.play();

                expect(sm.start).toHaveBeenCalled();
            });
        });

        describe ('pause', function () {
            it ('should be defined', function() {
                expect(scp.pause).toBeDefined();
            });

            it ('should change the soundscape state property to "paused"', function() {
                scp.pause();
                expect(scp.state).toEqual('paused');
            });

            xit ('should call the pause method of all sound modules', function () {
                var sm,
                    type = 'noise-module';

                sm = scp.addSoundModule({ type: type });
                spyOn(sm, 'pause');
                scp.play();

                expect(sm.pause).toHaveBeenCalled();
            });
        });

        describe ('stop', function () {
            it ('should be defined', function() {
                expect(scp.stop).toBeDefined();
            });

            it ('should change the soundscape state property to "stopped"', function() {
                scp.stop();
                expect(scp.state).toEqual('stopped');
            });

            xit ('should call the stop method of all sound modules', function () {
                var sm,
                    type = 'noise-module';

                sm = scp.addSoundModule({ type: type });
                spyOn(sm, 'stop');
                scp.play();

                expect(sm.stop).toHaveBeenCalled();
            });
        });

        describe ('addSoundModule', function ( ) {
            it ('should be defined', function () {
                expect(scp.addSoundModule).toBeDefined();
            });

            xit ('should throw and error if the module type does not exist', function (){
                function addModule () {
                    scp.addSoundModule({type: 'invalidType'});
                }

                expect(addModule).toThrow();
            });

            xit ('should increase the soundModules array length property by 1', function () {
                var moduleCount = scp.soundModules.length;
                scp.addSoundModule({type: 'noise-module'});

                expect(scp.soundModules.length).toBe(moduleCount + 1);
            });
        });

        describe ('removeSoundModule', function () {

        });

        describe ('removeAllSoundModules', function () {

        });

        describe ('reset', function () {

        });

        describe ('parseJson', function () {

        });

        describe ('hasSoundModules', function () {

        });

        describe ('getSoundModuleById', function () {

        });

        describe ('getSoundModulesByProperty', function () {

        });
    });

    describe ('properties', function () {

        describe ('soundModuleIds', function () {

        });

        describe ('soundModules', function () {

        });

        describe ('playTime', function () {

        });

        describe ('soloCount', function () {

        });
    });
});
