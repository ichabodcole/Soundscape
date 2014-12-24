(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var $___46__46__47_soundscape_47_property_45_controls_47_graph_45_control__,
    $___46__46__47_soundscape_47_services_47_timer__;
var $__0 = ($___46__46__47_soundscape_47_property_45_controls_47_graph_45_control__ = require("../soundscape/property-controls/graph-control"), $___46__46__47_soundscape_47_property_45_controls_47_graph_45_control__ && $___46__46__47_soundscape_47_property_45_controls_47_graph_45_control__.__esModule && $___46__46__47_soundscape_47_property_45_controls_47_graph_45_control__ || {default: $___46__46__47_soundscape_47_property_45_controls_47_graph_45_control__}),
    GraphControl = $__0.GraphControl,
    GraphControlProvider = $__0.GraphControlProvider;
var $__1 = ($___46__46__47_soundscape_47_services_47_timer__ = require("../soundscape/services/timer"), $___46__46__47_soundscape_47_services_47_timer__ && $___46__46__47_soundscape_47_services_47_timer__.__esModule && $___46__46__47_soundscape_47_services_47_timer__ || {default: $___46__46__47_soundscape_47_services_47_timer__}),
    TimerProvider = $__1.TimerProvider,
    Timer = $__1.Timer;
var points = [{
  type: 0,
  t: 0,
  v: 0.45
}, {
  type: 0,
  t: 0.05,
  v: 0.25
}, {
  type: 0,
  t: 0.15,
  v: 0.25
}, {
  type: 0,
  t: 0.25,
  v: 0.65
}, {
  type: 0,
  t: 0.35,
  v: 0.55
}, {
  type: 0,
  t: 0.5,
  v: 0.7
}, {
  type: 0,
  t: 0.65,
  v: 0.35
}, {
  type: 0,
  t: 0.75,
  v: 0.45
}, {
  type: 0,
  t: 1,
  v: 0.25
}];
var timer = TimerProvider.get();
var gc = GraphControlProvider.get({
  propertyName: 'volume',
  points: points
});
gc.on(GraphControl.VALUE_CHANGE, (function(e, value) {
  console.log('Graph Value:', value);
}));
timer.interval = 50;
timer.playTime = 10000;
timer.on(Timer.STOP, function(e) {
  console.log('Timer:STOP');
});
timer.on(Timer.COMPLETE, function(e) {
  console.log('Timer:COMPLETE');
});
timer.on(Timer.TICK, function(e, data) {
  gc.valueAtTime(data.epsilon);
});
timer.start();


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/examples/app.js
},{"../soundscape/property-controls/graph-control":4,"../soundscape/services/timer":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Interpolation: {get: function() {
      return Interpolation;
    }},
  __esModule: {value: true}
});
var Interpolation = {
  linear: function(t, p0, p1) {
    return p0 * (1 - t) + p1 * t;
  },
  cubic: function(t, p0, p1, p2, p3) {
    var a = Math.pow(t, 3),
        b = 3 * Math.pow(t, 2) * (1 - t),
        c = 3 * t * Math.pow(1 - t, 2),
        d = Math.pow(1 - t, 3);
    return (p0 * a + p1 * b + p2 * c + p3 * d);
  },
  smoothStep: function(t, p0, p1) {
    t = t * t * (3 - 2 * t);
    return p0 * (1 - t) + p1 * t;
  },
  median: function(p0, p1) {
    return (p0 - p1) / 2 + p0;
  }
};


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/soundscape/common/math.js
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47_services_47_events__;
var Events = ($___46__46__47_services_47_events__ = require("../services/events"), $___46__46__47_services_47_events__ && $___46__46__47_services_47_events__.__esModule && $___46__46__47_services_47_events__ || {default: $___46__46__47_services_47_events__}).default;
var BaseControl = function BaseControl(controlName, config) {
  var model = arguments[2] !== (void 0) ? arguments[2] : {};
  this.controlName = controlName;
  this.events = this.validateEvents(config);
  this.model = this.validateModel(model);
  this.validEvents = [$BaseControl.VALUE_CHANGE];
};
var $BaseControl = BaseControl;
($traceurRuntime.createClass)(BaseControl, {
  handleError: function(errorMessage) {
    throw new Error(this.controlName + ': ' + errorMessage);
  },
  validateEvents: function(config) {
    if (config.events instanceof Object) {
      return config.events;
    } else {
      this.handleError('config object must have an events attribute set to an Events instance');
    }
  },
  validateModel: function(model) {
    if (model.propertyName && typeof model.propertyName === 'string') {
      return model;
    } else {
      this.handleError('model object must have a propertyName attribute defined');
    }
  },
  on: function(eventName, func) {
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    if (this.validEvents.indexOf(eventName) !== -1) {
      return this.events.on(eventName, func, context);
    } else {
      this.handleError(("attempting to listen to invalid event: " + eventName));
    }
  },
  off: function(token, eventName) {
    this.events.off(token, eventName);
  },
  get propertyName() {
    return this.model.propertyName;
  },
  get value() {
    return this.model.value;
  },
  set value(valueInt) {
    if (typeof valueInt === 'number') {
      this.model.value = valueInt;
      this.events.broadcast($BaseControl.VALUE_CHANGE, valueInt);
    }
  }
}, {});
BaseControl.VALUE_CHANGE = 'value_change';
var $__default = BaseControl;


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/soundscape/property-controls/base-control.js
},{"../services/events":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  GraphControl: {get: function() {
      return GraphControl;
    }},
  GraphControlProvider: {get: function() {
      return GraphControlProvider;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__base_45_control__,
    $___46__46__47_services_47_events__,
    $___46__46__47_common_47_math__;
var BaseControl = ($__base_45_control__ = require("./base-control"), $__base_45_control__ && $__base_45_control__.__esModule && $__base_45_control__ || {default: $__base_45_control__}).default;
var Events = ($___46__46__47_services_47_events__ = require("../services/events"), $___46__46__47_services_47_events__ && $___46__46__47_services_47_events__.__esModule && $___46__46__47_services_47_events__ || {default: $___46__46__47_services_47_events__}).default;
var Interpolation = ($___46__46__47_common_47_math__ = require("../common/math"), $___46__46__47_common_47_math__ && $___46__46__47_common_47_math__.__esModule && $___46__46__47_common_47_math__ || {default: $___46__46__47_common_47_math__}).Interpolation;
var GraphControl = function GraphControl(config) {
  var model = arguments[1] !== (void 0) ? arguments[1] : {};
  $traceurRuntime.superConstructor($GraphControl).call(this, 'GraphControl', config, model);
  this.sortPointsByTime();
  this.validEvents.push($GraphControl.ADD_POINTS, $GraphControl.REMOVE_POINT);
};
var $GraphControl = GraphControl;
($traceurRuntime.createClass)(GraphControl, {
  addPoints: function(pointsObj) {
    if (!Array.isArray(pointsObj) && !(pointsObj instanceof Object)) {
      return false;
    }
    if (Array.isArray(pointsObj)) {
      this.points = this.points.concat(pointsObj);
    } else if (pointsObj instanceof Object) {
      this.points.push(pointsObj);
      this.sortPointsByTime();
    }
    this.events.broadcast($GraphControl.ADD_POINTS, this.points);
    return this.points;
  },
  removePoint: function(pointIndex) {
    if (typeof pointIndex === 'number' && pointIndex > 0 && pointIndex < this.points.length - 1) {
      this.points.splice(pointIndex, 1);
      this.events.broadcast($GraphControl.REMOVE_POINT, this.points);
      return this.points;
    }
  },
  sortPointsByTime: function() {
    this.points.sort(function(a, b) {
      return a.t - b.t;
    });
    return this.points;
  },
  findPointsByTime: function(t) {
    var endIndex = null,
        startIndex = null,
        pointsTotal = this.points.length,
        lastIndex = pointsTotal - 1;
    for (var i = 0; i < pointsTotal; i++) {
      var point = this.points[i];
      if (point.t > t) {
        startIndex = i - 1;
        endIndex = i;
        break;
      } else if (i === lastIndex) {
        startIndex = i - 1;
        endIndex = i;
        break;
      } else if (point.t === t) {
        startIndex = i;
        endIndex = i + 1;
        break;
      }
    }
    if (startIndex !== null && endIndex !== null) {
      return [this.points[startIndex], this.points[endIndex]];
    }
  },
  valueAtTime: function(t) {
    var points = this.findPointsByTime(t),
        p1 = points[0],
        p2 = points[1];
    var st = t - p1.t;
    var lpt = (1 / (p2.t - p1.t)) * st;
    this.value = Math.round(Interpolation.smoothStep(lpt, p1.v, p2.v) * 1000) / 1000;
    return this.value;
  },
  get points() {
    return this.model.points;
  },
  set points(pointsArray) {
    this.model.points = pointsArray;
    this.sortPointsByTime();
  }
}, {}, BaseControl);
GraphControl.ADD_POINTS = 'add_points';
GraphControl.REMOVE_POINT = 'remove_point';
var GraphControlProvider = {get: function(model) {
    var config = {events: new Events().setChannel('graphControl')};
    return new GraphControl(config, model);
  }};
var $__default = GraphControl;


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/soundscape/property-controls/graph-control.js
},{"../common/math":2,"../services/events":5,"./base-control":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Events: {get: function() {
      return Events;
    }},
  Channel: {get: function() {
      return Channel;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var Events = function Events() {
  this.channels = {};
  return this;
};
($traceurRuntime.createClass)(Events, {
  broadcast: function(channelStr, topicStr, data) {
    var channel;
    if (this.noChannel(channelStr)) {
      return false;
    }
    channel = this.channels[channelStr];
    return channel.broadcast(topicStr, data);
  },
  on: function(channelStr, topicStr, listenerFunc) {
    var context = arguments[3] !== (void 0) ? arguments[3] : null;
    var channel;
    channel = this.setChannel(channelStr);
    return channel.on(topicStr, listenerFunc, context);
  },
  off: function(token, channelStr, topicStr) {
    var channel;
    if (this.noChannel(channelStr)) {
      return false;
    }
    channel = this.channels[channelStr];
    return channel.off(token, topicStr);
  },
  setChannel: function(channelStr) {
    var channel;
    if (this.noChannel(channelStr)) {
      channel = new Channel(channelStr);
      this.channels[channelStr] = channel;
    } else {
      channel = this.channels[channelStr];
    }
    return channel;
  },
  getChannel: function(channelStr) {
    var channel;
    if (this.noChannel(channelStr)) {
      return false;
    } else {
      channel = this.channels[channelStr];
    }
    return channel;
  },
  noChannel: function(channelStr) {
    return channelStr == null || !this.channels.hasOwnProperty(channelStr);
  }
}, {});
var Channel = function Channel(channelName) {
  this.channelName = channelName;
  this.topics = {};
  this.defaultTopic = 'main';
  this.subUid = -1;
};
($traceurRuntime.createClass)(Channel, {
  broadcast: function(topicStr, data) {
    var $__0 = this;
    var _self = this;
    if (this.noTopic(topicStr) && topicStr != null) {
      return false;
    }
    if (topicStr == null) {
      Object.keys(this.topics).forEach((function(topic) {
        $__0.topics[topic].forEach(updateTopic);
      }));
    } else {
      this.topics[topicStr].forEach(updateTopic);
    }
    return true;
    function updateTopic(topicObj, index, array) {
      var evt = {
        channel: _self.channelName,
        topic: topicObj.topic,
        func: topicObj.func,
        context: topicObj.context
      };
      topicObj.func.call(topicObj.context, evt, data);
    }
  },
  on: function(topicStr, listenerFunc) {
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    var token,
        topicObj;
    if (this.noTopic(topicStr)) {
      this.topics[topicStr] = [];
    }
    token = (++this.subUid).toString();
    topicObj = {
      token: token,
      topic: topicStr,
      context: context,
      func: listenerFunc
    };
    this.topics[topicStr].push(topicObj);
    return token;
  },
  off: function(token, topicStr) {
    var $__0 = this;
    var topic,
        removeAll = false,
        tokenFound = false;
    if (this.noTopic(topicStr) && topicStr != null) {
      return false;
    }
    if (token == null) {
      removeAll = true;
    }
    if (topicStr == null) {
      Object.keys(this.topics).forEach((function(topicKey) {
        topic = $__0.topics[topicKey];
        if (removeAll) {
          topic = [];
        } else {
          topic.forEach(removeTopic);
        }
      }));
    } else {
      topic = this.topics[topicStr];
      if (removeAll) {
        topic = [];
      } else {
        topic.forEach(removeTopic);
      }
    }
    return tokenFound || removeAll;
    function removeTopic(topicObj, index, array) {
      if (topicObj.token === token) {
        topic.splice(index, 1);
        tokenFound = true;
      }
    }
  },
  noTopic: function(topicStr) {
    return topicStr == null || !this.topics.hasOwnProperty(topicStr);
  }
}, {});
var $__default = Events;


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/soundscape/services/events.js
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Ticker: {get: function() {
      return Ticker;
    }},
  TickerProvider: {get: function() {
      return TickerProvider;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__events__;
var Events = ($__events__ = require("./events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var Ticker = function Ticker() {
  var config = arguments[0] !== (void 0) ? arguments[0] : {};
  this.events = config.events;
  this.model = {};
  this.validEvents = [$Ticker.TICK, $Ticker.START, $Ticker.STOP];
  this.tickInterval = null;
  this.interval = config.interval;
  this.state = $Ticker.STOPPED;
};
var $Ticker = Ticker;
($traceurRuntime.createClass)(Ticker, {
  start: function() {
    this.state = $Ticker.TICKING;
    this.createInterval();
    this.events.broadcast($Ticker.START);
  },
  stop: function() {
    this.state = $Ticker.STOPPED;
    this.destroyInterval();
    this.events.broadcast($Ticker.STOP);
  },
  tick: function() {
    this.events.broadcast($Ticker.TICK);
  },
  createInterval: function() {
    this.destroyInterval();
    this.tickInterval = setInterval(this.tick.bind(this), this.interval);
  },
  destroyInterval: function() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  },
  on: function(eventName, fn) {
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    if (this.validEvents.indexOf(eventName) !== -1) {
      var token = this.events.on(eventName, fn, context);
      return token;
    } else {
      throw new Error('Unknown event type: ' + eventName);
    }
  },
  off: function(token, eventName) {
    this.events.off(token, eventName);
  },
  set interval(milliseconds) {
    this.model.interval = milliseconds;
    if (this.state === $Ticker.TICKING) {
      this.createInterval();
    }
  },
  get interval() {
    return this.model.interval;
  },
  set state(state) {
    this.model.state = state;
  },
  get state() {
    return this.model.state;
  }
}, {});
Ticker.TICK = 'tick';
Ticker.START = 'start';
Ticker.STOP = 'stop';
Ticker.STOPPED = 'stopped';
Ticker.TICKING = 'ticking';
var TickerProvider = {get: function() {
    var config = arguments[0] !== (void 0) ? arguments[0] : {};
    config.events = config.events || new Events().setChannel('ticker');
    config.interval = config.interval || 50;
    return new Ticker(config);
  }};
var $__default = Ticker;


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/soundscape/services/ticker.js
},{"./events":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Timer: {get: function() {
      return Timer;
    }},
  TimerProvider: {get: function() {
      return TimerProvider;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__events__,
    $__ticker__;
var Events = ($__events__ = require("./events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var Ticker = ($__ticker__ = require("./ticker"), $__ticker__ && $__ticker__.__esModule && $__ticker__ || {default: $__ticker__}).default;
var Timer = function Timer(config) {
  var model = arguments[1] !== (void 0) ? arguments[1] : {};
  $traceurRuntime.superConstructor($Timer).call(this, config);
  this.validEvents = [$Timer.TICK, $Timer.START, $Timer.STOP, $Timer.PAUSE, $Timer.COMPLETE];
  this.timeAtPause = 0;
  this.model = Object.assign({}, model);
  this.model.state = $Timer.STOPPED;
  this.model.startTime = null;
  this.model.currentTime = this.model.currentTime || null;
  this.model.epsilon = this.model.epsilon || null;
  this.model.playTime = this.model.playTime || null;
  this.interval = config.interval;
};
var $Timer = Timer;
($traceurRuntime.createClass)(Timer, {
  start: function() {
    if (this.state !== $Timer.TICKING) {
      if (this.playTime > 0 && this.playTime != null) {
        this.state = $Timer.TICKING;
        this.createInterval();
        this.events.broadcast($Timer.START);
        this.startTime = Date.now();
        this.timeAtPause = 0;
      } else {
        throw new Error('Timer: valid playTime must be set before calling start');
      }
    }
  },
  pause: function() {
    if (this.state === $Timer.TICKING) {
      this.state = $Timer.PAUSED;
      this.timeAtPause = this.currentTime;
      this.destroyInterval();
      this.events.broadcast($Timer.PAUSE);
    } else if (this.state === $Timer.PAUSED) {
      this.start();
    }
  },
  stop: function() {
    this.state = $Timer.STOPPED;
    this.destroyInterval();
    this.events.broadcast($Timer.STOP);
    this.timeAtPause = 0;
  },
  tick: function() {
    var data;
    var now = Date.now();
    var currentTime = (now - this.startTime);
    if (currentTime >= this.playTime) {
      this.stop();
      data = {
        playTime: this.playTime,
        currentTime: this.playTime,
        epsilon: 1
      };
      this.events.broadcast($Timer.COMPLETE);
      this.events.broadcast($Timer.TICK, data);
    } else {
      this.currentTime = currentTime;
      this.epsilon = (1 / this.playTime) * this.currentTime;
      data = {
        playTime: this.playTime,
        currentTime: this.currentTime,
        epsilon: this.epsilon
      };
      this.events.broadcast($Timer.TICK, data);
    }
  },
  set state(state) {
    this.model.state = state;
  },
  get state() {
    return this.model.state;
  },
  set startTime(milliseconds) {
    this.model.startTime = milliseconds - this.timeAtPause;
  },
  get startTime() {
    return this.model.startTime;
  },
  set playTime(milliseconds) {
    if (milliseconds > 0) {
      this.model.playTime = milliseconds;
    } else {
      throw new Error(("Timer: playTime (" + milliseconds + ") must be greater than 0"));
    }
  },
  get playTime() {
    return this.model.playTime;
  },
  set currentTime(milliseconds) {
    if (milliseconds >= 0) {
      if (milliseconds <= this.playTime) {
        this.model.currentTime = milliseconds;
      } else {
        throw (new Error(("Timer: currentTime (" + milliseconds + ") cannot be greater than playTime (" + this.playTime + ")")));
      }
    } else {
      throw (new Error(("Timer: currentTime (" + milliseconds + ") cannot be less than 0")));
    }
  },
  get currentTime() {
    return this.model.currentTime;
  },
  set epsilon(epsilon) {
    if (epsilon >= 0 && epsilon <= 1) {
      this.model.epsilon = epsilon;
    } else {
      throw new Error(("Timer: epsilon value (" + epsilon + ") must be between 0 and 1"));
    }
  },
  get epsilon() {
    return this.model.epsilon;
  }
}, {}, Ticker);
Timer.PAUSE = 'pause';
Timer.COMPLETE = 'complete';
Timer.PAUSED = 'paused';
var TimerProvider = {get: function() {
    var config = arguments[0] !== (void 0) ? arguments[0] : {};
    var model = arguments[1] !== (void 0) ? arguments[1] : {};
    config.events = config.events || new Events().setChannel('timer');
    config.interval = config.interval || 50;
    return new Timer(config, model);
  }};
var $__default = Timer;


//# sourceURL=/home/ichabodcole/Dropbox/Projects/Code/JS/BrainbeatsEngine/src/soundscape/services/timer.js
},{"./events":5,"./ticker":6}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvZXhhbXBsZXMvYXBwLmpzIiwiL2hvbWUvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvY29tbW9uL21hdGguanMiLCIvaG9tZS9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvc291bmRzY2FwZS9wcm9wZXJ0eS1jb250cm9scy9iYXNlLWNvbnRyb2wuanMiLCIvaG9tZS9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvc291bmRzY2FwZS9wcm9wZXJ0eS1jb250cm9scy9ncmFwaC1jb250cm9sLmpzIiwiL2hvbWUvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvc2VydmljZXMvZXZlbnRzLmpzIiwiL2hvbWUvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvc2VydmljZXMvdGlja2VyLmpzIiwiL2hvbWUvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvc2VydmljZXMvdGltZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNLQTs7O1NBTEEsRUFBQyx5RUFBb0IsQ0FBQSxPQUFNLEFBQUMsaURBQWtCLENBQ3RDLENBQUEsMEVBQXFCLG1GQUEyQixDQUFBLDBFQUFxQixHQUFLLEVBQUMsT0FBTSx5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Q0FBQztFQUNuQyxDQUNKLENBQUE7QUFqS0EsQUFBSSxFQUFBLENBQUEsVUFBUyxFQW1LRSxNQW5La0IsQUFtS2QsQ0FuS2M7QUFvS2pDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGltcG9ydCBTb3VuZE1vZHVsZSBmcm9tICcuLi8uLi9zb3VuZHNjYXBlL21vZHVsZXMvc291bmQtbW9kdWxlJztcbi8vIHZhciBzY3AgPSBTb3VuZHNjYXBlRmFjdG9yeS5jcmVhdGUoKTtcblxuLy8gaW1wb3J0IHsgRm9sbG93Q29udHJvbCwgRm9sbG93Q29udHJvbFByb3ZpZGVyIH0gZnJvbSAnLi4vc291bmRzY2FwZS9wcm9wZXJ0eS1jb250cm9scy9mb2xsb3ctY29udHJvbCc7XG4vLyBpbXBvcnQgeyBSYW5nZUNvbnRyb2wsIFJhbmdlQ29udHJvbFByb3ZpZGVyIH0gZnJvbSAnLi4vc291bmRzY2FwZS9wcm9wZXJ0eS1jb250cm9scy9yYW5nZS1jb250cm9sJztcbmltcG9ydCB7IEdyYXBoQ29udHJvbCwgR3JhcGhDb250cm9sUHJvdmlkZXIgfSBmcm9tICcuLi9zb3VuZHNjYXBlL3Byb3BlcnR5LWNvbnRyb2xzL2dyYXBoLWNvbnRyb2wnO1xuXG4vL2ltcG9ydCB7IEludGVycG9sYXRpb24gfSBmcm9tICcuLi9zb3VuZHNjYXBlL2NvbW1vbi9tYXRoJztcbmltcG9ydCB7IFRpbWVyUHJvdmlkZXIsIFRpbWVyIH0gZnJvbSAnLi4vc291bmRzY2FwZS9zZXJ2aWNlcy90aW1lcic7XG5cbi8vIEludGVycG9sYXRpb24uY3ViaWModCwgcDEsIGNwMSwgY3AyLCBwMik7XG5cbi8vIHZhciBwMSA9IHsgeDowLCB5OjAuMjUgfTtcbi8vIHZhciBwMiA9IHsgeDoxLCB5OjAuNzUgfTtcblxuLy8gdmFyIGludGVycFBvaW50cyA9IFtdO1xuXG4vLyBmb3IodmFyIGk9MDsgaTw9MTAwOyBpKz01KSB7XG4vLyAgICAgdmFyIHQgPSBNYXRoLnJvdW5kKGkpIC8gMTAwO1xuXG4vLyAgICAgdmFyIG1lZGlhblggPSAoKHAyLnggLSBwMS54KSAvIDIpICsgcDEueDtcblxuLy8gICAgIHZhciBjcDEgPSB7IHg6IG1lZGlhblgsIHk6IHAxLnl9O1xuLy8gICAgIHZhciBjcDIgPSB7IHg6IG1lZGlhblgrMC41LCB5OiBwMi55fTtcblxuLy8gICAgIHZhciB4ID0gSW50ZXJwb2xhdGlvbi5jdWJpYyh0LCBwMS54LCBjcDEueCwgY3AyLngsIHAyLngpO1xuLy8gICAgIHZhciB5ID0gSW50ZXJwb2xhdGlvbi5jdWJpYyh0LCBwMS55LCBjcDEueSwgY3AyLnksIHAyLnkpO1xuLy8gICAgIGludGVycFBvaW50cy51bnNoaWZ0KFt4LCB5XSk7XG4vLyB9XG5cbi8vIC8vIGludGVycFBvaW50cy51bnNoaWZ0KFtjcDEueCwgY3AxLnldLCBbY3AyLngsIGNwMi55XSk7XG52YXIgcG9pbnRzID0gW1xuICAgICAgICB7IHR5cGU6MCwgdDowLCB2OjAuNDUgfSxcbiAgICAgICAgeyB0eXBlOjAsIHQ6MC4wNSwgdjowLjI1IH0sXG4gICAgICAgIHsgdHlwZTowLCB0OjAuMTUsIHY6MC4yNSB9LFxuICAgICAgICB7IHR5cGU6MCwgdDowLjI1LCB2OjAuNjUgfSxcbiAgICAgICAgeyB0eXBlOjAsIHQ6MC4zNSwgdjowLjU1IH0sXG4gICAgICAgIHsgdHlwZTowLCB0OjAuNSwgdjowLjcgfSxcbiAgICAgICAgeyB0eXBlOjAsIHQ6MC42NSwgdjowLjM1IH0sXG4gICAgICAgIHsgdHlwZTowLCB0OjAuNzUsIHY6MC40NSB9LFxuICAgICAgICB7IHR5cGU6MCwgdDoxLCB2OjAuMjUgfVxuICAgIF07XG5cbnZhciB0aW1lciA9IFRpbWVyUHJvdmlkZXIuZ2V0KCk7XG5cbnZhciBnYyA9IEdyYXBoQ29udHJvbFByb3ZpZGVyLmdldCh7XG4gICAgcHJvcGVydHlOYW1lOiAndm9sdW1lJyxcbiAgICBwb2ludHM6IHBvaW50c1xufSk7XG5cbmdjLm9uKEdyYXBoQ29udHJvbC5WQUxVRV9DSEFOR0UsIChlLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdHcmFwaCBWYWx1ZTonLCB2YWx1ZSk7XG59KTtcblxudGltZXIuaW50ZXJ2YWwgPSA1MDtcbnRpbWVyLnBsYXlUaW1lID0gMTAwMDA7XG5cbnRpbWVyLm9uKFRpbWVyLlNUT1AsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZygnVGltZXI6U1RPUCcpO1xufSlcblxudGltZXIub24oVGltZXIuQ09NUExFVEUsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZygnVGltZXI6Q09NUExFVEUnKTtcbn0pO1xuXG50aW1lci5vbihUaW1lci5USUNLLCAgZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgIC8vY29uc29sZS5sb2coZGF0YS5wbGF5VGltZSwgZGF0YS5jdXJyZW50VGltZSwgZGF0YS5lcHNpbG9uKTtcbiAgICBnYy52YWx1ZUF0VGltZShkYXRhLmVwc2lsb24pO1xufSk7XG5cbnRpbWVyLnN0YXJ0KCk7XG5cbi8vIHZhciBjaGFydERhdGFJbnRycCA9IFtdO1xuXG4vLyB2YXIgbiA9ICA2MDtcblxuLy8gZm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4vLyAgICAgdmFyIHQgPSBpL247XG4vLyAgICAgY2hhcnREYXRhSW50cnAucHVzaChbdCwgZ2MudmFsdWVBdFRpbWUodCldKTtcbi8vIH1cblxuLy8gdmFyIGNoYXJ0RGF0YUlucHV0ID0gcG9pbnRzLm1hcCggKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4vLyAgICAgcmV0dXJuIFtlbGVtZW50LnQsIGVsZW1lbnQudl07XG4vLyB9KTtcblxuLy8gdmFyIGNoYXJ0T3B0aW9uc0lucHV0ID0ge1xuLy8gICAgIGNoYXJ0OiB7XG4vLyAgICAgICAgIHJlbmRlclRvOidpbnB1dGNoYXJ0Jyxcbi8vICAgICAgICAgdHlwZTogJ2xpbmUnXG4vLyAgICAgfSxcbi8vICAgICB0aXRsZToge1xuLy8gICAgICAgICB0ZXh0OiAnR3JhcGggSW5wdXQgUG9pbnRzJ1xuLy8gICAgIH0sXG4vLyAgICAgc2VyaWVzOiBbXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIG5hbWU6ICdJbnB1dCBQb2ludHMnLFxuLy8gICAgICAgICAgICAgZGF0YTogaW50ZXJwUG9pbnRzXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIC8vIHtcbi8vICAgICAgICAgLy8gICAgIG5hbWU6ICdJbnRlcnBvbGF0ZWQgUG9pbnQnLFxuLy8gICAgICAgICAvLyAgICAgZGF0YTogY2hhcnREYXRhSW50cnBcbi8vICAgICAgICAgLy8gfVxuLy8gICAgIF1cbi8vIH1cblxuLy8gdmFyIGNoYXJ0T3B0aW9uc0ludHJwID0ge1xuLy8gICAgIGNoYXJ0OiB7XG4vLyAgICAgICAgIHJlbmRlclRvOidpbnRycGNoYXJ0Jyxcbi8vICAgICAgICAgdHlwZTogJ2xpbmUnXG4vLyAgICAgfSxcbi8vICAgICB0aXRsZToge1xuLy8gICAgICAgICB0ZXh0OiAnR3JhcGggSW50ZXJwb2xhdGVkIFBvaW50cydcbi8vICAgICB9LFxuLy8gICAgIHNlcmllczogW1xuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICBuYW1lOiAnSW50ZXJwb2xhdGVkIFBvaW50Jyxcbi8vICAgICAgICAgICAgIGRhdGE6IGNoYXJ0RGF0YUludHJwXG4vLyAgICAgICAgIH1cbi8vICAgICBdXG4vLyB9XG5cblxuLy8gdmFyIGlucHV0Q2hhcnQgPSBuZXcgSGlnaGNoYXJ0cy5DaGFydChjaGFydE9wdGlvbnNJbnB1dCk7XG4vLyB2YXIgaW50cnBDaGFydCA9IG5ldyBIaWdoY2hhcnRzLkNoYXJ0KGNoYXJ0T3B0aW9uc0ludHJwKTtcblxuLy8gdmFyIGZjID0gRm9sbG93Q29udHJvbFByb3ZpZGVyLmdldCh7XG4vLyAgICAgcHJvcGVydHlOYW1lOiAndm9sdW1lJ1xuLy8gfSk7XG5cbi8vIHZhciByYyA9IFJhbmdlQ29udHJvbFByb3ZpZGVyLmdldCh7XG4vLyAgICAgcHJvcGVydHlOYW1lOiAndm9sdW1lJ1xuLy8gfSk7XG5cbi8vIHJjLm9uKFJhbmdlQ29udHJvbC5WQUxVRV9DSEFOR0UsIChlLCB2YWx1ZSk9PiB7XG4vLyAgICAgY29uc29sZS5sb2coJ1JhbmdlJywgdmFsdWUpO1xuLy8gfSwgdGhpcyk7XG5cbi8vIGZjLnRhcmdldCA9IHJjO1xuLy8gZmMuc3RhcnQoKTtcblxuLy8gZmMub24oRm9sbG93Q29udHJvbC5WQUxVRV9DSEFOR0UsIChlLCB2YWx1ZSk9PiB7XG4vLyAgICAgY29uc29sZS5sb2coJ0ZvbGxvd2luZycsIHZhbHVlKTtcbi8vIH0pO1xuXG4vLyByYy52YWx1ZSA9IDAuODg7XG4vLyByYy52YWx1ZSA9IDAuMjU7XG5cblxuLy8gZ2MgPSBuZXcgR3JhcGhDb250cm9sUHJvdmlkZXIobW9kZWwpO1xuLy8gZ2MuYWRkUG9pbnQoeyB0eXBlOiAwLCBjb29yZHM6IFt0aW1lLCBhbXBdIH0pO1xuLy8gZ2Muc3RhcnQoKTtcbi8vIGdjLm9uKEdyYXBoQ29udHJvbC5WQUxVRV9DSEFOR0UsIGRvVGhpcywgdGhpcyk7XG5cbi8vICQuYWpheCgnZGF0YS9zb3VuZHNjYXBlLmpzb24nKS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgLy8gc2NwLnBhcnNlSnNvbihkYXRhKTtcbiAgICAvLyBzY3AucGxheSgpO1xuICAgIC8vIHNjcC5hZGRTb3VuZE1vZHVsZSh7dHlwZTogJ2JpbmF1cmFsLWJlYXQtbW9kdWxlJ30pO1xuICAgIC8vIHZhciBtb2R1bGVJZHMgPSBzY3Auc291bmRNb2R1bGVJZHM7XG4gICAgLy8gLy8gc2NwLmdldFNvdW5kTW9kdWxlSWRzQnlQcm9wZXJ0eSgndm9sdW1lJyk7XG4gICAgLy8gY29uc29sZS5sb2cobW9kdWxlSWRzKTtcbiAgICAvLyB2YXIgc20gPSBzY3AuZ2V0U291bmRNb2R1bGVCeUlkKG1vZHVsZUlkc1swXSk7XG4gICAgLy8gc20gPSBzY3AuYWRkU291bmRNb2R1bGUoXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIHR5cGU6ICdiaW5hdXJhbC1iZWF0LW1vZHVsZScsXG4gICAgLy8gICAgICAgICBwaXRjaDoge1xuICAgIC8vICAgICAgICAgICAgIHZhbHVlOiAyNDBcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gc20uc29sbyA9IGZhbHNlO1xuICAgIC8vIHNtLnZvbHVtZS5mb2xsb3dJZCA9XG4gICAgLy8gc20udm9sdW1lLmZvbGxvd01vZHVsZUlkID0gXCIyNDg5MmJlNy1kMmM4LTQyMzQtODFjZS01YmY2NjJkM2UwOTBcIjtcbiAgICAvLyBjb25zb2xlLmxvZyhzbS52b2x1bWUpO1xuICAgIC8vIHNtLmdldFByb3BlcnR5QnlOYW1lKCd2b2x1bWUnKTtcbiAgICAvLyBzbS5zZXRQcm9wZXJ0eSgndm9sdW1lJywge30pO1xuICAgIC8vIHNtLmZvbGxvd01vZHVsZVByb3BlcnR5KG1vZHVsZUlkLCBwcm9wZXJ0eSk7XG4gICAgLy8gc20udm9sdW1lQ29udHJvbC5mb2xsb3dNb2R1bGUobW9kdWxlSWQpO1xuICAgIC8vIHNtLnZvbHVtZS5mb2xsb3dNb2R1bGUoc20yKTtcblxuICAgIC8vIHNtID0gbmV3IFNvdW5kTW9kdWxlKCk7XG4gICAgLy8gcGMub24oJ3ZhbHVlQ2hhbmdlJylcbiAgICAvLyB0aGlzLnZvbHVtZSA9IG5ldyBQcm9wZXJ0eUNvbnRyb2woKVxuICAgIC8vIHRoaXMudm9sdW1lLm9uKCd2YWx1ZVVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5nYWluLmdhaW4udmFsdWUgPSB2YWx1ZTtcbiAgICAvLyB9KVxuICAgIC8vIHRoaXMudm9sdW1lLm9uVmFsdWVVcGRhdGUoZnVuY3Rpb24oKXt9KVxuICAgIC8vIHRoaXMudm9sdW1lLm9uKE11bHRpQ29udHJvbFByb3BlcnR5LkNPTlRST0xfVFlQRV9DSEFOR0UsIGZ1bmMpXG4gICAgLy8gc20udm9sdW1lLnByb3BlcnR5Q29udHJvbCA9IG5ldyBSYW5nZVByb3BlcnR5KCk7XG4gICAgLy8gc20udm9sdW1lID0gbmV3IE11bHRpQ29udHJvbFByb3BlcnR5KCk7XG4gICAgLyogYSA9IGI7IGIgPSBjOyBjID0gYTtcbiAgICBvYyA9IG5ldyBPbW5pQ29udHJvbFByb3ZpZGVyKG1vZGVsKTtcbiAgICByYyA9IG5ldyBSYW5nZUNvbnRyb2xQcm92aWRlcihtb2RlbCk7XG4gICAgZmMgPSBuZXcgRm9sbG93Q29udHJvbFByb3ZpZGVyKG1vZGVsKTtcbiAgICBmYy50YXJnZXQgPSByYztcbiAgICBmYy5vbihGb2xsb3dDb250cm9sLlZBTFVFX0NIQU5HRSwgc29tZUZ1bmMsIHRoaXMpO1xufSk7XG4iLCJleHBvcnQgdmFyIEludGVycG9sYXRpb24gPSB7XG4gICAgbGluZWFyOiBmdW5jdGlvbiAodCwgcDAsIHAxKSB7XG4gICAgICAgIHJldHVybiBwMCAqICggMSAtIHQgKSArIHAxICogdDtcbiAgICB9LFxuXG4gICAgY3ViaWM6IGZ1bmN0aW9uICh0LCBwMCwgcDEsIHAyLCBwMykge1xuICAgICAgICB2YXIgYSA9IE1hdGgucG93KHQsIDMpLFxuICAgICAgICAgICAgYiA9IDMgKiBNYXRoLnBvdyh0LCAyKSAqICgxIC0gdCksXG4gICAgICAgICAgICBjID0gMyAqIHQgKiBNYXRoLnBvdygxIC0gdCwgMiksXG4gICAgICAgICAgICBkID0gTWF0aC5wb3coMSAtIHQsIDMpO1xuXG4gICAgICAgIHJldHVybiAoIHAwICogYSArIHAxICogYiArIHAyICogYyArIHAzICogZCApO1xuICAgIH0sXG5cbiAgICBzbW9vdGhTdGVwOiBmdW5jdGlvbiAodCwgcDAsIHAxKSB7XG4gICAgICAgIHQgPSB0ICogdCAqICgzIC0gMiAqIHQpO1xuICAgICAgICByZXR1cm4gcDAgKiAoIDEgLSB0ICkgKyBwMSAqIHQ7XG4gICAgfSxcblxuICAgIG1lZGlhbjogZnVuY3Rpb24gKHAwLCBwMSkge1xuICAgICAgICByZXR1cm4gKHAwIC0gcDEpIC8gMiArIHAwO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgRXZlbnRzIGZyb20gJy4uL3NlcnZpY2VzL2V2ZW50cyc7XG5cbmNsYXNzIEJhc2VDb250cm9sIHtcbiAgICBjb25zdHJ1Y3RvciAoY29udHJvbE5hbWUsIGNvbmZpZywgbW9kZWw9e30pIHtcbiAgICAgICAgdGhpcy5jb250cm9sTmFtZSA9IGNvbnRyb2xOYW1lO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHRoaXMudmFsaWRhdGVFdmVudHMoY29uZmlnKTtcbiAgICAgICAgdGhpcy5tb2RlbCAgPSB0aGlzLnZhbGlkYXRlTW9kZWwobW9kZWwpO1xuICAgICAgICB0aGlzLnZhbGlkRXZlbnRzID0gW0Jhc2VDb250cm9sLlZBTFVFX0NIQU5HRV07XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb250cm9sTmFtZSArICc6ICcgKyBlcnJvck1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRXZlbnRzIChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5ldmVudHMgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcuZXZlbnRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcignY29uZmlnIG9iamVjdCBtdXN0IGhhdmUgYW4gZXZlbnRzIGF0dHJpYnV0ZSBzZXQgdG8gYW4gRXZlbnRzIGluc3RhbmNlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZU1vZGVsIChtb2RlbCkge1xuICAgICAgICBpZiAobW9kZWwucHJvcGVydHlOYW1lICYmIHR5cGVvZiBtb2RlbC5wcm9wZXJ0eU5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKCdtb2RlbCBvYmplY3QgbXVzdCBoYXZlIGEgcHJvcGVydHlOYW1lIGF0dHJpYnV0ZSBkZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbiAoZXZlbnROYW1lLCBmdW5jLCBjb250ZXh0PW51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRFdmVudHMuaW5kZXhPZihldmVudE5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uKGV2ZW50TmFtZSwgZnVuYywgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGBhdHRlbXB0aW5nIHRvIGxpc3RlbiB0byBpbnZhbGlkIGV2ZW50OiAke2V2ZW50TmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9mZiAodG9rZW4sIGV2ZW50TmFtZSkge1xuICAgICAgICB0aGlzLmV2ZW50cy5vZmYodG9rZW4sIGV2ZW50TmFtZSk7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BlcnR5TmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnByb3BlcnR5TmFtZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUgKHZhbHVlSW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWVJbnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWVJbnQ7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5icm9hZGNhc3QoQmFzZUNvbnRyb2wuVkFMVUVfQ0hBTkdFLCB2YWx1ZUludCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJhc2VDb250cm9sLlZBTFVFX0NIQU5HRSA9ICd2YWx1ZV9jaGFuZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlQ29udHJvbDtcbiIsIi8vIEltcG9ydCBkZXBlbmRlbmNpZXNcbmltcG9ydCBCYXNlQ29udHJvbCBmcm9tICcuL2Jhc2UtY29udHJvbCc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJy4uL3NlcnZpY2VzL2V2ZW50cyc7XG5pbXBvcnQgeyBJbnRlcnBvbGF0aW9uIH0gZnJvbSAnLi4vY29tbW9uL21hdGgnO1xuXG5leHBvcnQgY2xhc3MgR3JhcGhDb250cm9sIGV4dGVuZHMgQmFzZUNvbnRyb2wge1xuICAgIGNvbnN0cnVjdG9yIChjb25maWcsIG1vZGVsPXt9KSB7XG4gICAgICAgIHN1cGVyKCdHcmFwaENvbnRyb2wnLCBjb25maWcsIG1vZGVsKTtcbiAgICAgICAgdGhpcy5zb3J0UG9pbnRzQnlUaW1lKCk7XG4gICAgICAgIHRoaXMudmFsaWRFdmVudHMucHVzaChcbiAgICAgICAgICAgIEdyYXBoQ29udHJvbC5BRERfUE9JTlRTLFxuICAgICAgICAgICAgR3JhcGhDb250cm9sLlJFTU9WRV9QT0lOVFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZFBvaW50cyAocG9pbnRzT2JqKSB7XG4gICAgICAgIGlmKCAhQXJyYXkuaXNBcnJheShwb2ludHNPYmopXG4gICAgICAgICAgICAmJiAhKHBvaW50c09iaiBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBvaW50c09iaikpIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzID0gdGhpcy5wb2ludHMuY29uY2F0KHBvaW50c09iaik7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzT2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50c09iaik7XG4gICAgICAgICAgICB0aGlzLnNvcnRQb2ludHNCeVRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy5icm9hZGNhc3QoR3JhcGhDb250cm9sLkFERF9QT0lOVFMgLCB0aGlzLnBvaW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50cztcbiAgICB9XG5cbiAgICByZW1vdmVQb2ludCAocG9pbnRJbmRleCkge1xuICAgICAgICBpZiAodHlwZW9mIHBvaW50SW5kZXggPT09ICdudW1iZXInXG4gICAgICAgICAgICAmJiBwb2ludEluZGV4ID4gMFxuICAgICAgICAgICAgJiYgcG9pbnRJbmRleCA8IHRoaXMucG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnNwbGljZShwb2ludEluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmJyb2FkY2FzdChHcmFwaENvbnRyb2wuUkVNT1ZFX1BPSU5ULCB0aGlzLnBvaW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0UG9pbnRzQnlUaW1lICgpIHtcbiAgICAgICAgdGhpcy5wb2ludHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEudCAtIGIudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50cztcbiAgICB9XG5cbiAgICBmaW5kUG9pbnRzQnlUaW1lICh0KSB7XG4gICAgICAgIC8vIFBvaW50cyBzaG91bGQgYWxyZWFkeSBiZSBzb3J0ZWQgYnkgdC5cbiAgICAgICAgdmFyIGVuZEluZGV4ICAgID0gbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0SW5kZXggID0gbnVsbCxcbiAgICAgICAgICAgIHBvaW50c1RvdGFsID0gdGhpcy5wb2ludHMubGVuZ3RoLFxuICAgICAgICAgICAgbGFzdEluZGV4ICAgPSBwb2ludHNUb3RhbCAtIDE7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHNUb3RhbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLnBvaW50c1tpXTtcblxuICAgICAgICAgICAgaWYgKHBvaW50LnQgPiB0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRJbmRleCA9IGkgLSAxO1xuICAgICAgICAgICAgICAgIGVuZEluZGV4ICAgPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBpIC0gMTtcbiAgICAgICAgICAgICAgICBlbmRJbmRleCAgID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludC50ID09PSB0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgZW5kSW5kZXggICA9IGkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXJ0SW5kZXggIT09IG51bGwgJiYgZW5kSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbdGhpcy5wb2ludHNbc3RhcnRJbmRleF0sIHRoaXMucG9pbnRzW2VuZEluZGV4XV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZUF0VGltZSAodCkge1xuICAgICAgIC8vIEdldCBpbnRlcnBvbGF0aW9uIGZ1bmN0aW9uIGJhc2VkIGZpcnN0IHBvaW50cyB0eXBlXG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLmZpbmRQb2ludHNCeVRpbWUodCksXG4gICAgICAgICAgICBwMSA9IHBvaW50c1swXSxcbiAgICAgICAgICAgIHAyID0gcG9pbnRzWzFdO1xuXG4gICAgICAgIC8vIHN0YXJ0IHRpbWVcbiAgICAgICAgdmFyIHN0ID0gdCAtIHAxLnQ7XG4gICAgICAgIC8vIGxvY2FsIHBvaW50IHRpbWVcbiAgICAgICAgdmFyIGxwdCA9ICgxIC8gKHAyLnQgLSBwMS50KSkgKiBzdDtcblxuICAgICAgICB0aGlzLnZhbHVlID0gTWF0aC5yb3VuZChJbnRlcnBvbGF0aW9uLnNtb290aFN0ZXAobHB0LCBwMS52LCBwMi52KSAqIDEwMDApIC8gMTAwMDtcblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcG9pbnRzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwucG9pbnRzO1xuICAgIH1cblxuICAgIHNldCBwb2ludHMgKHBvaW50c0FycmF5KSB7XG4gICAgICAgIHRoaXMubW9kZWwucG9pbnRzID0gcG9pbnRzQXJyYXk7XG4gICAgICAgIHRoaXMuc29ydFBvaW50c0J5VGltZSgpO1xuICAgIH1cbn1cbi8vIEV2ZW50IFN0cmluZyBDb25zdGFudHNcbkdyYXBoQ29udHJvbC5BRERfUE9JTlRTICAgPSAnYWRkX3BvaW50cyc7XG5HcmFwaENvbnRyb2wuUkVNT1ZFX1BPSU5UID0gJ3JlbW92ZV9wb2ludCc7XG5cbmV4cG9ydCB2YXIgR3JhcGhDb250cm9sUHJvdmlkZXIgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGV2ZW50czogbmV3IEV2ZW50cygpLnNldENoYW5uZWwoJ2dyYXBoQ29udHJvbCcpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgR3JhcGhDb250cm9sKGNvbmZpZywgbW9kZWwpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXBoQ29udHJvbDtcbiIsImV4cG9ydCBjbGFzcyBFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5jaGFubmVscyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEBkZXNjcmlwdGlvblxuICAgICogQnJvYWRjYXN0IGEgbWVzc2FnZSB0byBhIGNoYW5uZWwuXG4gICAgKlxuICAgICogQHBhcmFtIGNoYW5uZWxTdHIgc3RyaW5nXG4gICAgKiBAcGFyYW0gdG9waWNTdHIgc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgb3IgbGl0ZXJhbFxuICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICovXG4gICAgYnJvYWRjYXN0IChjaGFubmVsU3RyLCB0b3BpY1N0ciwgZGF0YSkge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgaWYgKCB0aGlzLm5vQ2hhbm5lbChjaGFubmVsU3RyKSApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW2NoYW5uZWxTdHJdO1xuICAgICAgICByZXR1cm4gY2hhbm5lbC5icm9hZGNhc3QodG9waWNTdHIsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBBdHRhY2ggYSBjaGFubmVsIGxpc3RlbmVyLlxuICAgICpcbiAgICAqIEBwYXJhbSBjaGFubmVsU3RyIHN0cmluZ1xuICAgICogQHBhcmFtIHRvcGljU3RyIHN0cmluZyB8fCB1bmRlZmluZWQgfHwgbnVsbFxuICAgICogQHBhcmFtIGxpc3RlbmVyRnVuYyBmdW5jdGlvblxuICAgICogQHBhcmFtIGNvbnRleHQgb2JqZWN0XG4gICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICAqL1xuICAgIG9uIChjaGFubmVsU3RyLCB0b3BpY1N0ciwgbGlzdGVuZXJGdW5jLCBjb250ZXh0PW51bGwpIHtcbiAgICAgICAgdmFyIGNoYW5uZWw7XG5cbiAgICAgICAgY2hhbm5lbCA9IHRoaXMuc2V0Q2hhbm5lbChjaGFubmVsU3RyKTtcbiAgICAgICAgcmV0dXJuIGNoYW5uZWwub24odG9waWNTdHIsIGxpc3RlbmVyRnVuYywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBAZGVzY3JpcHRpb25cbiAgICAqIFJlbW92ZSBhIGNoYW5uZWwgbGlzdGVuZXIuXG4gICAgKlxuICAgICogQHBhcmFtIHRva2VuIHN0cmluZ1xuICAgICogQHBhcmFtIGNoYW5uZWxTdHIgc3RyaW5nXG4gICAgKiBAcGFyYW0gdG9waWNTdHIgc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAgKi9cbiAgICBvZmYgKHRva2VuLCBjaGFubmVsU3RyLCB0b3BpY1N0cikge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgaWYgKCB0aGlzLm5vQ2hhbm5lbChjaGFubmVsU3RyKSApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW2NoYW5uZWxTdHJdO1xuICAgICAgICByZXR1cm4gY2hhbm5lbC5vZmYodG9rZW4sIHRvcGljU3RyKTtcbiAgICB9XG5cbiAgICBzZXRDaGFubmVsIChjaGFubmVsU3RyKSB7XG4gICAgICAgIHZhciBjaGFubmVsO1xuICAgICAgICBpZih0aGlzLm5vQ2hhbm5lbChjaGFubmVsU3RyKSkge1xuICAgICAgICAgICAgY2hhbm5lbCA9IG5ldyBDaGFubmVsKGNoYW5uZWxTdHIpO1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsc1tjaGFubmVsU3RyXSA9IGNoYW5uZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tjaGFubmVsU3RyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGFubmVsO1xuICAgIH1cblxuICAgIGdldENoYW5uZWwoY2hhbm5lbFN0cikge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgaWYodGhpcy5ub0NoYW5uZWwoY2hhbm5lbFN0cikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW2NoYW5uZWxTdHJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoYW5uZWw7XG4gICAgfVxuXG4gICAgbm9DaGFubmVsIChjaGFubmVsU3RyKSB7XG4gICAgICAgIHJldHVybiBjaGFubmVsU3RyID09IG51bGwgfHwgIXRoaXMuY2hhbm5lbHMuaGFzT3duUHJvcGVydHkoY2hhbm5lbFN0cik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbCB7XG4gICAgY29uc3RydWN0b3IgKGNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbE5hbWUgPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdGhpcy50b3BpY3MgPSB7fTtcbiAgICAgICAgdGhpcy5kZWZhdWx0VG9waWMgPSAnbWFpbic7XG4gICAgICAgIHRoaXMuc3ViVWlkID0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBAZGVzY3JpcHRpb25cbiAgICAqIEJyb2FkY2FzdCBhIG1lc3NhZ2UgdG8gYSBjaGFubmVsJ3MgdG9waWMocylcbiAgICAqXG4gICAgKiBAcGFyYW0gdG9waWNTdHIgc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgb3IgbGl0ZXJhbFxuICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICovXG4gICAgYnJvYWRjYXN0ICh0b3BpY1N0ciwgZGF0YSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIElmIGFuIGludmFsaWQgdG9waWMgdmFsdWUgaXMgcGFzc2VkIHJldHVybiBmYWxzZVxuICAgICAgICAvLyB1bmRlZmluZWQgYW5kIG51bGwgdmFsdWVzIHNob3VsZCBub3QgcmV0dXJuIGZhbHNlLlxuICAgICAgICBpZih0aGlzLm5vVG9waWModG9waWNTdHIpICYmIHRvcGljU3RyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG51bGwgb3IgdW5kZWZpbmVkIHdhcyBwYXNzZWRcbiAgICAgICAgLy8gYnJvYWRjYXN0cyB0byBhbGwgdG9waWNzIGluIHRoaXMgY2hhbm5lbC5cbiAgICAgICAgaWYgKCB0b3BpY1N0ciA9PSBudWxsICkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy50b3BpY3MpLmZvckVhY2goICh0b3BpYykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljXS5mb3JFYWNoKHVwZGF0ZVRvcGljKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b3BpY3NbdG9waWNTdHJdLmZvckVhY2godXBkYXRlVG9waWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gaXRlcmF0b3IgZnVuY3Rpb25cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVG9waWMgKHRvcGljT2JqLCBpbmRleCwgYXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIGV2dCA9IHtcbiAgICAgICAgICAgICAgICBjaGFubmVsOiBfc2VsZi5jaGFubmVsTmFtZSxcbiAgICAgICAgICAgICAgICB0b3BpYzogdG9waWNPYmoudG9waWMsXG4gICAgICAgICAgICAgICAgZnVuYzogdG9waWNPYmouZnVuYyxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB0b3BpY09iai5jb250ZXh0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0b3BpY09iai5mdW5jLmNhbGwodG9waWNPYmouY29udGV4dCwgZXZ0LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBBdHRhY2ggYSBjaGFubmVsIGxpc3RlbmVyLlxuICAgICpcbiAgICAqIEBwYXJhbSB0b3BpY1N0ciBzdHJpbmcgfHwgdW5kZWZpbmVkIHx8IG51bGxcbiAgICAqIEBwYXJhbSBsaXN0ZW5lckZ1bmMgZnVuY3Rpb25cbiAgICAqIEBwYXJhbSBjb250ZXh0IG9iamVjdFxuICAgICogQHJldHVybnMgdG9rZW4gc3RyaW5nXG4gICAgKi9cbiAgICBvbiAodG9waWNTdHIsIGxpc3RlbmVyRnVuYywgY29udGV4dD1udWxsKSB7XG4gICAgICAgIHZhciB0b2tlbiwgdG9waWNPYmo7XG4gICAgICAgIGlmICggdGhpcy5ub1RvcGljKHRvcGljU3RyKSApIHtcbiAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljU3RyXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4gPSAoICsrdGhpcy5zdWJVaWQgKS50b1N0cmluZygpO1xuXG4gICAgICAgIHRvcGljT2JqID0ge1xuICAgICAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICAgICAgdG9waWM6IHRvcGljU3RyLFxuICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgIGZ1bmM6IGxpc3RlbmVyRnVuY1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudG9waWNzW3RvcGljU3RyXS5wdXNoKHRvcGljT2JqKTtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBSZW1vdmUgYSBjaGFubmVsIGxpc3RlbmVyLlxuICAgICpcbiAgICAqIEBwYXJhbSB0b2tlbiBzdHJpbmcgfHwgdW5kZWZpbmVkIHx8IG51bGxcbiAgICAqIEBwYXJhbSB0b3BpY1N0ciBzdHJpbmcgfHwgdW5kZWZpbmVkIHx8IG51bGxcbiAgICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICAqL1xuICAgIG9mZiAodG9rZW4sIHRvcGljU3RyKSB7XG4gICAgICAgIHZhciB0b3BpYyxcbiAgICAgICAgICAgIHJlbW92ZUFsbCAgPSBmYWxzZSxcbiAgICAgICAgICAgIHRva2VuRm91bmQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIHRoaXMubm9Ub3BpYyh0b3BpY1N0cikgJiYgdG9waWNTdHIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuID09IG51bGwpIHtcbiAgICAgICAgICAgIHJlbW92ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9waWNTdHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy50b3BpY3MpLmZvckVhY2goICh0b3BpY0tleSk9PiB7XG4gICAgICAgICAgICAgICAgdG9waWMgPSB0aGlzLnRvcGljc1t0b3BpY0tleV07XG4gICAgICAgICAgICAgICAgaWYgKHJlbW92ZUFsbCkge1xuICAgICAgICAgICAgICAgICAgICB0b3BpYyA9IFtdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcGljLmZvckVhY2gocmVtb3ZlVG9waWMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9waWMgPSB0aGlzLnRvcGljc1t0b3BpY1N0cl07XG4gICAgICAgICAgICBpZiAocmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICAgICAgdG9waWMgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9waWMuZm9yRWFjaChyZW1vdmVUb3BpYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhIHRva2VuIHdhcyBmb3VuZCByZXR1cm5zIHRydWUsXG4gICAgICAgIC8vIGlmIG5vIHRva2VuIGZvdW5kLCBidXQgcmVtb3ZlQWxsIGlzIHRydWUgcmV0dXJucyB0cnVlXG4gICAgICAgIC8vIHJldHVybnMgZmFsc2UgaWYgbm8gdG9rZW4gYW5kIHJlbW92ZUFsbCBpcyBmYWxzZS5cbiAgICAgICAgcmV0dXJuIHRva2VuRm91bmQgfHwgcmVtb3ZlQWxsO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVRvcGljICh0b3BpY09iaiwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgICAgICBpZih0b3BpY09iai50b2tlbiA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0b3BpYy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRva2VuRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm9Ub3BpYyAodG9waWNTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRvcGljU3RyID09IG51bGwgfHwgIXRoaXMudG9waWNzLmhhc093blByb3BlcnR5KHRvcGljU3RyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50cztcbiIsImltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvciAoY29uZmlnPXt9KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzICAgICAgPSBjb25maWcuZXZlbnRzO1xuICAgICAgICB0aGlzLm1vZGVsICAgICAgID0ge307XG4gICAgICAgIHRoaXMudmFsaWRFdmVudHMgPSBbXG4gICAgICAgICAgICBUaWNrZXIuVElDSyxcbiAgICAgICAgICAgIFRpY2tlci5TVEFSVCxcbiAgICAgICAgICAgIFRpY2tlci5TVE9QXG4gICAgICAgIF07XG4gICAgICAgIC8vIEluaXRpYWxpemUgTW9kZWxcbiAgICAgICAgdGhpcy50aWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xuICAgICAgICB0aGlzLnN0YXRlID0gVGlja2VyLlNUT1BQRUQ7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gVGlja2VyLlRJQ0tJTkc7XG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcbiAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpY2tlci5TVEFSVCk7XG4gICAgfVxuXG4gICAgc3RvcCAoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBUaWNrZXIuU1RPUFBFRDtcbiAgICAgICAgdGhpcy5kZXN0cm95SW50ZXJ2YWwoKTtcbiAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpY2tlci5TVE9QKTtcbiAgICB9XG5cbiAgICB0aWNrICgpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpY2tlci5USUNLKTtcbiAgICB9XG5cbiAgICBjcmVhdGVJbnRlcnZhbCAoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveUludGVydmFsKCk7XG4gICAgICAgIHRoaXMudGlja0ludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGRlc3Ryb3lJbnRlcnZhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGlja0ludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGlja0ludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMudGlja0ludGVydmFsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uIChldmVudE5hbWUsIGZuLCBjb250ZXh0PW51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRFdmVudHMuaW5kZXhPZihldmVudE5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5ldmVudHMub24oZXZlbnROYW1lLCBmbiwgY29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZXZlbnQgdHlwZTogJyArIGV2ZW50TmFtZSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb2ZmICh0b2tlbiwgZXZlbnROYW1lKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9mZih0b2tlbiwgZXZlbnROYW1lKTtcbiAgICB9XG5cbiAgICBzZXQgaW50ZXJ2YWwobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgIHRoaXMubW9kZWwuaW50ZXJ2YWwgPSBtaWxsaXNlY29uZHM7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUgPT09IFRpY2tlci5USUNLSU5HKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaW50ZXJ2YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmludGVydmFsO1xuICAgIH1cblxuICAgIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5zdGF0ZTtcbiAgICB9XG59XG4vLyBUaWNrZXIgZXZlbnQgdHlwZXNcblRpY2tlci5USUNLICA9ICd0aWNrJztcblRpY2tlci5TVEFSVCA9ICdzdGFydCc7XG5UaWNrZXIuU1RPUCAgPSAnc3RvcCc7XG4vLyBUaWNrZXIgc3RhdGVzXG5UaWNrZXIuU1RPUFBFRCA9ICdzdG9wcGVkJztcblRpY2tlci5USUNLSU5HID0gJ3RpY2tpbmcnO1xuXG5leHBvcnQgdmFyIFRpY2tlclByb3ZpZGVyID0ge1xuICAgIGdldDogZnVuY3Rpb24gKGNvbmZpZz17fSkge1xuICAgICAgICBjb25maWcuZXZlbnRzICAgPSBjb25maWcuZXZlbnRzIHx8IG5ldyBFdmVudHMoKS5zZXRDaGFubmVsKCd0aWNrZXInKTtcbiAgICAgICAgY29uZmlnLmludGVydmFsID0gY29uZmlnLmludGVydmFsIHx8IDUwO1xuICAgICAgICByZXR1cm4gbmV3IFRpY2tlcihjb25maWcpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpY2tlcjtcbiIsImltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3RpY2tlcic7XG5cbmV4cG9ydCBjbGFzcyBUaW1lciBleHRlbmRzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3IgKGNvbmZpZywgbW9kZWw9e30pIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICB0aGlzLnZhbGlkRXZlbnRzID0gW1xuICAgICAgICAgICAgVGltZXIuVElDSyxcbiAgICAgICAgICAgIFRpbWVyLlNUQVJULFxuICAgICAgICAgICAgVGltZXIuU1RPUCxcbiAgICAgICAgICAgIFRpbWVyLlBBVVNFLFxuICAgICAgICAgICAgVGltZXIuQ09NUExFVEVcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLnRpbWVBdFBhdXNlID0gMDtcblxuICAgICAgICB0aGlzLm1vZGVsICAgICAgICAgICAgID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpO1xuICAgICAgICB0aGlzLm1vZGVsLnN0YXRlICAgICAgID0gVGltZXIuU1RPUFBFRDtcbiAgICAgICAgdGhpcy5tb2RlbC5zdGFydFRpbWUgICA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kZWwuY3VycmVudFRpbWUgPSB0aGlzLm1vZGVsLmN1cnJlbnRUaW1lIHx8IG51bGw7XG4gICAgICAgIHRoaXMubW9kZWwuZXBzaWxvbiAgICAgPSB0aGlzLm1vZGVsLmVwc2lsb24gfHwgbnVsbDtcbiAgICAgICAgdGhpcy5tb2RlbC5wbGF5VGltZSAgICA9IHRoaXMubW9kZWwucGxheVRpbWUgfHwgbnVsbDtcblxuICAgICAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFRpbWVyLlRJQ0tJTkcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlUaW1lID4gMCAmJiB0aGlzLnBsYXlUaW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gVGltZXIuVElDS0lORztcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpbWVyLlNUQVJUKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHBhdXNlIHRpbWUgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lQXRQYXVzZSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGltZXI6IHZhbGlkIHBsYXlUaW1lIG11c3QgYmUgc2V0IGJlZm9yZSBjYWxsaW5nIHN0YXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBUaW1lci5USUNLSU5HKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gVGltZXIuUEFVU0VEO1xuICAgICAgICAgICAgdGhpcy50aW1lQXRQYXVzZSA9IHRoaXMuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lJbnRlcnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpbWVyLlBBVVNFKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBUaW1lci5QQVVTRUQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AgKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gVGltZXIuU1RPUFBFRDtcbiAgICAgICAgdGhpcy5kZXN0cm95SW50ZXJ2YWwoKTtcbiAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpbWVyLlNUT1ApO1xuICAgICAgICB0aGlzLnRpbWVBdFBhdXNlID0gMDtcbiAgICB9XG5cbiAgICB0aWNrICgpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSAobm93IC0gdGhpcy5zdGFydFRpbWUpO1xuXG4gICAgICAgIC8vIFN0b3AgdGhlIFRpbWVyIGFuZCBicm9hZGNhc3QgdGhlIENPTVBMRVRFIGV2ZW50IHR5cGVcbiAgICAgICAgLy8gaWYgY3VycmVudFRpbWUgaXMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIHBsYXlUaW1lLlxuICAgICAgICBpZihjdXJyZW50VGltZSA+PSB0aGlzLnBsYXlUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwbGF5VGltZTogdGhpcy5wbGF5VGltZSxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZTogdGhpcy5wbGF5VGltZSxcbiAgICAgICAgICAgICAgICBlcHNpbG9uOiAxXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5icm9hZGNhc3QoVGltZXIuQ09NUExFVEUpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuYnJvYWRjYXN0KFRpbWVyLlRJQ0ssIGRhdGEpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLmVwc2lsb24gPSAoMSAvIHRoaXMucGxheVRpbWUpICogdGhpcy5jdXJyZW50VGltZTtcblxuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwbGF5VGltZTogdGhpcy5wbGF5VGltZSxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZTogdGhpcy5jdXJyZW50VGltZSxcbiAgICAgICAgICAgICAgICBlcHNpbG9uOiB0aGlzLmVwc2lsb25cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmJyb2FkY2FzdChUaW1lci5USUNLLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5zdGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgc3RhcnRUaW1lIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zdGFydFRpbWUgPSBtaWxsaXNlY29uZHMgLSB0aGlzLnRpbWVBdFBhdXNlO1xuICAgIH1cblxuICAgIGdldCBzdGFydFRpbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5zdGFydFRpbWU7XG4gICAgfVxuXG4gICAgc2V0IHBsYXlUaW1lIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgaWYgKG1pbGxpc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwucGxheVRpbWUgPSBtaWxsaXNlY29uZHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRpbWVyOiBwbGF5VGltZSAoJHttaWxsaXNlY29uZHN9KSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcGxheVRpbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5wbGF5VGltZTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFRpbWUgKG1pbGxpc2Vjb25kcykge1xuICAgICAgICBpZiAobWlsbGlzZWNvbmRzID49IDApIHtcbiAgICAgICAgICAgIGlmIChtaWxsaXNlY29uZHMgPD0gdGhpcy5wbGF5VGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VycmVudFRpbWUgPSBtaWxsaXNlY29uZHM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihgVGltZXI6IGN1cnJlbnRUaW1lICgke21pbGxpc2Vjb25kc30pIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gcGxheVRpbWUgKCR7dGhpcy5wbGF5VGltZX0pYCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKGBUaW1lcjogY3VycmVudFRpbWUgKCR7bWlsbGlzZWNvbmRzfSkgY2Fubm90IGJlIGxlc3MgdGhhbiAwYCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRUaW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuY3VycmVudFRpbWU7XG4gICAgfVxuXG4gICAgc2V0IGVwc2lsb24gKGVwc2lsb24pIHtcbiAgICAgICAgaWYgKGVwc2lsb24gPj0gMCAmJiBlcHNpbG9uIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZXBzaWxvbiA9IGVwc2lsb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRpbWVyOiBlcHNpbG9uIHZhbHVlICgke2Vwc2lsb259KSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGVwc2lsb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5lcHNpbG9uO1xuICAgIH1cbn1cbi8vIFRpbWVyIGV2ZW50IHR5cGVzXG5UaW1lci5QQVVTRSAgICA9ICdwYXVzZSc7XG5UaW1lci5DT01QTEVURSA9ICdjb21wbGV0ZSc7XG4vLyBUaW1lciBzdGF0ZXNcblRpbWVyLlBBVVNFRCAgID0gJ3BhdXNlZCc7XG5cbmV4cG9ydCB2YXIgVGltZXJQcm92aWRlciA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIChjb25maWc9e30sIG1vZGVsPXt9KSB7XG4gICAgICAgIGNvbmZpZy5ldmVudHMgICA9IGNvbmZpZy5ldmVudHMgfHwgbmV3IEV2ZW50cygpLnNldENoYW5uZWwoJ3RpbWVyJyk7XG4gICAgICAgIGNvbmZpZy5pbnRlcnZhbCA9IGNvbmZpZy5pbnRlcnZhbCB8fCA1MDtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lcihjb25maWcsIG1vZGVsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVyO1xuIl19
