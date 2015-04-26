import Soundscape from '../../../../src/soundscape/soundscape';
import { ModuleType, NoiseType, ControlType } from '../../../../src/soundscape/constants';
import SoundscapeExporter from '../../../../src/soundscape/services/soundscape-exporter';

describe('Service: SoundscapeExporter', function() {
    var soundscape;

    beforeEach(function() {
        soundscape = new Soundscape();
    });

    describe('export', function() {
        it ('should be defined', function() {
            expect(SoundscapeExporter.export).toBeDefined();
        });

        xit ('should return an object representing the state of the soundscape', function() {
            soundscape.addModule(ModuleType.COLOR_NOISE_MODULE);

            var expectedData = {
                modules: [
                    {

                    }
                ]
            };

            expect(SoundscapeExporter.export(soundscape)).toEqual(expectedData);
        });
    });
});
