!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Soundscape=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var $__soundscape__;
var Soundscape = ($__soundscape__ = require("./soundscape"), $__soundscape__ && $__soundscape__.__esModule && $__soundscape__ || {default: $__soundscape__}).default;
module.exports = Soundscape;

//# sourceMappingURL=<compileOutput>


},{"./soundscape":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47_services_47_utils__,
    $__sound_45_module__,
    $__property_45_control_47_property_45_control__;
var utils = ($___46__46__47_services_47_utils__ = require("../services/utils"), $___46__46__47_services_47_utils__ && $___46__46__47_services_47_utils__.__esModule && $___46__46__47_services_47_utils__ || {default: $___46__46__47_services_47_utils__}).default;
var SoundModule = ($__sound_45_module__ = require("./sound-module"), $__sound_45_module__ && $__sound_45_module__.__esModule && $__sound_45_module__ || {default: $__sound_45_module__}).default;
var PropertyControl = ($__property_45_control_47_property_45_control__ = require("./property-control/property-control"), $__property_45_control_47_property_45_control__ && $__property_45_control_47_property_45_control__.__esModule && $__property_45_control_47_property_45_control__ || {default: $__property_45_control_47_property_45_control__}).default;
var binauralBeatDefaults = {
  title: 'Binaural Beat Module',
  type: 'binaural-beat-module',
  waveType: 'sine',
  pitch: {
    propertyName: 'pitch',
    controlType: 'slider_control',
    value: 440,
    sliderValue: 440,
    followModuleId: null
  },
  beatRate: {
    propertyName: 'beatRate',
    controlType: 'slider_control',
    value: 8,
    sliderValue: 8,
    followModuleId: null
  }
};
var BinauralBeatModule = function BinauralBeatModule(config, data) {
  var _self = this;
  $traceurRuntime.superCall(this, $BinauralBeatModule.prototype, "constructor", [config, data]);
  this.model = utils.deepExtend({}, binauralBeatDefaults, this.model);
  this.generator = new BinauralBeat(this.audioCtx);
  this.generator.connect(this.gainNode);
  this.waveType = this.model.waveType;
  var propertyConfig = {moduleId: this.id};
  this.pitch = new PropertyControl(propertyConfig, this.model.pitch);
  this.beatRate = new PropertyControl(propertyConfig, this.model.beatRate);
  this.events = Object.assign(this.events, {
    pitchEvent: this.scpEvents.on('soundmodule', 'pitchChange', _self, _self.onPitchChange),
    beatRateEvent: this.scpEvents.on('soundmodule', 'beatRateChange', _self, _self.onBeatRateChange)
  });
  this.generator.start();
};
var $BinauralBeatModule = BinauralBeatModule;
($traceurRuntime.createClass)(BinauralBeatModule, {
  remove: function() {
    $traceurRuntime.superCall(this, $BinauralBeatModule.prototype, "remove", []);
    this.generator.disconnect();
    this.gainNode.disconnect();
  },
  onPitchChange: function(e, data) {
    console.log(e, 'beatRateChange');
  },
  onBeatRateChange: function(e, data) {
    console.log(e, 'beatRateChange');
  },
  get waveType() {
    return this.model.waveType;
  },
  set waveType(type) {
    if (type !== void 0 && type !== null && typeof type === 'string') {
      this.model.waveType = type;
      this.generator.setWaveType(this.model.waveType);
    }
  },
  get pitch() {
    return this.model.pitch;
  },
  set pitch(pitchObj) {
    if (pitchObj !== void 0 && typeof pitchObj === 'object') {
      Object.assign(this.model.pitch, pitchObj);
      this.generator.setPitch(this.model.pitch.value);
    }
  },
  get beatRate() {
    return this.model.beatRate;
  },
  set beatRate(beatRateObj) {
    if (beatRateObj !== void 0 && typeof beatRateObj === 'object') {
      Object.assign(this.model.beatRate, beatRateObj);
      this.generator.setBeatRate(this.model.beatRate.value);
    }
  }
}, {}, SoundModule);
var $__default = BinauralBeatModule;

//# sourceMappingURL=<compileOutput>


},{"../services/utils":9,"./property-control/property-control":5,"./sound-module":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47_services_47_utils__,
    $__sound_45_module__;
var utils = ($___46__46__47_services_47_utils__ = require("../services/utils"), $___46__46__47_services_47_utils__ && $___46__46__47_services_47_utils__.__esModule && $___46__46__47_services_47_utils__ || {default: $___46__46__47_services_47_utils__}).default;
var SoundModule = ($__sound_45_module__ = require("./sound-module"), $__sound_45_module__ && $__sound_45_module__.__esModule && $__sound_45_module__ || {default: $__sound_45_module__}).default;
var colorNoiseDefaults = {
  title: "Noise Module",
  type: 'noise-module',
  noiseType: 'brown'
};
var ColorNoiseModule = function ColorNoiseModule(config, data) {
  $traceurRuntime.superCall(this, $ColorNoiseModule.prototype, "constructor", [config, data]);
  this.model = utils.deepExtend({}, colorNoiseDefaults, this.model);
  this.generator = new NoiseGen(this.audioCtx);
  this.generator.connect(this.gainNode);
  this.generator.setNoiseType(this.model.noiseType);
  this.generator.start();
};
var $ColorNoiseModule = ColorNoiseModule;
($traceurRuntime.createClass)(ColorNoiseModule, {
  remove: function() {
    $traceurRuntime.superCall(this, $ColorNoiseModule.prototype, "remove", []);
    this.generator.remove();
    this.generator.disconnect();
    this.gainNode.disconnect();
  },
  get noiseType() {
    return this.model.noiseType;
  },
  set noiseType(type) {
    if (type !== void 0 && type !== null) {
      this.model.noiseType = type;
      this.generator.setNoiseType(this.model.noiseType);
    }
  }
}, {}, SoundModule);
var $__default = ColorNoiseModule;

//# sourceMappingURL=<compileOutput>


},{"../services/utils":9,"./sound-module":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__binaural_45_beat__,
    $__color_45_noise__;
var BinauralBeatModule = ($__binaural_45_beat__ = require("./binaural-beat"), $__binaural_45_beat__ && $__binaural_45_beat__.__esModule && $__binaural_45_beat__ || {default: $__binaural_45_beat__}).default;
var ColorNoiseModule = ($__color_45_noise__ = require("./color-noise"), $__color_45_noise__ && $__color_45_noise__.__esModule && $__color_45_noise__ || {default: $__color_45_noise__}).default;
var modules = {
  'noise-module': ColorNoiseModule,
  'binaural-beat-module': BinauralBeatModule
};
var SoundModuleFactory = {create: function(type, config, data) {
    if (modules.hasOwnProperty(type)) {
      return new modules[type](config, data);
    } else {
      return false;
    }
  }};
var $__default = SoundModuleFactory;

//# sourceMappingURL=<compileOutput>


},{"./binaural-beat":2,"./color-noise":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_services_47_utils__,
    $___46__46__47__46__46__47_services_47_soundscape_45_events__;
var utils = ($___46__46__47__46__46__47_services_47_utils__ = require("../../services/utils"), $___46__46__47__46__46__47_services_47_utils__ && $___46__46__47__46__46__47_services_47_utils__.__esModule && $___46__46__47__46__46__47_services_47_utils__ || {default: $___46__46__47__46__46__47_services_47_utils__}).default;
var scpEvents = ($___46__46__47__46__46__47_services_47_soundscape_45_events__ = require("../../services/soundscape-events"), $___46__46__47__46__46__47_services_47_soundscape_45_events__ && $___46__46__47__46__46__47_services_47_soundscape_45_events__.__esModule && $___46__46__47__46__46__47_services_47_soundscape_45_events__ || {default: $___46__46__47__46__46__47_services_47_soundscape_45_events__}).default;
var propertyControlDefaults = {
  propertyName: null,
  controlType: 'slider_control',
  followModuleId: null,
  sliderValue: 0,
  value: 0,
  graph: []
};
var PropertyControl = function PropertyControl(config, data) {
  this.moduleId = config.moduleId;
  this.model = Object.assign({}, propertyControlDefaults, data);
};
($traceurRuntime.createClass)(PropertyControl, {
  remove: function() {
    console.log('remove');
  },
  get data() {
    return this.model;
  },
  set data(data) {
    Object.assign(this.model, data);
  },
  get controlType() {
    return this.model.controlType;
  },
  set controlType(controlType) {
    this.model.controlType = controlType;
  },
  get sliderValue() {
    return this.model.sliderData;
  },
  set slideValue(sliderValue) {
    this.model.slideValue = slideValue;
  },
  get followModuleId() {
    return this.model.followModuleId;
  },
  set followModuleId(moduleId) {
    this.model.followModuleId = moduleId;
  },
  get graph() {
    return this.model.graph;
  },
  set graph(graph) {
    this.model.graph = graph;
  },
  get value() {
    return this.model.value;
  },
  set value(value) {
    this.model.value = value;
  }
}, {});
var $__default = PropertyControl;

//# sourceMappingURL=<compileOutput>


},{"../../services/soundscape-events":8,"../../services/utils":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47_services_47_utils__,
    $___46__46__47_services_47_soundscape_45_events__,
    $__property_45_control_47_property_45_control__;
var utils = ($___46__46__47_services_47_utils__ = require("../services/utils"), $___46__46__47_services_47_utils__ && $___46__46__47_services_47_utils__.__esModule && $___46__46__47_services_47_utils__ || {default: $___46__46__47_services_47_utils__}).default;
var scpEvents = ($___46__46__47_services_47_soundscape_45_events__ = require("../services/soundscape-events"), $___46__46__47_services_47_soundscape_45_events__ && $___46__46__47_services_47_soundscape_45_events__.__esModule && $___46__46__47_services_47_soundscape_45_events__ || {default: $___46__46__47_services_47_soundscape_45_events__}).default;
var PropertyControl = ($__property_45_control_47_property_45_control__ = require("./property-control/property-control"), $__property_45_control_47_property_45_control__ && $__property_45_control_47_property_45_control__.__esModule && $__property_45_control_47_property_45_control__ || {default: $__property_45_control_47_property_45_control__}).default;
var soundModuleDefaults = {
  muted: false,
  soloed: false,
  enabled: true,
  volume: {
    propertyName: 'volume',
    controlType: 'slider_control',
    followModuleId: null,
    sliderValue: 0.5,
    value: 0.5
  }
};
var SoundModule = function SoundModule(config, data) {
  this.audioCtx = config.audioCtx;
  this.masterGain = config.masterGain;
  this.gainNode = config.audioCtx.createGain();
  this.scpEvents = scpEvents;
  this.model = Object.assign({}, soundModuleDefaults);
  if (data && utils.isObject(data)) {
    Object.assign(this.model, data);
  }
  this.volume = new PropertyControl({moduleId: this.id}, this.model.volume);
  this.events = {
    soloEvent: this.scpEvents.on('soundscape', 'solo', this, this.onSoloUpdate),
    volumeEvent: this.scpEvents.on(this.id, 'volumeUpdate', this, this.onVolumeUpdate)
  };
};
($traceurRuntime.createClass)(SoundModule, {
  onVolumeUpdate: function(e, data) {
    if (this.enable === true && this.mute === false) {
      this.gain = this.volume.value;
    }
  },
  onSoloUpdate: function(e, data) {
    this.soloCheck(data.soloCount);
  },
  start: function() {
    this.gainNode.connect(this.masterGain);
  },
  stop: function() {
    this.gainNode.disconnect();
  },
  disable: function() {},
  remove: function() {
    this.solo = false;
  },
  soloCheck: function(soloCount) {
    if (!this.model.soloed && soloCount !== 0) {
      this.enable = false;
    } else {
      this.enable = true;
    }
  },
  followModuleProperty: function(moduleId, property) {
    var _self = this,
        followModule = followModules.filter(function(followModule) {
          return followModule.id === moduleId;
        })[0];
  },
  getPropertyAttribute: function(property, attribute) {
    if (this.hasOwnProperty(property) && this[property].hasOwnProperty(attribute)) {
      return this[property][attribute];
    }
  },
  setPropertyAttribute: function(property, attribute, value) {
    if (this.hasOwnProperty(property) && this[property].hasOwnProperty(attribute)) {
      this[property][attribute] = value;
    }
  },
  get id() {
    return this.model.id;
  },
  get title() {
    return this.model.title;
  },
  set title(title) {
    if (title != null && typeof title === 'string') {
      this.model.title = title;
    }
  },
  get type() {
    return this.model.type;
  },
  get gain() {
    return this.gainNode.gain.value;
  },
  set gain(gainInt) {
    if (gainInt !== void 0 && typeof gainInt === 'number') {
      this.gainNode.gain.value = gainInt;
    }
  },
  get solo() {
    return this.model.soloed;
  },
  set solo(soloBool) {
    if (soloBool !== void 0 && typeof soloBool === 'boolean') {
      this.model.soloed = soloBool;
      console.log('solo');
      this.scpEvents.broadcast('soundmodule', 'solo', {solo: soloBool});
    }
  },
  get mute() {
    return this.model.muted;
  },
  set mute(muteBool) {
    if (muteBool !== void 0 && typeof muteBool === 'boolean') {
      this.model.muted = muteBool;
      if (this.enable === true) {
        if (this.model.muted === true) {
          this.gain = 0;
        } else {
          this.gain = this.volume.value;
        }
      }
    }
  },
  get enable() {
    return this.model.enabled;
  },
  set enable(enableBool) {
    if (enableBool !== void 0 && typeof enableBool === 'boolean') {
      this.model.enabled = enableBool;
      if (enableBool) {
        if (this.mute === false) {
          this.gain = this.volume.value;
        }
      } else {
        this.gain = 0;
      }
    }
  },
  get volume() {
    return this.model.volume;
  },
  set volume(volumeObj) {
    this.model.volume = volumeObj;
  }
}, {});
var $__default = SoundModule;

//# sourceMappingURL=<compileOutput>


},{"../services/soundscape-events":8,"../services/utils":9,"./property-control/property-control":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var Events = function Events() {
  this.channels = {};
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
  on: function(channelStr, topicStr, context, listenerFunc) {
    var channel;
    channel = this.setChannel(channelStr);
    return channel.on(topicStr, context, listenerFunc);
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
  on: function(topicStr, context, listenerFunc) {
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

//# sourceMappingURL=<compileOutput>


},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__events__;
var Events = ($__events__ = require("./events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var soundscapeEvents = new Events();
var $__default = soundscapeEvents;

//# sourceMappingURL=<compileOutput>


},{"./events":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var utils = {
  isObject: function(obj) {
    return (typeof obj === 'object' && obj != null);
  },
  mixin: function(receiver, supplier) {
    Object.keys(supplier).forEach(function(property) {
      if (typeof property === 'object') {} else {
        Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
      }
    });
    return receiver;
  },
  deepExtend: deepExtend,
  uuid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};
function deepExtend() {
  if (arguments.length < 1 || typeof arguments[0] !== 'object') {
    return false;
  }
  if (arguments.length < 2)
    return arguments[0];
  var target = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  var key,
      val,
      src,
      clone,
      tmpBuf;
  args.forEach(function(obj) {
    if (typeof obj !== 'object')
      return;
    for (key in obj) {
      if (!(key in obj))
        continue;
      src = target[key];
      val = obj[key];
      if (val === target)
        continue;
      if (typeof val !== 'object' || val === null) {
        target[key] = val;
        continue;
      } else if (val instanceof Date) {
        target[key] = new Date(val.getTime());
        continue;
      } else if (val instanceof RegExp) {
        target[key] = new RegExp(val);
        continue;
      }
      if (typeof src !== 'object' || src === null) {
        clone = (Array.isArray(val)) ? [] : {};
        target[key] = deepExtend(clone, val);
        continue;
      }
      if (Array.isArray(val)) {
        clone = (Array.isArray(src)) ? src : [];
      } else {
        clone = (!Array.isArray(src)) ? src : {};
      }
      target[key] = deepExtend(clone, val);
    }
  });
  return target;
}
var $__default = utils;

//# sourceMappingURL=<compileOutput>


},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__services_47_utils__,
    $__services_47_soundscape_45_events__,
    $__modules_47_module_45_factory__;
var utils = ($__services_47_utils__ = require("./services/utils"), $__services_47_utils__ && $__services_47_utils__.__esModule && $__services_47_utils__ || {default: $__services_47_utils__}).default;
var scpEvents = ($__services_47_soundscape_45_events__ = require("./services/soundscape-events"), $__services_47_soundscape_45_events__ && $__services_47_soundscape_45_events__.__esModule && $__services_47_soundscape_45_events__ || {default: $__services_47_soundscape_45_events__}).default;
var SoundModuleFactory = ($__modules_47_module_45_factory__ = require("./modules/module-factory"), $__modules_47_module_45_factory__ && $__modules_47_module_45_factory__.__esModule && $__modules_47_module_45_factory__ || {default: $__modules_47_module_45_factory__}).default;
var STOPPED = 'stopped',
    PLAYING = 'playing',
    PAUSED = 'paused';
var Soundscape = function Soundscape(audioCtx, options) {
  this.audioCtx = audioCtx;
  this.gain = audioCtx.createGain();
  this.state = STOPPED;
  this.scpEvents = scpEvents;
  this.model = {};
  this.model.soundModules = [];
  this.gain.connect(this.audioCtx.destination);
  this.scpEvents.on('soundmodule', 'solo', this, this.soloUpdate);
};
($traceurRuntime.createClass)(Soundscape, {
  soloUpdate: function(e) {
    this.scpEvents.broadcast('soundscape', 'solo', {soloCount: this.soloCount});
  },
  play: function() {
    this.state = PLAYING;
    if (this.hasSoundModules()) {
      this.soundModules.forEach(function(module) {
        module.start();
      });
    }
    return this;
  },
  pause: function() {
    this.state = PAUSED;
    if (this.hasSoundModules()) {
      this.soundModules.forEach(function(module) {
        module.stop();
      });
    }
    return this;
  },
  stop: function() {
    this.state = STOPPED;
    if (this.hasSoundModules()) {
      this.soundModules.forEach(function(module) {
        module.stop();
      });
    }
    return this;
  },
  createSoundModule: function(moduleData) {
    var type = moduleData.type,
        config = {
          audioCtx: this.audioCtx,
          masterGain: this.gain
        };
    if (!moduleData.hasOwnProperty('id')) {
      moduleData.id = utils.uuid();
    }
    return SoundModuleFactory.create(type, config, moduleData);
  },
  addSoundModule: function(moduleData) {
    var updateSolo = arguments[1] !== (void 0) ? arguments[1] : true;
    var soundModule;
    if (!moduleData.hasOwnProperty('type')) {
      return false;
    }
    soundModule = this.createSoundModule(moduleData);
    if (utils.isObject(soundModule)) {
      this.soundModules.push(soundModule);
      if (this.state === PLAYING) {
        soundModule.start();
      }
      if (this.soloCount > 0 && updateSolo) {
        this.soloUpdate();
      }
    }
    return soundModule;
  },
  removeSoundModule: function(moduleId) {
    this.soundModules.forEach(removeModule);
    function removeModule(module, index, array) {
      if (module.id === moduleId) {
        module.remove();
        module = null;
        array.splice(index, 1);
      }
    }
    return moduleId;
  },
  removeAllSoundModules: function() {
    if (this.soundModules.length < 1) {
      return false;
    }
    this.soundModules.forEach(removeModule);
    this.soundModules = [];
    function removeModule(module) {
      module.remove();
    }
  },
  reset: function() {
    this.stop();
    this.removeAllSoundModules();
    this.model = {};
    this.model.soundModules = [];
  },
  parseJson: function(json) {
    if (json instanceof Object) {
      this.reset();
      if (json.soundModules) {
        var soundModules = json.soundModules;
        soundModules.forEach(function(module, index) {
          this.addSoundModule(module, false);
        }, this);
      }
      this.model = Object.assign({}, json, this.model);
      if (this.soloCount > 0) {
        this.soloUpdate();
      }
      return this.model;
    }
  },
  hasSoundModules: function() {
    return Array.isArray(this.soundModules) && this.soundModules.length > 0;
  },
  getSoundModuleById: function(moduleId) {
    return this.getSoundModuleByProperty('id', moduleId);
  },
  getSoundModulesByProperty: function(propertyName, propertyValue) {
    return this.soundModules.filter(propertyMatch)[0];
    function propertyMatch(element) {
      return element[propertyName] === propertyValue;
    }
  },
  get soundModuleIds() {
    return this.soundModules.map(captureIds);
    function captureIds(module) {
      return module.id;
    }
  },
  get soundModules() {
    return this.model.soundModules;
  },
  set soundModules(soundModules) {
    if (Array.isArray(soundModules)) {
      this.model.soundModules = soundModules;
    }
  },
  get playTime() {
    return this.model.playTime;
  },
  set playTime(time) {
    if (typeof time === 'number') {
      this.model.playTime = time;
    }
  },
  get soloCount() {
    return this.soundModules.filter(checkSoloCount).length;
    function checkSoloCount(soundModule, index, array) {
      return soundModule.solo === true;
    }
  }
}, {});
var $__default = Soundscape;

//# sourceMappingURL=<compileOutput>


},{"./modules/module-factory":4,"./services/soundscape-events":8,"./services/utils":9}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvaW5kZXguanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvbW9kdWxlcy9iaW5hdXJhbC1iZWF0LmpzIiwiL1VzZXJzL2ljaGFib2Rjb2xlL0Ryb3Bib3gvUHJvamVjdHMvQ29kZS9KUy9CcmFpbmJlYXRzRW5naW5lL3NyYy9zb3VuZHNjYXBlL21vZHVsZXMvY29sb3Itbm9pc2UuanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvbW9kdWxlcy9tb2R1bGUtZmFjdG9yeS5qcyIsIi9Vc2Vycy9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvc291bmRzY2FwZS9tb2R1bGVzL3Byb3BlcnR5LWNvbnRyb2wvcHJvcGVydHktY29udHJvbC5qcyIsIi9Vc2Vycy9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvc291bmRzY2FwZS9tb2R1bGVzL3NvdW5kLW1vZHVsZS5qcyIsIi9Vc2Vycy9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvc291bmRzY2FwZS9zZXJ2aWNlcy9ldmVudHMuanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvc2VydmljZXMvc291bmRzY2FwZS1ldmVudHMuanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvc2VydmljZXMvdXRpbHMuanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL3NvdW5kc2NhcGUvc291bmRzY2FwZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztFQUFPLFdBQVM7QUFLaEIsS0FBSyxRQUFRLEVBQUksV0FBUyxDQUFDO0FBQzNCOzs7OztBQ05BOzs7Ozs7Ozs7O0VBQU8sTUFBSTtFQUNKLFlBQVU7RUFDVixnQkFBYztBQUVyQixBQUFJLEVBQUEsQ0FBQSxvQkFBbUIsRUFBSTtBQUN2QixNQUFJLENBQUcsdUJBQXFCO0FBQzVCLEtBQUcsQ0FBRyx1QkFBcUI7QUFFM0IsU0FBTyxDQUFHLE9BQUs7QUFDZixNQUFJLENBQUc7QUFDSCxlQUFXLENBQUcsUUFBTTtBQUNwQixjQUFVLENBQUcsaUJBQWU7QUFDNUIsUUFBSSxDQUFHLElBQUU7QUFDVCxjQUFVLENBQUcsSUFBRTtBQUNmLGlCQUFhLENBQUcsS0FBRztBQUFBLEVBQ3ZCO0FBQ0EsU0FBTyxDQUFHO0FBQ04sZUFBVyxDQUFHLFdBQVM7QUFDdkIsY0FBVSxDQUFHLGlCQUFlO0FBQzVCLFFBQUksQ0FBRyxFQUFBO0FBQ1AsY0FBVSxDQUFHLEVBQUE7QUFDYixpQkFBYSxDQUFHLEtBQUc7QUFBQSxFQUN2QjtBQUFBLEFBQ0osQ0FBQzt1QkFFRCxTQUFNLG1CQUFpQixDQUNOLE1BQUssQ0FBRyxDQUFBLElBQUcsQ0FBRztBQUN2QixBQUFJLElBQUEsQ0FBQSxLQUFJLEVBQUksS0FBRyxDQUFDO0FBRWhCLGdGQUFNLE1BQUssQ0FBRyxLQUFHLEdBQUU7QUFDbkIsS0FBRyxNQUFNLEVBQUksQ0FBQSxLQUFJLFdBQVcsQUFBQyxDQUFDLEVBQUMsQ0FBRyxxQkFBbUIsQ0FBRyxDQUFB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Y0FBWSxDQUFDO0lBQ2xEO0FBQUEsRUFDSjtBQUVBLElBQUksZUFBYSxFQUFLO0FBQ2xCLFNBQU8sQ0FBQSxJQUFHLGFBQWEsSUFBSSxBQUFDLENBQUMsVUFBUyxDQUFDLENBQUM7QUFFeEMsV0FBUyxXQUFTLENBQUcsTUFBSyxDQUFHO0FBQ3pCLFdBQU8sQ0FBQSxNQUFLLEdBQUcsQ0FBQztJQUNwQjtBQUFBLEVBQ0o7QUFFQSxJQUFJLGFBQVcsRUFBSztBQUNoQixTQUFPLENBQUEsSUFBRyxNQUFNLGFBQWEsQ0FBQztFQUNsQztBQUVBLElBQUksYUFBVyxDQUFHLFlBQVcsQ0FBRztBQUM1QixPQUFJLEtBQUksUUFBUSxBQUFDLENBQUMsWUFBVyxDQUFDLENBQUc7QUFDN0IsU0FBRyxNQUFNLGFBQWEsRUFBSSxhQUFXLENBQUM7SUFDMUM7QUFBQSxFQUNKO0FBRUEsSUFBSSxTQUFPLEVBQUs7QUFDWixTQUFPLENBQUEsSUFBRyxNQUFNLFNBQVMsQ0FBQztFQUM5QjtBQUVBLElBQUksU0FBTyxDQUFHLElBQUcsQ0FBRztBQUNoQixPQUFJLE1BQU8sS0FBRyxDQUFBLEdBQU0sU0FBTyxDQUFHO0FBQzFCLFNBQUcsTUFBTSxTQUFTLEVBQUksS0FBRyxDQUFDO0lBQzlCO0FBQUEsRUFDSjtBQUVBLElBQUksVUFBUSxFQUFLO0FBQ2IsU0FBTyxDQUFBLElBQUcsYUFBYSxPQUFPLEFBQUMsQ0FBQyxjQUFhLENBQUMsT0FBTyxDQUFDO0FBRXRELFdBQVMsZUFBYSxDQUFHLFdBQVUsQ0FBRyxDQUFBLEtBQUksQ0FBRyxDQUFBLEtBQUksQ0FBRztBQUNoRCxXQUFPLENBQUEsV0FBVSxLQUFLLElBQU0sS0FBRyxDQUFDO0lBQ3BDO0FBQUEsRUFDSjtBQUFBO2VBR1csV0FBUztBQUN4QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU291bmRzY2FwZSBmcm9tICcuL3NvdW5kc2NhcGUnO1xuXG4vLyBVc2UgbW9kdWxlLmV4cG9ydHMgaW5zdGVhZCBvZiB0aGUgZXM2IHN5bnRheCBcImV4cG9ydHMgZGVmYXVsdFwiXG4vLyB0byBhdm9pZCBoYXZpbmcgdG8gdGhlIFwiZGVmYXVsdFwiIHByb3BlcnR5IG9mIHRoZSBleHBvcnRlZFxuLy8gQnJhaW5iZWF0c0VuZ2luZSBvYmplY3QuXG5tb2R1bGUuZXhwb3J0cyA9IFNvdW5kc2NhcGU7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vc2VydmljZXMvdXRpbHMnO1xuaW1wb3J0IFNvdW5kTW9kdWxlIGZyb20gJy4vc291bmQtbW9kdWxlJztcbmltcG9ydCBQcm9wZXJ0eUNvbnRyb2wgZnJvbSAnLi9wcm9wZXJ0eS1jb250cm9sL3Byb3BlcnR5LWNvbnRyb2wnO1xuXG52YXIgYmluYXVyYWxCZWF0RGVmYXVsdHMgPSB7XG4gICAgdGl0bGU6ICdCaW5hdXJhbCBCZWF0IE1vZHVsZScsXG4gICAgdHlwZTogJ2JpbmF1cmFsLWJlYXQtbW9kdWxlJyxcbiAgICAvLyBCaW5hdXJhbCBiZWF0IG1vZHVsZSBzcGVjaWZpYyBzZXR0aW5nc1xuICAgIHdhdmVUeXBlOiAnc2luZScsXG4gICAgcGl0Y2g6IHtcbiAgICAgICAgcHJvcGVydHlOYW1lOiAncGl0Y2gnLFxuICAgICAgICBjb250cm9sVHlwZTogJ3NsaWRlcl9jb250cm9sJyxcbiAgICAgICAgdmFsdWU6IDQ0MCxcbiAgICAgICAgc2xpZGVyVmFsdWU6IDQ0MCxcbiAgICAgICAgZm9sbG93TW9kdWxlSWQ6IG51bGxcbiAgICB9LFxuICAgIGJlYXRSYXRlOiB7XG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2JlYXRSYXRlJyxcbiAgICAgICAgY29udHJvbFR5cGU6ICdzbGlkZXJfY29udHJvbCcsXG4gICAgICAgIHZhbHVlOiA4LFxuICAgICAgICBzbGlkZXJWYWx1ZTogOCxcbiAgICAgICAgZm9sbG93TW9kdWxlSWQ6IG51bGxcbiAgICB9XG59O1xuXG5jbGFzcyBCaW5hdXJhbEJlYXRNb2R1bGUgZXh0ZW5kcyBTb3VuZE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IgKGNvbmZpZywgZGF0YSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICAvLyBDYWxsIHRoZSBzb3VuZCBTb3VuZE1vZHVsZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgc3VwZXIoY29uZmlnLCBkYXRhKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHV0aWxzLmRlZXBFeHRlbmQoe30sIGJpbmF1cmFsQmVhdERlZmF1bHRzLCB0aGlzLm1vZGVsKTtcblxuICAgICAgICAvLyBTZXQgdXAgdGhlIHNvdW5kIGdlbmVyYXRvclxuICAgICAgICB0aGlzLmdlbmVyYXRvciA9IG5ldyBCaW5hdXJhbEJlYXQodGhpcy5hdWRpb0N0eCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBzb3VuZCBnZW5lcmF0b3Igc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICB0aGlzLndhdmVUeXBlID0gdGhpcy5tb2RlbC53YXZlVHlwZTtcblxuICAgICAgICB2YXIgcHJvcGVydHlDb25maWcgPSB7XG4gICAgICAgICAgICBtb2R1bGVJZDogdGhpcy5pZCxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDcmVhdGUgcHJvcGVydHkgY29udHJvbHNcbiAgICAgICAgdGhpcy5waXRjaCAgICA9IG5ldyBQcm9wZXJ0eUNvbnRyb2wocHJvcGVydHlDb25maWcsIHRoaXMubW9kZWwucGl0Y2gpO1xuICAgICAgICB0aGlzLmJlYXRSYXRlID0gbmV3IFByb3BlcnR5Q29udHJvbChwcm9wZXJ0eUNvbmZpZywgdGhpcy5tb2RlbC5iZWF0UmF0ZSk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMgPSBPYmplY3QuYXNzaWduKHRoaXMuZXZlbnRzLCB7XG4gICAgICAgICAgICBwaXRjaEV2ZW50OiB0aGlzLnNjcEV2ZW50cy5vbignc291bmRtb2R1bGUnLCAncGl0Y2hDaGFuZ2UnLCBfc2VsZiwgX3NlbGYub25QaXRjaENoYW5nZSksXG4gICAgICAgICAgICBiZWF0UmF0ZUV2ZW50OiB0aGlzLnNjcEV2ZW50cy5vbignc291bmRtb2R1bGUnLCAnYmVhdFJhdGVDaGFuZ2UnLCBfc2VsZiwgX3NlbGYub25CZWF0UmF0ZUNoYW5nZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RhcnQgdGhlIGdlbmVyYXRvclxuICAgICAgICB0aGlzLmdlbmVyYXRvci5zdGFydCgpO1xuICAgIH1cblxuICAgIHJlbW92ZSAoKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRvci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuZ2Fpbk5vZGUuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIG9uUGl0Y2hDaGFuZ2UgKGUsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSwgJ2JlYXRSYXRlQ2hhbmdlJyk7XG4gICAgfVxuXG4gICAgb25CZWF0UmF0ZUNoYW5nZSAoZSwgZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLCAnYmVhdFJhdGVDaGFuZ2UnKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgKiAgICAgIEdldHRlcnMgYW5kIFNldHRlcnNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGdldCB3YXZlVHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLndhdmVUeXBlO1xuICAgIH1cblxuICAgIHNldCB3YXZlVHlwZSAodHlwZSkge1xuICAgICAgICBpZih0eXBlICE9PSB2b2lkIDAgJiYgdHlwZSAhPT0gbnVsbCAmJiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwud2F2ZVR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0b3Iuc2V0V2F2ZVR5cGUodGhpcy5tb2RlbC53YXZlVHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcGl0Y2ggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5waXRjaDtcbiAgICB9XG5cbiAgICBzZXQgcGl0Y2ggKHBpdGNoT2JqKSB7XG4gICAgICAgIGlmKHBpdGNoT2JqICE9PSB2b2lkIDAgJiYgdHlwZW9mIHBpdGNoT2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLnBpdGNoLCBwaXRjaE9iaik7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5zZXRQaXRjaCh0aGlzLm1vZGVsLnBpdGNoLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBiZWF0UmF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmJlYXRSYXRlO1xuICAgIH1cblxuICAgIHNldCBiZWF0UmF0ZSAoYmVhdFJhdGVPYmopIHtcbiAgICAgICAgaWYoYmVhdFJhdGVPYmogIT09IHZvaWQgMCAmJiB0eXBlb2YgYmVhdFJhdGVPYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kZWwuYmVhdFJhdGUsIGJlYXRSYXRlT2JqKTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdG9yLnNldEJlYXRSYXRlKHRoaXMubW9kZWwuYmVhdFJhdGUudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCaW5hdXJhbEJlYXRNb2R1bGU7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vc2VydmljZXMvdXRpbHMnO1xuaW1wb3J0IFNvdW5kTW9kdWxlIGZyb20gJy4vc291bmQtbW9kdWxlJztcblxudmFyIGNvbG9yTm9pc2VEZWZhdWx0cyA9IHtcbiAgICB0aXRsZTogXCJOb2lzZSBNb2R1bGVcIixcbiAgICB0eXBlOiAnbm9pc2UtbW9kdWxlJyxcbiAgICBub2lzZVR5cGU6ICdicm93bidcbn07XG5cbmNsYXNzIENvbG9yTm9pc2VNb2R1bGUgZXh0ZW5kcyBTb3VuZE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IgKGNvbmZpZywgZGF0YSkge1xuICAgICAgICBzdXBlcihjb25maWcsIGRhdGEpO1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSB1dGlscy5kZWVwRXh0ZW5kKHt9LCBjb2xvck5vaXNlRGVmYXVsdHMsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIC8vIFNldHVwIHRoZSBzb3VuZCBnZW5lcmF0b3JcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBuZXcgTm9pc2VHZW4odGhpcy5hdWRpb0N0eCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBzb3VuZCBnZW5lcmF0b3Igc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmdlbmVyYXRvci5zZXROb2lzZVR5cGUodGhpcy5tb2RlbC5ub2lzZVR5cGUpO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBnZW5lcmF0b3JcbiAgICAgICAgdGhpcy5nZW5lcmF0b3Iuc3RhcnQoKTtcbiAgICB9XG5cbiAgICByZW1vdmUgKCkge1xuICAgICAgICBzdXBlci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5nYWluTm9kZS5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICogICAgICBHZXR0ZXJzIGFuZCBTZXR0ZXJzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKioqIG5vaXNlVHlwZSAqKiovXG4gICAgZ2V0IG5vaXNlVHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLm5vaXNlVHlwZTtcbiAgICB9XG5cbiAgICBzZXQgbm9pc2VUeXBlICh0eXBlKSB7XG4gICAgICAgIGlmKHR5cGUgIT09IHZvaWQgMCAmJiB0eXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm5vaXNlVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5zZXROb2lzZVR5cGUodGhpcy5tb2RlbC5ub2lzZVR5cGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xvck5vaXNlTW9kdWxlO1xuIiwiaW1wb3J0IEJpbmF1cmFsQmVhdE1vZHVsZSBmcm9tICcuL2JpbmF1cmFsLWJlYXQnO1xuaW1wb3J0IENvbG9yTm9pc2VNb2R1bGUgZnJvbSAnLi9jb2xvci1ub2lzZSc7XG5cbnZhciBtb2R1bGVzID0ge1xuICAgICdub2lzZS1tb2R1bGUnOiBDb2xvck5vaXNlTW9kdWxlLFxuICAgICdiaW5hdXJhbC1iZWF0LW1vZHVsZSc6IEJpbmF1cmFsQmVhdE1vZHVsZVxufTtcblxudmFyIFNvdW5kTW9kdWxlRmFjdG9yeSA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGRhdGEpIHtcbiAgICAgICAgaWYgKG1vZHVsZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW9kdWxlc1t0eXBlXShjb25maWcsIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU291bmRNb2R1bGVGYWN0b3J5O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxzJztcbmltcG9ydCBzY3BFdmVudHMgZnJvbSAnLi4vLi4vc2VydmljZXMvc291bmRzY2FwZS1ldmVudHMnO1xuXG52YXIgcHJvcGVydHlDb250cm9sRGVmYXVsdHMgPSB7XG4gICAgICAgIHByb3BlcnR5TmFtZTogbnVsbCxcbiAgICAgICAgY29udHJvbFR5cGU6ICdzbGlkZXJfY29udHJvbCcsXG4gICAgICAgIGZvbGxvd01vZHVsZUlkOiBudWxsLFxuICAgICAgICBzbGlkZXJWYWx1ZTogMCxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIGdyYXBoOiBbXVxuICAgIH07XG5cbmNsYXNzIFByb3BlcnR5Q29udHJvbCB7XG4gICAgY29uc3RydWN0b3IgKGNvbmZpZywgZGF0YSkge1xuICAgICAgICB0aGlzLm1vZHVsZUlkID0gY29uZmlnLm1vZHVsZUlkO1xuICAgICAgICB0aGlzLm1vZGVsID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcGVydHlDb250cm9sRGVmYXVsdHMsIGRhdGEpO1xuICAgIH1cblxuICAgIHJlbW92ZSAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmUnKTtcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzICYgU2V0dGVyc1xuICAgIGdldCBkYXRhICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWw7XG4gICAgfVxuXG4gICAgc2V0IGRhdGEgKGRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCBkYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgY29udHJvbFR5cGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5jb250cm9sVHlwZTtcbiAgICB9XG5cbiAgICBzZXQgY29udHJvbFR5cGUgKGNvbnRyb2xUeXBlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuY29udHJvbFR5cGUgPSBjb250cm9sVHlwZTtcbiAgICB9XG5cbiAgICBnZXQgc2xpZGVyVmFsdWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5zbGlkZXJEYXRhO1xuICAgIH1cblxuICAgIHNldCBzbGlkZVZhbHVlIChzbGlkZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnNsaWRlVmFsdWUgPSBzbGlkZVZhbHVlO1xuICAgIH1cblxuICAgIGdldCBmb2xsb3dNb2R1bGVJZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmZvbGxvd01vZHVsZUlkO1xuICAgIH1cblxuICAgIHNldCBmb2xsb3dNb2R1bGVJZCAobW9kdWxlSWQpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5mb2xsb3dNb2R1bGVJZCA9IG1vZHVsZUlkO1xuICAgIH1cblxuICAgIGdldCBncmFwaCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmdyYXBoO1xuICAgIH1cblxuICAgIHNldCBncmFwaCAoZ3JhcGgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5ncmFwaCA9IGdyYXBoO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvcGVydHlDb250cm9sO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL3V0aWxzJztcbmltcG9ydCBzY3BFdmVudHMgZnJvbSAnLi4vc2VydmljZXMvc291bmRzY2FwZS1ldmVudHMnO1xuaW1wb3J0IFByb3BlcnR5Q29udHJvbCBmcm9tICcuL3Byb3BlcnR5LWNvbnRyb2wvcHJvcGVydHktY29udHJvbCc7XG5cbnZhciBzb3VuZE1vZHVsZURlZmF1bHRzID0ge1xuICAgICAgICBtdXRlZCAgOiBmYWxzZSxcbiAgICAgICAgc29sb2VkIDogZmFsc2UsXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHZvbHVtZSA6IHtcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3ZvbHVtZScsXG4gICAgICAgICAgICBjb250cm9sVHlwZTogJ3NsaWRlcl9jb250cm9sJyxcbiAgICAgICAgICAgIGZvbGxvd01vZHVsZUlkOiBudWxsLFxuICAgICAgICAgICAgc2xpZGVyVmFsdWU6IDAuNSxcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfVxuICAgIH07XG5cbmNsYXNzIFNvdW5kTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvciAoY29uZmlnLCBkYXRhKSB7XG4gICAgICAgIHRoaXMuYXVkaW9DdHggICA9IGNvbmZpZy5hdWRpb0N0eDtcbiAgICAgICAgdGhpcy5tYXN0ZXJHYWluID0gY29uZmlnLm1hc3RlckdhaW47XG4gICAgICAgIHRoaXMuZ2Fpbk5vZGUgICA9IGNvbmZpZy5hdWRpb0N0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIHRoaXMuc2NwRXZlbnRzICA9IHNjcEV2ZW50cztcblxuICAgICAgICAvLyBTZXR1cCBkZWZhdWx0IHZhbHVlcy5cbiAgICAgICAgdGhpcy5tb2RlbCA9IE9iamVjdC5hc3NpZ24oe30sIHNvdW5kTW9kdWxlRGVmYXVsdHMpO1xuXG4gICAgICAgIC8vIElmIHRoZSBkYXRhIGF0dHJpYnV0ZSBpcyBzZXQgYW5kIGlzIGFuIG9iamVjdFxuICAgICAgICAvLyBpbml0aWFsaXplIHRoaXMgbW9kZWwgd2l0aCBpdC5cbiAgICAgICAgaWYoZGF0YSAmJiB1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHZvbHVtZSBwcm9wZXJ0eSBjb250cm9sXG4gICAgICAgIHRoaXMudm9sdW1lID0gbmV3IFByb3BlcnR5Q29udHJvbCh7IG1vZHVsZUlkOiB0aGlzLmlkIH0sIHRoaXMubW9kZWwudm9sdW1lKTtcblxuICAgICAgICAvLyBFdmVudHNcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7XG4gICAgICAgICAgICBzb2xvRXZlbnQ6IHRoaXMuc2NwRXZlbnRzLm9uKCdzb3VuZHNjYXBlJywgJ3NvbG8nLCB0aGlzLCB0aGlzLm9uU29sb1VwZGF0ZSksXG4gICAgICAgICAgICB2b2x1bWVFdmVudDogdGhpcy5zY3BFdmVudHMub24odGhpcy5pZCwgJ3ZvbHVtZVVwZGF0ZScsIHRoaXMsIHRoaXMub25Wb2x1bWVVcGRhdGUpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRXZlbnQgSGFuZGxlcnNcbiAgICBvblZvbHVtZVVwZGF0ZSAoZSwgZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGUgPT09IHRydWUgJiYgdGhpcy5tdXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5nYWluID0gdGhpcy52b2x1bWUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNvbG9VcGRhdGUgKGUsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5zb2xvQ2hlY2soZGF0YS5zb2xvQ291bnQpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBBUElcbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLm1hc3RlckdhaW4pO1xuICAgIH1cblxuICAgIHN0b3AgKCkge1xuICAgICAgICB0aGlzLmdhaW5Ob2RlLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlICgpIHt9XG5cbiAgICByZW1vdmUgKCkge1xuICAgICAgICB0aGlzLnNvbG8gPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5ldmVudEJ1cy5vZmYoKTtcbiAgICB9XG5cbiAgICBzb2xvQ2hlY2sgKHNvbG9Db3VudCkge1xuICAgICAgICBpZighdGhpcy5tb2RlbC5zb2xvZWQgJiYgc29sb0NvdW50ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9sbG93TW9kdWxlUHJvcGVydHkgKG1vZHVsZUlkLCBwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzLFxuICAgICAgICAgICAgZm9sbG93TW9kdWxlID0gZm9sbG93TW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24oZm9sbG93TW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvbGxvd01vZHVsZS5pZCA9PT0gbW9kdWxlSWQ7XG4gICAgICAgICAgICB9KVswXTtcblxuICAgICAgICAvLyBzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7IHJldHVybiBmb2xsb3dNb2R1bGVbcHJvcGVydHldLnZhbHVlOyB9LCBmdW5jdGlvbiAocHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAvLyAgICAgX3NlbGZbcHJvcGVydHldLnZhbHVlID0gcHJvcGVydHkudmFsdWU7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAqICAgICAgR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZ2V0UHJvcGVydHlBdHRyaWJ1dGUocHJvcGVydHksIGF0dHJpYnV0ZSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiB0aGlzW3Byb3BlcnR5XS5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wZXJ0eV1bYXR0cmlidXRlXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFByb3BlcnR5QXR0cmlidXRlKHByb3BlcnR5LCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIHRoaXNbcHJvcGVydHldLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHldW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiogaWQgKioqL1xuICAgIGdldCBpZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmlkO1xuICAgIH1cblxuICAgIC8qKiogdGl0bGUgKioqL1xuICAgIGdldCB0aXRsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnRpdGxlO1xuICAgIH1cblxuICAgIHNldCB0aXRsZSAodGl0bGUpIHtcbiAgICAgICAgaWYgKHRpdGxlICE9IG51bGwgJiYgdHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC50aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKiB0eXBlICoqKi9cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnR5cGU7XG4gICAgfVxuXG4gICAgLyoqKiBnYWluICoqKi9cbiAgICBnZXQgZ2FpbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IGdhaW4gKGdhaW5JbnQpIHtcbiAgICAgICAgaWYoZ2FpbkludCAhPT0gdm9pZCAwICYmIHR5cGVvZiBnYWluSW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gZ2FpbkludDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiogc29sbyAqKiovXG4gICAgZ2V0IHNvbG8gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5zb2xvZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNvbG8gKHNvbG9Cb29sKSB7XG4gICAgICAgIGlmKHNvbG9Cb29sICE9PSB2b2lkIDAgJiYgdHlwZW9mIHNvbG9Cb29sID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sb2VkID0gc29sb0Jvb2w7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc29sbycpO1xuICAgICAgICAgICAgdGhpcy5zY3BFdmVudHMuYnJvYWRjYXN0KCdzb3VuZG1vZHVsZScsICdzb2xvJywgeyBzb2xvOiBzb2xvQm9vbCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiogbXV0ZSAqKiovXG4gICAgZ2V0IG11dGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5tdXRlZDtcbiAgICB9XG5cbiAgICBzZXQgbXV0ZSAobXV0ZUJvb2wpIHtcbiAgICAgICAgaWYobXV0ZUJvb2wgIT09IHZvaWQgMCAmJiB0eXBlb2YgbXV0ZUJvb2wgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5tdXRlZCA9IG11dGVCb29sO1xuICAgICAgICAgICAgaWYodGhpcy5lbmFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1vZGVsLm11dGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FpbiA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYWluID0gdGhpcy52b2x1bWUudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKiBlbmFibGUgKioqL1xuICAgIGdldCBlbmFibGUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuZW5hYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZW5hYmxlIChlbmFibGVCb29sKSB7XG4gICAgICAgIGlmKGVuYWJsZUJvb2wgIT09IHZvaWQgMCAmJiB0eXBlb2YgZW5hYmxlQm9vbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmVuYWJsZWQgPSBlbmFibGVCb29sO1xuICAgICAgICAgICAgaWYgKGVuYWJsZUJvb2wpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm11dGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FpbiA9IHRoaXMudm9sdW1lLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYWluID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiogdm9sdW1lICoqKi9cbiAgICBnZXQgdm9sdW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudm9sdW1lO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUgKHZvbHVtZU9iaikge1xuICAgICAgICB0aGlzLm1vZGVsLnZvbHVtZSA9IHZvbHVtZU9iajtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvdW5kTW9kdWxlO1xuIiwiY2xhc3MgRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEBkZXNjcmlwdGlvblxuICAgICogQnJvYWRjYXN0IGEgbWVzc2FnZSB0byBhIGNoYW5uZWwuXG4gICAgKlxuICAgICogQHBhcmFtIGNoYW5uZWxTdHIgc3RyaW5nXG4gICAgKiBAcGFyYW0gdG9waWNTdHIgc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgb3IgbGl0ZXJhbFxuICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICovXG4gICAgYnJvYWRjYXN0IChjaGFubmVsU3RyLCB0b3BpY1N0ciwgZGF0YSkge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgaWYgKCB0aGlzLm5vQ2hhbm5lbChjaGFubmVsU3RyKSApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW2NoYW5uZWxTdHJdO1xuICAgICAgICByZXR1cm4gY2hhbm5lbC5icm9hZGNhc3QodG9waWNTdHIsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBBdHRhY2ggYSBjaGFubmVsIGxpc3RlbmVyLlxuICAgICpcbiAgICAqIEBwYXJhbSBjaGFubmVsU3RyIHN0cmluZ1xuICAgICogQHBhcmFtIHRvcGljU3RyIHN0cmluZyB8fCB1bmRlZmluZWQgfHwgbnVsbFxuICAgICogQHBhcmFtIGNvbnRleHQgb2JqZWN0XG4gICAgKiBAcGFyYW0gbGlzdGVuZXJGdW5jIGZ1bmN0aW9uXG4gICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICAqL1xuICAgIG9uIChjaGFubmVsU3RyLCB0b3BpY1N0ciwgY29udGV4dCwgbGlzdGVuZXJGdW5jKSB7XG4gICAgICAgIHZhciBjaGFubmVsO1xuXG4gICAgICAgIGNoYW5uZWwgPSB0aGlzLnNldENoYW5uZWwoY2hhbm5lbFN0cik7XG4gICAgICAgIHJldHVybiBjaGFubmVsLm9uKHRvcGljU3RyLCBjb250ZXh0LCBsaXN0ZW5lckZ1bmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBSZW1vdmUgYSBjaGFubmVsIGxpc3RlbmVyLlxuICAgICpcbiAgICAqIEBwYXJhbSB0b2tlbiBzdHJpbmdcbiAgICAqIEBwYXJhbSBjaGFubmVsU3RyIHN0cmluZ1xuICAgICogQHBhcmFtIHRvcGljU3RyIHN0cmluZyB8fCB1bmRlZmluZWQgfHwgbnVsbFxuICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICovXG4gICAgb2ZmICh0b2tlbiwgY2hhbm5lbFN0ciwgdG9waWNTdHIpIHtcbiAgICAgICAgdmFyIGNoYW5uZWw7XG4gICAgICAgIGlmICggdGhpcy5ub0NoYW5uZWwoY2hhbm5lbFN0cikgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tjaGFubmVsU3RyXTtcbiAgICAgICAgcmV0dXJuIGNoYW5uZWwub2ZmKHRva2VuLCB0b3BpY1N0cik7XG4gICAgfVxuXG4gICAgc2V0Q2hhbm5lbCAoY2hhbm5lbFN0cikge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgaWYodGhpcy5ub0NoYW5uZWwoY2hhbm5lbFN0cikpIHtcbiAgICAgICAgICAgIGNoYW5uZWwgPSBuZXcgQ2hhbm5lbChjaGFubmVsU3RyKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbHNbY2hhbm5lbFN0cl0gPSBjaGFubmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbY2hhbm5lbFN0cl07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hhbm5lbDtcbiAgICB9XG5cbiAgICBnZXRDaGFubmVsKGNoYW5uZWxTdHIpIHtcbiAgICAgICAgdmFyIGNoYW5uZWw7XG4gICAgICAgIGlmKHRoaXMubm9DaGFubmVsKGNoYW5uZWxTdHIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tjaGFubmVsU3RyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGFubmVsO1xuICAgIH1cblxuICAgIG5vQ2hhbm5lbCAoY2hhbm5lbFN0cikge1xuICAgICAgICByZXR1cm4gY2hhbm5lbFN0ciA9PSBudWxsIHx8ICF0aGlzLmNoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWxTdHIpO1xuICAgIH1cbn1cblxuY2xhc3MgQ2hhbm5lbCB7XG4gICAgY29uc3RydWN0b3IgKGNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbE5hbWUgPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdGhpcy50b3BpY3MgPSB7fTtcbiAgICAgICAgdGhpcy5kZWZhdWx0VG9waWMgPSAnbWFpbic7XG4gICAgICAgIHRoaXMuc3ViVWlkID0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBAZGVzY3JpcHRpb25cbiAgICAqIEJyb2FkY2FzdCBhIG1lc3NhZ2UgdG8gYSBjaGFubmVsJ3MgdG9waWMocylcbiAgICAqXG4gICAgKiBAcGFyYW0gdG9waWNTdHIgc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgb3IgbGl0ZXJhbFxuICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICovXG4gICAgYnJvYWRjYXN0ICh0b3BpY1N0ciwgZGF0YSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIElmIGFuIGludmFsaWQgdG9waWMgdmFsdWUgaXMgcGFzc2VkIHJldHVybiBmYWxzZVxuICAgICAgICAvLyB1bmRlZmluZWQgYW5kIG51bGwgdmFsdWVzIHNob3VsZCBub3QgcmV0dXJuIGZhbHNlLlxuICAgICAgICBpZih0aGlzLm5vVG9waWModG9waWNTdHIpICYmIHRvcGljU3RyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG51bGwgb3IgdW5kZWZpbmVkIHdhcyBwYXNzZWRcbiAgICAgICAgLy8gYnJvYWRjYXN0cyB0byBhbGwgdG9waWNzIGluIHRoaXMgY2hhbm5lbC5cbiAgICAgICAgaWYgKCB0b3BpY1N0ciA9PSBudWxsICkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy50b3BpY3MpLmZvckVhY2goICh0b3BpYykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljXS5mb3JFYWNoKHVwZGF0ZVRvcGljKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b3BpY3NbdG9waWNTdHJdLmZvckVhY2godXBkYXRlVG9waWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gaXRlcmF0b3IgZnVuY3Rpb25cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVG9waWMgKHRvcGljT2JqLCBpbmRleCwgYXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIGV2dCA9IHtcbiAgICAgICAgICAgICAgICBjaGFubmVsOiBfc2VsZi5jaGFubmVsTmFtZSxcbiAgICAgICAgICAgICAgICB0b3BpYzogdG9waWNPYmoudG9waWMsXG4gICAgICAgICAgICAgICAgZnVuYzogdG9waWNPYmouZnVuYyxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB0b3BpY09iai5jb250ZXh0XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0b3BpY09iai5mdW5jLmNhbGwodG9waWNPYmouY29udGV4dCwgZXZ0LCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBBdHRhY2ggYSBjaGFubmVsIGxpc3RlbmVyLlxuICAgICpcbiAgICAqIEBwYXJhbSB0b3BpY1N0ciBzdHJpbmcgfHwgdW5kZWZpbmVkIHx8IG51bGxcbiAgICAqIEBwYXJhbSBjb250ZXh0IG9iamVjdFxuICAgICogQHBhcmFtIGxpc3RlbmVyRnVuYyBmdW5jdGlvblxuICAgICogQHJldHVybnMgdG9rZW4gc3RyaW5nXG4gICAgKi9cbiAgICBvbiAodG9waWNTdHIsIGNvbnRleHQsIGxpc3RlbmVyRnVuYykge1xuICAgICAgICB2YXIgdG9rZW4sIHRvcGljT2JqO1xuICAgICAgICBpZiAoIHRoaXMubm9Ub3BpYyh0b3BpY1N0cikgKSB7XG4gICAgICAgICAgICB0aGlzLnRvcGljc1t0b3BpY1N0cl0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuID0gKCArK3RoaXMuc3ViVWlkICkudG9TdHJpbmcoKTtcblxuICAgICAgICB0b3BpY09iaiA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgICAgIHRvcGljOiB0b3BpY1N0cixcbiAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICBmdW5jOiBsaXN0ZW5lckZ1bmNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnRvcGljc1t0b3BpY1N0cl0ucHVzaCh0b3BpY09iaik7XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEBkZXNjcmlwdGlvblxuICAgICogUmVtb3ZlIGEgY2hhbm5lbCBsaXN0ZW5lci5cbiAgICAqXG4gICAgKiBAcGFyYW0gdG9rZW4gc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcGFyYW0gdG9waWNTdHIgc3RyaW5nIHx8IHVuZGVmaW5lZCB8fCBudWxsXG4gICAgKiBAcGFyYW0gY29udGV4dCBvYmplY3RcbiAgICAqIEBwYXJhbSBsaXN0ZW5lckZ1bmMgZnVuY3Rpb25cbiAgICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICAqL1xuICAgIG9mZiAodG9rZW4sIHRvcGljU3RyKSB7XG4gICAgICAgIHZhciB0b3BpYyxcbiAgICAgICAgICAgIHJlbW92ZUFsbCAgPSBmYWxzZSxcbiAgICAgICAgICAgIHRva2VuRm91bmQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIHRoaXMubm9Ub3BpYyh0b3BpY1N0cikgJiYgdG9waWNTdHIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuID09IG51bGwpIHtcbiAgICAgICAgICAgIHJlbW92ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9waWNTdHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy50b3BpY3MpLmZvckVhY2goICh0b3BpY0tleSk9PiB7XG4gICAgICAgICAgICAgICAgdG9waWMgPSB0aGlzLnRvcGljc1t0b3BpY0tleV07XG4gICAgICAgICAgICAgICAgaWYgKHJlbW92ZUFsbCkge1xuICAgICAgICAgICAgICAgICAgICB0b3BpYyA9IFtdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcGljLmZvckVhY2gocmVtb3ZlVG9waWMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9waWMgPSB0aGlzLnRvcGljc1t0b3BpY1N0cl07XG4gICAgICAgICAgICBpZiAocmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICAgICAgdG9waWMgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9waWMuZm9yRWFjaChyZW1vdmVUb3BpYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhIHRva2VuIHdhcyBmb3VuZCByZXR1cm5zIHRydWUsXG4gICAgICAgIC8vIGlmIG5vIHRva2VuIGZvdW5kLCBidXQgcmVtb3ZlQWxsIGlzIHRydWUgcmV0dXJucyB0cnVlXG4gICAgICAgIC8vIHJldHVybnMgZmFsc2UgaWYgbm8gdG9rZW4gYW5kIHJlbW92ZUFsbCBpcyBmYWxzZS5cbiAgICAgICAgcmV0dXJuIHRva2VuRm91bmQgfHwgcmVtb3ZlQWxsO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVRvcGljICh0b3BpY09iaiwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgICAgICBpZih0b3BpY09iai50b2tlbiA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0b3BpYy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRva2VuRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm9Ub3BpYyAodG9waWNTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRvcGljU3RyID09IG51bGwgfHwgIXRoaXMudG9waWNzLmhhc093blByb3BlcnR5KHRvcGljU3RyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50cztcbiIsImltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuXG52YXIgc291bmRzY2FwZUV2ZW50cyA9IG5ldyBFdmVudHMoKTtcblxuZXhwb3J0IGRlZmF1bHQgc291bmRzY2FwZUV2ZW50cztcbiIsIi8vIFJlcXVpcmUgdGhlIG5vZGUtZGVlcC1leHRlbmQgcGFja2FnZVxuLy8gdmFyIGRlZXBFeHRlbmQgPSByZXF1aXJlKCdkZWVwLWV4dGVuZCcpO1xudmFyIHV0aWxzID0ge1xuICAgIGlzT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9IG51bGwpO1xuICAgIH0sXG4gICAgLy8gU3RvbGVuIGZyb20gaHR0cDovL3d3dy5uY3pvbmxpbmUubmV0L2Jsb2cvMjAxMi8xMi8xMS9hcmUteW91ci1taXhpbnMtZWNtYXNjcmlwdC01LWNvbXBhdGlibGUvXG4gICAgbWl4aW46IGZ1bmN0aW9uIChyZWNlaXZlciwgc3VwcGxpZXIpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc3VwcGxpZXIpLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlY2VpdmVyLCBwcm9wZXJ0eSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzdXBwbGllciwgcHJvcGVydHkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZWNlaXZlcjtcbiAgICB9LFxuXG4gICAgZGVlcEV4dGVuZDogZGVlcEV4dGVuZCxcbiAgICAvKipcbiAgICAqIEBkZXNjcmlwdGlvblxuICAgICogUmV0dXJucyBhIHZhbGlkIHV1aWRcbiAgICAqXG4gICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICAqL1xuICAgIHV1aWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpKjE2fDAsIHYgPSBjID09ICd4JyA/IHIgOiAociYweDN8MHg4KTtcbiAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLyohXG4gKiBOb2RlLkpTIG1vZHVsZSBcIkRlZXAgRXh0ZW5kXCJcbiAqIEBkZXNjcmlwdGlvbiBSZWN1cnNpdmUgb2JqZWN0IGV4dGVuZGluZy5cbiAqIEBhdXRob3IgVmlhY2hlc2xhdiBMb3RzbWFub3YgKHVuY2xlY2h1KSA8bG90c21hbm92ODlAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgTUlUXG4gKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIFZpYWNoZXNsYXYgTG90c21hbm92XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuICogdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuICogdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuICogdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2ZcbiAqIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuICogRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4gKiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4gKiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogRXh0ZW5pbmcgb2JqZWN0IHRoYXQgZW50ZXJlZCBpbiBmaXJzdCBhcmd1bWVudC5cbiAqIFJldHVybnMgZXh0ZW5kZWQgb2JqZWN0IG9yIGZhbHNlIGlmIGhhdmUgbm8gdGFyZ2V0IG9iamVjdCBvciBpbmNvcnJlY3QgdHlwZS5cbiAqIElmIHlvdSB3aXNoIHRvIGNsb25lIG9iamVjdCwgc2ltcGx5IHVzZSB0aGF0OlxuICogIGRlZXBFeHRlbmQoe30sIHlvdXJPYmpfMSwgW3lvdXJPYmpfTl0pIC0gZmlyc3QgYXJnIGlzIG5ldyBlbXB0eSBvYmplY3RcbiAqL1xuXG4gLy8gTW9kaWZpZWQgdG8gZXhjbHVkZSB1c2Ugb2YgQnVmZmVyIGNsYXNzLlxuZnVuY3Rpb24gZGVlcEV4dGVuZCAoLypvYmpfMSwgW29ial8yXSwgW29ial9OXSovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiBhcmd1bWVudHNbMF07XG5cbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgLy8gY29udmVydCBhcmd1bWVudHMgdG8gYXJyYXkgYW5kIGN1dCBvZmYgdGFyZ2V0IG9iamVjdFxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBrZXksIHZhbCwgc3JjLCBjbG9uZSwgdG1wQnVmO1xuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSByZXR1cm47XG5cbiAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoICEgKGtleSBpbiBvYmopKSBjb250aW51ZTtcblxuICAgICAgICAgICAgc3JjID0gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdGFyZ2V0KSBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnIHx8IHZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBuZXcgRGF0ZSh2YWwuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBuZXcgUmVnRXhwKHZhbCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3JjICE9PSAnb2JqZWN0JyB8fCBzcmMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjbG9uZSA9IChBcnJheS5pc0FycmF5KHZhbCkpID8gW10gOiB7fTtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IGRlZXBFeHRlbmQoY2xvbmUsIHZhbCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgICAgICBjbG9uZSA9IChBcnJheS5pc0FycmF5KHNyYykpID8gc3JjIDogW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsb25lID0gKCFBcnJheS5pc0FycmF5KHNyYykpID8gc3JjIDoge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gZGVlcEV4dGVuZChjbG9uZSwgdmFsKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXRpbHM7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi9zZXJ2aWNlcy91dGlscyc7XG5pbXBvcnQgc2NwRXZlbnRzIGZyb20gJy4vc2VydmljZXMvc291bmRzY2FwZS1ldmVudHMnO1xuaW1wb3J0IFNvdW5kTW9kdWxlRmFjdG9yeSBmcm9tICcuL21vZHVsZXMvbW9kdWxlLWZhY3RvcnknO1xuXG52YXIgU1RPUFBFRCA9ICdzdG9wcGVkJyxcbiAgICBQTEFZSU5HID0gJ3BsYXlpbmcnLFxuICAgIFBBVVNFRCAgPSAncGF1c2VkJztcblxuY2xhc3MgU291bmRzY2FwZSB7XG4gICAgY29uc3RydWN0b3IgKGF1ZGlvQ3R4LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYXVkaW9DdHggID0gYXVkaW9DdHg7XG4gICAgICAgIHRoaXMuZ2FpbiAgICAgID0gYXVkaW9DdHguY3JlYXRlR2FpbigpO1xuICAgICAgICB0aGlzLnN0YXRlICAgICA9IFNUT1BQRUQ7XG4gICAgICAgIHRoaXMuc2NwRXZlbnRzID0gc2NwRXZlbnRzO1xuICAgICAgICB0aGlzLm1vZGVsICAgICA9IHt9O1xuICAgICAgICB0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuZ2Fpbi5jb25uZWN0KHRoaXMuYXVkaW9DdHguZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnNjcEV2ZW50cy5vbignc291bmRtb2R1bGUnLCAnc29sbycsIHRoaXMsIHRoaXMuc29sb1VwZGF0ZSk7XG4gICAgfVxuXG4gICAgc29sb1VwZGF0ZSAoZSkge1xuICAgICAgICB0aGlzLnNjcEV2ZW50cy5icm9hZGNhc3QoJ3NvdW5kc2NhcGUnLCAnc29sbycsIHsgc29sb0NvdW50OiB0aGlzLnNvbG9Db3VudCB9KTtcbiAgICB9XG5cbiAgICBwbGF5ICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBMQVlJTkc7XG4gICAgICAgIGlmICh0aGlzLmhhc1NvdW5kTW9kdWxlcygpKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUuc3RhcnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHBhdXNlICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBBVVNFRDtcbiAgICAgICAgaWYgKHRoaXMuaGFzU291bmRNb2R1bGVzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZS5zdG9wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdG9wICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUT1BQRUQ7XG4gICAgICAgIGlmICh0aGlzLmhhc1NvdW5kTW9kdWxlcygpKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUuc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY3JlYXRlU291bmRNb2R1bGUgKG1vZHVsZURhdGEpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBtb2R1bGVEYXRhLnR5cGUsXG4gICAgICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgYXVkaW9DdHg6IHRoaXMuYXVkaW9DdHgsXG4gICAgICAgICAgICAgICAgbWFzdGVyR2FpbjogdGhpcy5nYWluXG4gICAgICAgICAgICB9O1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgaWQgZm9yIHRoZSBtb2R1bGVcbiAgICAgICAgLy8gaWYgb25lIGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICAgIGlmICggIW1vZHVsZURhdGEuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgICAgICAgIG1vZHVsZURhdGEuaWQgPSB1dGlscy51dWlkKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU291bmRNb2R1bGVGYWN0b3J5LmNyZWF0ZSh0eXBlLCBjb25maWcsIG1vZHVsZURhdGEpO1xuICAgIH1cblxuICAgIGFkZFNvdW5kTW9kdWxlIChtb2R1bGVEYXRhLCB1cGRhdGVTb2xvPXRydWUpIHtcbiAgICAgICAgdmFyIHNvdW5kTW9kdWxlO1xuXG4gICAgICAgIGlmKCAhbW9kdWxlRGF0YS5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzb3VuZE1vZHVsZSA9IHRoaXMuY3JlYXRlU291bmRNb2R1bGUobW9kdWxlRGF0YSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzT2JqZWN0KHNvdW5kTW9kdWxlKSkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZE1vZHVsZXMucHVzaChzb3VuZE1vZHVsZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBQTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgc291bmRNb2R1bGUuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc29sb0NvdW50ID4gMCAmJiB1cGRhdGVTb2xvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2xvVXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc291bmRNb2R1bGU7XG4gICAgfVxuXG4gICAgcmVtb3ZlU291bmRNb2R1bGUgKG1vZHVsZUlkKSB7XG4gICAgICAgIHRoaXMuc291bmRNb2R1bGVzLmZvckVhY2gocmVtb3ZlTW9kdWxlKTtcblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVNb2R1bGUgKG1vZHVsZSwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgICAgICBpZiAobW9kdWxlLmlkID09PSBtb2R1bGVJZCkge1xuICAgICAgICAgICAgICAgIG1vZHVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kdWxlSWQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsU291bmRNb2R1bGVzICgpIHtcbiAgICAgICAgaWYodGhpcy5zb3VuZE1vZHVsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb3VuZE1vZHVsZXMuZm9yRWFjaChyZW1vdmVNb2R1bGUpO1xuICAgICAgICB0aGlzLnNvdW5kTW9kdWxlcyA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZU1vZHVsZSAobW9kdWxlKSB7XG4gICAgICAgICAgICBtb2R1bGUucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCAoKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB0aGlzLnJlbW92ZUFsbFNvdW5kTW9kdWxlcygpO1xuICAgICAgICB0aGlzLm1vZGVsID0ge307XG4gICAgICAgIHRoaXMubW9kZWwuc291bmRNb2R1bGVzID0gW107XG4gICAgfVxuXG4gICAgcGFyc2VKc29uIChqc29uKSB7XG4gICAgICAgIGlmIChqc29uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgICAgIGlmIChqc29uLnNvdW5kTW9kdWxlcykge1xuICAgICAgICAgICAgICAgIHZhciBzb3VuZE1vZHVsZXMgPSBqc29uLnNvdW5kTW9kdWxlcztcblxuICAgICAgICAgICAgICAgIHNvdW5kTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU291bmRNb2R1bGUobW9kdWxlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbG9jYWwgbW9kZWxcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBPYmplY3QuYXNzaWduKHt9LCBqc29uLCB0aGlzLm1vZGVsKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc29sb0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29sb1VwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1NvdW5kTW9kdWxlcyAoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMuc291bmRNb2R1bGVzKSAmJiB0aGlzLnNvdW5kTW9kdWxlcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAqICAgICAgR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZ2V0U291bmRNb2R1bGVCeUlkIChtb2R1bGVJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTb3VuZE1vZHVsZUJ5UHJvcGVydHkoJ2lkJywgbW9kdWxlSWQpO1xuICAgIH1cblxuICAgIGdldFNvdW5kTW9kdWxlc0J5UHJvcGVydHkgKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VuZE1vZHVsZXMuZmlsdGVyKHByb3BlcnR5TWF0Y2gpWzBdO1xuXG4gICAgICAgIGZ1bmN0aW9uIHByb3BlcnR5TWF0Y2goZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbcHJvcGVydHlOYW1lXSA9PT0gcHJvcGVydHlWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzb3VuZE1vZHVsZUlkcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvdW5kTW9kdWxlcy5tYXAoY2FwdHVyZUlkcyk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2FwdHVyZUlkcyAobW9kdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlLmlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNvdW5kTW9kdWxlcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcztcbiAgICB9XG5cbiAgICBzZXQgc291bmRNb2R1bGVzIChzb3VuZE1vZHVsZXMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc291bmRNb2R1bGVzKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMgPSBzb3VuZE1vZHVsZXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcGxheVRpbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5wbGF5VGltZTtcbiAgICB9XG5cbiAgICBzZXQgcGxheVRpbWUgKHRpbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5wbGF5VGltZSA9IHRpbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc29sb0NvdW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291bmRNb2R1bGVzLmZpbHRlcihjaGVja1NvbG9Db3VudCkubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU29sb0NvdW50IChzb3VuZE1vZHVsZSwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gc291bmRNb2R1bGUuc29sbyA9PT0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmRzY2FwZTtcbiJdfQ==
