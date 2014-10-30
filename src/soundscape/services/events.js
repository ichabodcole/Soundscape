class Events {
    constructor () {
        this.channels = {};
    }

    broadcast (channelStr, topicStr, data) {
        var channel;
        if ( this.noChannel(channelStr) ) {
            return false;
        }

        channel = this.channels[channelStr];
        return channel.broadcast(topicStr, data);
    }

    on (channelStr, topicStr, context, listenerFunc) {
        var channel;

        channel = this.setChannel(channelStr);
        return channel.on(topicStr, context, listenerFunc);
    }

    off (token, channelStr, topicStr) {
        var channel;
        if ( this.noChannel(channelStr) ) {
            return false;
        }

        channel = this.channels[channelStr];
        channel.off(token, topicStr);
    }

    setChannel (channelStr) {
        var channel;
        if(this.noChannel(channelStr)) {
            channel = new Channel(channelStr);
            this.channels[channelStr] = channel;
        } else {
            channel = this.channels[channelStr];
        }

        return channel;
    }

    noChannel (channelStr) {
        return channelStr == null || !this.channels.hasOwnProperty(channelStr);
    }
}

class Channel {
    constructor (channelName) {
        this.channelName = channelName;
        this.topics = {};
        this.defaultTopic = 'main';
        this.subUid = -1;
    }

    broadcast (topicStr, data) {
        var _self = this;

        if(this.noTopic(topicStr) && topicStr != null) {
            return false;
        }

        if ( topicStr == null ) {
            Object.keys(this.topics).forEach( (topic) => {
                this.topics[topic].forEach(updateTopic);
            });
        } else {
            this.topics[topicStr].forEach(updateTopic);
        }

        function updateTopic (topicObj, index, array) {

            var evt = {
                channel: _self.channelName,
                topic: topicObj.topic,
                func: topicObj.func,
                context: topicObj.context
            };

            topicObj.func.call(topicObj.context, evt, data);
        }
    }

    on (topicStr, context, listenerFunc) {
        var token, topicObj;
        if ( this.noTopic(topicStr) ) {
            this.topics[topicStr] = [];
        }

        token = ( ++this.subUid ).toString();

        topicObj = {
            token: token,
            topic: topicStr,
            context: context,
            func: listenerFunc
        };

        this.topics[topicStr].push(topicObj);
        return token;
    }

    off (token, topicStr) {
        var topic;
        if ( this.noTopic(topicStr) && topicStr != null) {
            return false;
        }

        if (topicStr == null) {
            Object.keys(this.topics).forEach( (topicKey)=> {
                topic = this.topics[topicKey];
                topic.forEach(removeTopic);
            });
        } else {
            topic = this.topics[topicStr];
            topic.forEach(removeTopic);
        }

        function removeTopic (topicObj, index, array) {
            if(topicObj.token === token) {
                topic.splice(index, 1);
            }
        }
    }

    noTopic (topicStr) {
        return topicStr == null || !this.topics.hasOwnProperty(topicStr);
    }
}

export default Events;
