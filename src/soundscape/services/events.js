export class Events {
    constructor () {
        this.channels = {};
        return this;
    }

    /**
    * @description
    * Broadcast a message to a channel.
    *
    * @param channelStr string
    * @param topicStr string || undefined || null
    * @param data object or literal
    * @returns boolean
    */
    broadcast (channelStr, topicStr, data) {
        var channel;
        if ( this.noChannel(channelStr) ) {
            return false;
        }

        channel = this.channels[channelStr];
        return channel.broadcast(topicStr, data);
    }

    /**
    * @description
    * Attach a channel listener.
    *
    * @param channelStr string
    * @param topicStr string || undefined || null
    * @param listenerFunc function
    * @param context object
    * @returns string
    */
    on (channelStr, topicStr, listenerFunc, context=null) {
        var channel;

        channel = this.setChannel(channelStr);
        return channel.on(topicStr, listenerFunc, context);
    }

    /**
    * @description
    * Remove a channel listener.
    *
    * @param token string
    * @param channelStr string
    * @param topicStr string || undefined || null
    * @returns boolean
    */
    off (token, channelStr, topicStr) {
        var channel;
        if ( this.noChannel(channelStr) ) {
            return false;
        }

        channel = this.channels[channelStr];
        return channel.off(token, topicStr);
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

    getChannel(channelStr) {
        var channel;
        if(this.noChannel(channelStr)) {
            return false;
        } else {
            channel = this.channels[channelStr];
        }

        return channel;
    }

    noChannel (channelStr) {
        return channelStr == null || !this.channels.hasOwnProperty(channelStr);
    }
}

export class Channel {
    constructor (channelName) {
        this.channelName = channelName;
        this.topics = {};
        this.defaultTopic = 'main';
        this.subUid = -1;
    }

    /**
    * @description
    * Broadcast a message to a channel's topic(s)
    *
    * @param topicStr string || undefined || null
    * @param data object or literal
    * @returns boolean
    */
    broadcast (topicStr, data) {
        var _self = this;

        // If an invalid topic value is passed return false
        // undefined and null values should not return false.
        if(this.noTopic(topicStr) && topicStr != null) {
            return false;
        }

        // if null or undefined was passed
        // broadcasts to all topics in this channel.
        if ( topicStr == null ) {
            Object.keys(this.topics).forEach( (topic) => {
                this.topics[topic].forEach(updateTopic);
            });
        } else {
            this.topics[topicStr].forEach(updateTopic);
        }

        return true;

        // iterator function
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

    /**
    * @description
    * Attach a channel listener.
    *
    * @param topicStr string || undefined || null
    * @param listenerFunc function
    * @param context object
    * @returns token string
    */
    on (topicStr, listenerFunc, context=null) {
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

    /**
    * @description
    * Remove a channel listener.
    *
    * @param token string || undefined || null
    * @param topicStr string || undefined || null
    * @returns boolean
    */
    off (token, topicStr) {
        var topic,
            removeAll  = false,
            tokenFound = false;

        if ( this.noTopic(topicStr) && topicStr != null) {
            return false;
        }

        if (token == null) {
            removeAll = true;
        }

        if (topicStr == null) {
            Object.keys(this.topics).forEach( (topicKey)=> {
                topic = this.topics[topicKey];
                if (removeAll) {
                    topic = [];
                } else {
                    topic.forEach(removeTopic);
                }
            });
        } else {
            topic = this.topics[topicStr];
            if (removeAll) {
                topic = [];
            } else {
                topic.forEach(removeTopic);
            }
        }

        // If a token was found returns true,
        // if no token found, but removeAll is true returns true
        // returns false if no token and removeAll is false.
        return tokenFound || removeAll;

        function removeTopic (topicObj, index, array) {
            if(topicObj.token === token) {
                topic.splice(index, 1);
                tokenFound = true;
            }
        }
    }

    noTopic (topicStr) {
        return topicStr == null || !this.topics.hasOwnProperty(topicStr);
    }
}

export default Events;
