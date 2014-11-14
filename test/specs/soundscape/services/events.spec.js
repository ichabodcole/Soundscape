import { Events, Channel } from '../../../../src/soundscape/services/events';

describe ('Events', function () {
    it ('should exist', function () {
        expect(Events).toBeDefined();
    });

    describe ('methods', function () {
        var events, listenerObj;

        beforeEach (function () {
            events = new Events();
            listenerObj = {
                myMethod: function (e, data) {
                    return 'myValue';
                },
                mySecondMethod: function (e, data) {
                    return 'mySecondValue';
                }
            };
        });

        describe ('broadcast', function () {
            it ('should be defined', function () {
                expect(events.broadcast).toBeDefined();
            });

            it ('should return false if the given channel does not exist', function ( ){
                var broadcast = events.broadcast('undefinedChannel', 'someTopic', {data: 1});
                expect(broadcast).toBe(false);
            });

            it ('should return true if the broadcast was successful', function () {
                var broadcast;
                spyOn(listenerObj, 'myMethod');
                events.on('channel1', 'topic1', listenerObj.myMethod, listenerObj);
                broadcast = events.broadcast('channel1', 'topic1', {data: 1});
                expect(broadcast).toBe(true);
                expect(listenerObj.myMethod).toHaveBeenCalled();
            });

            it ('should return false if the broadcast was not successful', function () {
                var broadcast;
                spyOn(listenerObj, 'myMethod');
                events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                broadcast = events.broadcast('channel1', 'undefinedTopic', {data: 1});
                expect(broadcast).toBe(false);
                expect(listenerObj.myMethod).not.toHaveBeenCalled();
            });

            it ('should call the listener function for the passed topic within in the passed channel', function () {
                var broadcast;

                spyOn(listenerObj, 'myMethod');
                events.on('channel1', 'topic1', listenerObj.myMethod, listenerObj);
                broadcast = events.broadcast('channel1', 'topic1', {data: 'someValue'});

                expect(listenerObj.myMethod).toHaveBeenCalled();
            });

            it ('should call the listener functions for all topics in a channel when no topicStr is passed', function () {
                var broadcast;

                spyOn(listenerObj, 'myMethod');
                spyOn(listenerObj, 'mySecondMethod');


                events.on('channel1', 'topic1', listenerObj.myMethod, listenerObj);
                events.on('channel1', 'topic2', listenerObj.mySecondMethod, listenerObj);
                broadcast = events.broadcast('channel1', null, {data: 'someValue'});

                expect(listenerObj.myMethod).toHaveBeenCalled();
                expect(listenerObj.mySecondMethod).toHaveBeenCalled();
            });

            it ('should pass an event object and any custom data', function () {
                var broadcast;
                spyOn(listenerObj, 'myMethod');
                events.on('channel1', 'topic1', listenerObj.myMethod, listenerObj);
                broadcast = events.broadcast('channel1', 'topic1', {data: 'someValue'});

                expect(listenerObj.myMethod).toHaveBeenCalledWith(jasmine.any(Object), {data: 'someValue'});
            });
        });

        describe ('on', function () {
            it ('should be defined', function () {
                expect(events.on).toBeDefined();
            });

            it ('should return a token string', function () {
                var token = events.on('channel', 'topic', this, function () {});
                expect(typeof token).toBe('string');
            });
        });

        describe ('off', function () {
            it ('should be defined', function () {
                expect(events.off).toBeDefined();
            });

            it ('should return true if the event was removed', function () {
                var token, off;

                token = events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                off = events.off(token, 'channel1', 'topic1');

                expect(off).toBe(true);
            });

            it ('should return false if the token was not valid', function () {
                var token, off;

                token = 'invalid';
                events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                off = events.off(token, 'channel1', 'topic1');

                expect(off).toBe(false);
            });

            it ('should return false if the channel was not valid', function () {
                var token, off;

                token = events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                off = events.off(token, 'invalidChannel', 'topic1');

                expect(off).toBe(false);
            });

            it ('should return true if the token is null and the topic is valid', function () {
                var token, off;

                events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                off = events.off(token, 'channel1', 'topic1');

                expect(off).toBe(true);
            });

            it ('should return true if the token is null and the topic is null', function () {
                var off;

                events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                off = events.off(null, 'channel1', null);

                expect(off).toBe(true);
            });

            it ('should return false if the token is null and the topic is invalid', function () {
                var off;

                events.on('channel1', 'topic1', listenerObj, listenerObj.myMethod);
                off = events.off(null, 'channel1', 'invalid');

                expect(off).toBe(false);
            });
        });

        describe ('setChannel', function () {
            it ('should be defined', function () {
                expect(events.setChannel).toBeDefined();
            });

            it ('should return a channel instance', function () {
                var channel = events.setChannel('testChannel');
                expect(channel instanceof Channel).toBe(true);
            });
        });

        describe ('getChannel', function () {
            it ('should be defined', function () {
                expect(events.getChannel).toBeDefined();
            });

            it ('should return a channel instance', function () {
                events.setChannel('newChannel');
                var channel = events.getChannel('newChannel');
                expect(channel instanceof Channel).toBe(true);
            });

            it ('should return false if no channel exists', function () {
                var channel = events.getChannel('someChannel');
                expect(channel).toBe(false);
            });
        });
    });
});
