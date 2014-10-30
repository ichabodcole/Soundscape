class Events {
    // TODO: add topics sub array of channels
    // so Events instance can be used globally.
    constructor () {
        this.channels = {};
        this.subUid = -1;
    }

    broadcast (channel, data) {
        if ( this.noChannel(channel) ) {
            return false;
        }

        this.channels[channel].forEach(updateChannels);

        function updateChannels (channelObj, index, array) {

            var evt = {
                channel: channelObj.channel,
                func: channelObj.func,
                context: channelObj.context
            };

            channelObj.func.call(channelObj.context, evt, data);
        }
    }

    on (channel, listener, context) {
        var token, channelObj;
        if ( this.noChannel(channel) ) {
            this.channels[channel] = [];
        }

        token = ( ++this.subUid ).toString();

        channelObj = {
            token: token,
            channel: channel,
            context: context,
            func: listener
        };

        this.channels[channel].push(channelObj);
        return token;
    }

    off (channel, token) {
        if ( this.noChannel(channel) ) {
            return false;
        }

        var _channel = this.channels[channel];
        _channel.forEach(removeChannel);

        function removeChannel (listener, index, array) {
            if(listener.token === token) {
                _channel.splice(index, 1);
            }
        }

        return token;
    }

    noChannel (channel) {
        return !this.channels.hasOwnProperty(channel);
    }
}

export default Events;
