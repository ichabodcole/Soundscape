!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.BrainbeatsEngine=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__utils__,
    $__modules_47_module_45_factory__;
var utils = ($__utils__ = require("./utils"), $__utils__ && $__utils__.__esModule && $__utils__ || {default: $__utils__}).default;
var SoundModuleFactory = ($__modules_47_module_45_factory__ = require("./modules/module-factory"), $__modules_47_module_45_factory__ && $__modules_47_module_45_factory__.__esModule && $__modules_47_module_45_factory__ || {default: $__modules_47_module_45_factory__}).default;
var STOPPED = 'stopped',
    PLAYING = 'playing',
    PAUSED = 'paused';
var BrainbeatsEngine = function BrainbeatsEngine(audioCtx, options) {
  this.audioCtx = audioCtx;
  this.gain = ctx.createGain();
  this.state = STOPPED;
  this.model = {};
  this.model.soundModules = [];
  this.gain.connect(this.audioCtx.destination);
};
($traceurRuntime.createClass)(BrainbeatsEngine, {
  play: function() {
    this.state = PLAYING;
    if (this.model.soundModules) {
      this.model.soundModules.forEach(function(module) {
        module.start();
      });
    }
  },
  pause: function() {
    this.state = PAUSED;
    console.log('paused');
    this.stop();
  },
  stop: function() {
    this.state = STOPPED;
    if (this.model.soundModules) {
      this.model.soundModules.forEach(function(module) {
        module.stop();
      });
    }
  },
  createSoundModule: function(moduleData) {
    var soundModule,
        type = moduleData.type,
        data = {
          audioCtx: this.audioCtx,
          masterGain: this.gain,
          data: moduleData
        };
    return SoundModuleFactory.create(type, data);
  },
  addSoundModule: function(moduleData) {
    var soundModule = this.createSoundModule(moduleData);
    if (utils.isObject(soundModule)) {
      this.model.soundModules.push(soundModule);
      if (this.state === PLAYING) {
        soundModule.start();
      }
      if (this.soloCount > 0) {
        soundModule.soloCheck();
      }
    }
  },
  removeSoundModule: function() {
    this.model.soundModules.forEach(removeModule);
    function removeModule(module, index, array) {
      if (module.id === id) {
        module.remove();
        module = null;
        array.splice(index, 1);
      }
    }
  },
  removeAllSoundModules: function() {
    this.model.soundModules.forEach(removeModule);
    this.model.soundModules = [];
    function removeModule(module) {
      module.remove();
    }
  },
  reset: function() {
    this.stop();
    if (this.model.soundModules.length > 0) {
      this.removeAllSoundModules();
    }
    this.model = {};
    this.model.soundModules = [];
  },
  parseJson: function(json) {
    if (json instanceof Object) {
      this.reset();
      if (json.soundModules) {
        var soundModules = json.soundModules;
        soundModules.forEach(function(module, index) {
          this.addSoundModule(module);
        }, this);
      }
      this.model = Object.assign({}, json, this.model);
      if (this.soloCount > 0) {}
      return this.model;
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
var $__default = BrainbeatsEngine;


},{"./modules/module-factory":5,"./utils":7}],2:[function(require,module,exports){
"use strict";
var $__brainbeats_45_engine__;
var BrainbeatsEngine = ($__brainbeats_45_engine__ = require("./brainbeats-engine"), $__brainbeats_45_engine__ && $__brainbeats_45_engine__.__esModule && $__brainbeats_45_engine__ || {default: $__brainbeats_45_engine__}).default;
module.exports = BrainbeatsEngine;


},{"./brainbeats-engine":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__sound_45_module__;
var SoundModule = ($__sound_45_module__ = require("./sound-module"), $__sound_45_module__ && $__sound_45_module__.__esModule && $__sound_45_module__ || {default: $__sound_45_module__}).default;
var binauralBeatDefaults = {
  title: "Binaural Beat Module",
  type: 'binaural-beat-module',
  waveType: 'sine',
  pitch: {
    ref: "pitch",
    controlType: 'slider_control',
    value: 440,
    sliderValue: 440,
    followModuleId: null
  },
  beatRate: {
    ref: "beatRate",
    controlType: 'slider_control',
    value: 8,
    sliderValue: 8,
    followModuleId: null
  }
};
var BinauralBeatModule = function BinauralBeatModule(options) {
  $traceurRuntime.superCall(this, $BinauralBeatModule.prototype, "constructor", [options]);
  this.model = Object.assign({}, binauralBeatDefaults, this.model);
  this.generator = new BinauralBeat(this.audioCtx);
  this.generator.connect(this.gainNode);
  this.waveType = this.model.waveType;
  this.pitch = this.model.pitch;
  this.beatRate = this.model.beatRate;
  this.generator.start();
};
var $BinauralBeatModule = BinauralBeatModule;
($traceurRuntime.createClass)(BinauralBeatModule, {
  remove: function() {
    $traceurRuntime.superCall(this, $BinauralBeatModule.prototype, "remove", []);
    this.generator.disconnect();
    this.gainNode.disconnect();
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


},{"./sound-module":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__sound_45_module__;
var SoundModule = ($__sound_45_module__ = require("./sound-module"), $__sound_45_module__ && $__sound_45_module__.__esModule && $__sound_45_module__ || {default: $__sound_45_module__}).default;
var colorNoiseDefaults = {
  title: "Noise Module",
  type: 'noise-module',
  noiseType: 'brown'
};
var ColorNoiseModule = function ColorNoiseModule(options) {
  $traceurRuntime.superCall(this, $ColorNoiseModule.prototype, "constructor", [options]);
  this.model = Object.assign({}, colorNoiseDefaults, this.model);
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


},{"./sound-module":6}],5:[function(require,module,exports){
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
var SoundModuleFactory = {create: function(type, options) {
    if (modules.hasOwnProperty(type)) {
      return new modules[type](options);
    } else {
      return false;
    }
  }};
var $__default = SoundModuleFactory;


},{"./binaural-beat":3,"./color-noise":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47_utils__;
var utils = ($___46__46__47_utils__ = require("../utils"), $___46__46__47_utils__ && $___46__46__47_utils__.__esModule && $___46__46__47_utils__ || {default: $___46__46__47_utils__}).default;
var soundModuleDefaults = {
  muted: false,
  soloed: false,
  enabled: true,
  volume: {
    ref: 'volume',
    controlType: 'slider_control',
    followModuleId: null,
    sliderValue: 0.5,
    value: 0.5
  }
};
var SoundModule = function SoundModule(options) {
  this.audioCtx = options.audioCtx;
  this.masterGain = options.masterGain;
  this.gainNode = this.audioCtx.createGain();
  this.model = Object.assign({}, soundModuleDefaults);
  if (options.data && utils.isObject(options.data)) {
    Object.assign(this.model, options.data);
  }
  this.volume = this.model.volume;
};
($traceurRuntime.createClass)(SoundModule, {
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
    if (volumeObj !== void 0 && typeof volumeObj === 'object') {
      Object.assign(this.model.volume, volumeObj);
      if (this.enable === true && this.mute === false) {
        this.gain = this.volume.value;
      }
    }
  }
}, {});
var $__default = SoundModule;


},{"../utils":7}],7:[function(require,module,exports){
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
      Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
    });
  }
};
var $__default = utils;


},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWNoYWJvZGNvbGUvRHJvcGJveC9Qcm9qZWN0cy9Db2RlL0pTL0JyYWluYmVhdHNFbmdpbmUvc3JjL2JyYWluYmVhdHMtZW5naW5lL2JyYWluYmVhdHMtZW5naW5lLmpzIiwiL1VzZXJzL2ljaGFib2Rjb2xlL0Ryb3Bib3gvUHJvamVjdHMvQ29kZS9KUy9CcmFpbmJlYXRzRW5naW5lL3NyYy9icmFpbmJlYXRzLWVuZ2luZS9pbmRleC5qcyIsIi9Vc2Vycy9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvYnJhaW5iZWF0cy1lbmdpbmUvbW9kdWxlcy9iaW5hdXJhbC1iZWF0LmpzIiwiL1VzZXJzL2ljaGFib2Rjb2xlL0Ryb3Bib3gvUHJvamVjdHMvQ29kZS9KUy9CcmFpbmJlYXRzRW5naW5lL3NyYy9icmFpbmJlYXRzLWVuZ2luZS9tb2R1bGVzL2NvbG9yLW5vaXNlLmpzIiwiL1VzZXJzL2ljaGFib2Rjb2xlL0Ryb3Bib3gvUHJvamVjdHMvQ29kZS9KUy9CcmFpbmJlYXRzRW5naW5lL3NyYy9icmFpbmJlYXRzLWVuZ2luZS9tb2R1bGVzL21vZHVsZS1mYWN0b3J5LmpzIiwiL1VzZXJzL2ljaGFib2Rjb2xlL0Ryb3Bib3gvUHJvamVjdHMvQ29kZS9KUy9CcmFpbmJlYXRzRW5naW5lL3NyYy9icmFpbmJlYXRzLWVuZ2luZS9tb2R1bGVzL3NvdW5kLW1vZHVsZS5qcyIsIi9Vc2Vycy9pY2hhYm9kY29sZS9Ecm9wYm94L1Byb2plY3RzL0NvZGUvSlMvQnJhaW5iZWF0c0VuZ2luZS9zcmMvYnJhaW5iZWF0cy1lbmdpbmUvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNDQTs7Ozs7Ozs7O0VBQU8sTUFBSTtFQUNKLG1CQUFpQjtBQUV4QixBQUFJLEVBQUEs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Q0FBRztBQUM3QyxXQUFHLEtBQUssRUFBSSxDQUFBLElBQUcsT0FBTyxNQUFNLENBQUM7TUFDakM7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBO2VBR1csWUFBVTtBQUN6Qjs7O0FDMUtBOzs7Ozs7O0FBQUEsQUFBSSxFQUFBLENBQUEsS0FBSSxFQUFJO0FBQ1IsU0FBTyxDQUFHLFVBQVUsR0FBRSxDQUFHO0FBQ3JCLFNBQU8sRUFBQyxNQUFPLElBQUUsQ0FBQSxHQUFNLFNBQU8sQ0FBQSxFQUFLLENBQUEsR0FBRSxHQUFLLEtBQUcsQ0FBQyxDQUFDO0VBQ25EO0FBRUEsTUFBSSxDQUFHLFVBQVUsUUFBTyxDQUFHLENBQUEsUUFBTyxDQUFHO0FBQ2pDLFNBQUssS0FBSyxBQUFDLENBQUMsUUFBTyxDQUFDLFFBQVEsQUFBQyxDQUFDLFNBQVMsUUFBTyxDQUFHO0FBQzdDLFdBQUssZUFBZSxBQUFDLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBRyxDQUFBLE1BQUsseUJBQXlCLEFBQUMsQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDLENBQUM7RUFDTjtBQUFBLEFBQ0osQ0FBQztlQUVjLE1BQUk7QUFDbkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gaW1wb3J0IGV4dGVuZCBmcm9tICd1dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgU291bmRNb2R1bGVGYWN0b3J5IGZyb20gJy4vbW9kdWxlcy9tb2R1bGUtZmFjdG9yeSc7XG5cbnZhciBTVE9QUEVEID0gJ3N0b3BwZWQnLFxuICAgIFBMQVlJTkcgPSAncGxheWluZycsXG4gICAgUEFVU0VEICA9ICdwYXVzZWQnO1xuXG5jbGFzcyBCcmFpbmJlYXRzRW5naW5lIHtcbiAgICBjb25zdHJ1Y3RvciAoYXVkaW9DdHgsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hdWRpb0N0eCA9IGF1ZGlvQ3R4O1xuICAgICAgICB0aGlzLmdhaW4gICAgID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5zdGF0ZSAgICA9IFNUT1BQRUQ7XG4gICAgICAgIHRoaXMubW9kZWwgICAgPSB7fTtcbiAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMgPSBbXTtcblxuICAgICAgICB0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmF1ZGlvQ3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgLy8gX3Njb3BlLiRvbignYmI6c291bmRtb2R1bGU6c29sbycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vICAgICBfc2NvcGUuJGJyb2FkY2FzdCgnYmI6c291bmRzY2FwZTpzb2xvJywgX3NlbGYuc29sb0NvdW50KTtcbiAgICAgICAgLy8gICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIF9zY29wZS4kb24oJ2JiOnNvdW5kbW9kdWxlOnJlbW92ZScsIGZ1bmN0aW9uIChlLCBtb2R1bGVJZCkge1xuICAgICAgICAvLyAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gICAgIF9zZWxmLnJlbW92ZVNvdW5kTW9kdWxlKG1vZHVsZUlkKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgcGxheSAoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQTEFZSU5HO1xuICAgICAgICBpZih0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlLnN0YXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhdXNlICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBBVVNFRDtcbiAgICAgICAgY29uc29sZS5sb2coJ3BhdXNlZCcpO1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG5cbiAgICBzdG9wICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUT1BQRUQ7XG4gICAgICAgIGlmKHRoaXMubW9kZWwuc291bmRNb2R1bGVzKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUuc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVTb3VuZE1vZHVsZSAobW9kdWxlRGF0YSkge1xuICAgICAgICB2YXIgc291bmRNb2R1bGUsXG4gICAgICAgICAgICB0eXBlID0gbW9kdWxlRGF0YS50eXBlLFxuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhdWRpb0N0eDogdGhpcy5hdWRpb0N0eCxcbiAgICAgICAgICAgICAgICBtYXN0ZXJHYWluOiB0aGlzLmdhaW4sXG4gICAgICAgICAgICAgICAgZGF0YTogbW9kdWxlRGF0YVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFNvdW5kTW9kdWxlRmFjdG9yeS5jcmVhdGUodHlwZSwgZGF0YSk7XG4gICAgfVxuXG4gICAgYWRkU291bmRNb2R1bGUgKG1vZHVsZURhdGEpIHtcbiAgICAgICAgdmFyIHNvdW5kTW9kdWxlID0gdGhpcy5jcmVhdGVTb3VuZE1vZHVsZShtb2R1bGVEYXRhKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNPYmplY3Qoc291bmRNb2R1bGUpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcy5wdXNoKHNvdW5kTW9kdWxlKTtcblxuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZSA9PT0gUExBWUlORykge1xuICAgICAgICAgICAgICAgIHNvdW5kTW9kdWxlLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnNvbG9Db3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBzb3VuZE1vZHVsZS5zb2xvQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNvdW5kTW9kdWxlICgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMuZm9yRWFjaChyZW1vdmVNb2R1bGUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZU1vZHVsZSAobW9kdWxlLCBpbmRleCwgYXJyYXkpIHtcbiAgICAgICAgICAgIGlmKG1vZHVsZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgbW9kdWxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsU291bmRNb2R1bGVzICgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMuZm9yRWFjaChyZW1vdmVNb2R1bGUpO1xuICAgICAgICB0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcyA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZU1vZHVsZSAobW9kdWxlKSB7XG4gICAgICAgICAgICBtb2R1bGUucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCAoKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICBpZih0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFNvdW5kTW9kdWxlcygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwgPSB7fTtcbiAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMgPSBbXTtcbiAgICB9XG5cbiAgICBwYXJzZUpzb24gKGpzb24pIHtcbiAgICAgICAgaWYoanNvbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgICAgICBpZihqc29uLnNvdW5kTW9kdWxlcykge1xuICAgICAgICAgICAgICAgIHZhciBzb3VuZE1vZHVsZXMgPSBqc29uLnNvdW5kTW9kdWxlcztcblxuICAgICAgICAgICAgICAgIHNvdW5kTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU291bmRNb2R1bGUobW9kdWxlKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IE9iamVjdC5hc3NpZ24oe30sIGpzb24sIHRoaXMubW9kZWwpO1xuXG4gICAgICAgICAgICBpZih0aGlzLnNvbG9Db3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBfc2NvcGUuJGJyb2FkY2FzdCgnYmI6c291bmRzY2FwZTpzb2xvJywgdGhpcy5zb2xvQ291bnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAqICAgICAgR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZ2V0IHNvdW5kTW9kdWxlcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnNvdW5kTW9kdWxlcztcbiAgICB9XG5cbiAgICBzZXQgc291bmRNb2R1bGVzIChzb3VuZE1vZHVsZXMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc291bmRNb2R1bGVzKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb3VuZE1vZHVsZXMgPSBzb3VuZE1vZHVsZXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcGxheVRpbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5wbGF5VGltZTtcbiAgICB9XG5cbiAgICBzZXQgcGxheVRpbWUgKHRpbWUpIHtcbiAgICAgICAgaWYodHlwZW9mIHRpbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnBsYXlUaW1lID0gdGltZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzb2xvQ291bnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VuZE1vZHVsZXMuZmlsdGVyKGNoZWNrU29sb0NvdW50KS5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTb2xvQ291bnQgKHNvdW5kTW9kdWxlLCBpbmRleCwgYXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VuZE1vZHVsZS5zb2xvID09PSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcmFpbmJlYXRzRW5naW5lO1xuIiwiaW1wb3J0IEJyYWluYmVhdHNFbmdpbmUgZnJvbSAnLi9icmFpbmJlYXRzLWVuZ2luZSc7XG4vLyBVc2UgbW9kdWxlLmV4cG9ydHMgaW5zdGVhZCBvZiB0aGUgZXM2IHN5bnRheCBcImV4cG9ydHMgZGVmYXVsdFwiXG4vLyB0byBhdm9pZCBoYXZpbmcgdG8gdGhlIFwiZGVmYXVsdFwiIHByb3BlcnR5IG9mIHRoZSBleHBvcnRlZFxuLy8gQnJhaW5iZWF0c0VuZ2luZSBvYmplY3QuXG5tb2R1bGUuZXhwb3J0cyA9IEJyYWluYmVhdHNFbmdpbmU7XG4iLCJpbXBvcnQgU291bmRNb2R1bGUgZnJvbSAnLi9zb3VuZC1tb2R1bGUnO1xuXG52YXIgYmluYXVyYWxCZWF0RGVmYXVsdHMgPSB7XG4gICAgdGl0bGU6IFwiQmluYXVyYWwgQmVhdCBNb2R1bGVcIixcbiAgICB0eXBlOiAnYmluYXVyYWwtYmVhdC1tb2R1bGUnLFxuICAgIC8vIEJpbmF1cmFsIGJlYXQgbW9kdWxlIHNwZWNpZmljIHNldHRpbmdzXG4gICAgd2F2ZVR5cGU6ICdzaW5lJyxcbiAgICBwaXRjaDoge1xuICAgICAgICByZWY6IFwicGl0Y2hcIixcbiAgICAgICAgY29udHJvbFR5cGU6ICdzbGlkZXJfY29udHJvbCcsXG4gICAgICAgIHZhbHVlOiA0NDAsXG4gICAgICAgIHNsaWRlclZhbHVlOiA0NDAsXG4gICAgICAgIGZvbGxvd01vZHVsZUlkOiBudWxsXG4gICAgfSxcbiAgICBiZWF0UmF0ZToge1xuICAgICAgICByZWY6IFwiYmVhdFJhdGVcIixcbiAgICAgICAgY29udHJvbFR5cGU6ICdzbGlkZXJfY29udHJvbCcsXG4gICAgICAgIHZhbHVlOiA4LFxuICAgICAgICBzbGlkZXJWYWx1ZTogOCxcbiAgICAgICAgZm9sbG93TW9kdWxlSWQ6IG51bGxcbiAgICB9XG59O1xuXG5jbGFzcyBCaW5hdXJhbEJlYXRNb2R1bGUgZXh0ZW5kcyBTb3VuZE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ2FsbCB0aGUgc291bmQgU291bmRNb2R1bGUgY29uc3RydWN0b3IuXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLm1vZGVsID0gT2JqZWN0LmFzc2lnbih7fSwgYmluYXVyYWxCZWF0RGVmYXVsdHMsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIC8vIFNldCB1cCB0aGUgc291bmQgZ2VuZXJhdG9yXG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gbmV3IEJpbmF1cmFsQmVhdCh0aGlzLmF1ZGlvQ3R4KTtcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHNvdW5kIGdlbmVyYXRvciBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMud2F2ZVR5cGUgPSB0aGlzLm1vZGVsLndhdmVUeXBlO1xuICAgICAgICB0aGlzLnBpdGNoICAgID0gdGhpcy5tb2RlbC5waXRjaDtcbiAgICAgICAgdGhpcy5iZWF0UmF0ZSA9IHRoaXMubW9kZWwuYmVhdFJhdGU7XG5cbiAgICAgICAgLy8gU3RhcnQgdGhlIGdlbmVyYXRvclxuICAgICAgICB0aGlzLmdlbmVyYXRvci5zdGFydCgpO1xuICAgIH1cblxuICAgIHJlbW92ZSAoKSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRvci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuZ2Fpbk5vZGUuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAqICAgICAgR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZ2V0IHdhdmVUeXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwud2F2ZVR5cGU7XG4gICAgfVxuXG4gICAgc2V0IHdhdmVUeXBlICh0eXBlKSB7XG4gICAgICAgIGlmKHR5cGUgIT09IHZvaWQgMCAmJiB0eXBlICE9PSBudWxsICYmIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC53YXZlVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5zZXRXYXZlVHlwZSh0aGlzLm1vZGVsLndhdmVUeXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwaXRjaCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnBpdGNoO1xuICAgIH1cblxuICAgIHNldCBwaXRjaCAocGl0Y2hPYmopIHtcbiAgICAgICAgaWYocGl0Y2hPYmogIT09IHZvaWQgMCAmJiB0eXBlb2YgcGl0Y2hPYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubW9kZWwucGl0Y2gsIHBpdGNoT2JqKTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdG9yLnNldFBpdGNoKHRoaXMubW9kZWwucGl0Y2gudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGJlYXRSYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuYmVhdFJhdGU7XG4gICAgfVxuXG4gICAgc2V0IGJlYXRSYXRlIChiZWF0UmF0ZU9iaikge1xuICAgICAgICBpZihiZWF0UmF0ZU9iaiAhPT0gdm9pZCAwICYmIHR5cGVvZiBiZWF0UmF0ZU9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RlbC5iZWF0UmF0ZSwgYmVhdFJhdGVPYmopO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0b3Iuc2V0QmVhdFJhdGUodGhpcy5tb2RlbC5iZWF0UmF0ZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpbmF1cmFsQmVhdE1vZHVsZTtcbiIsImltcG9ydCBTb3VuZE1vZHVsZSBmcm9tICcuL3NvdW5kLW1vZHVsZSc7XG5cbnZhciBjb2xvck5vaXNlRGVmYXVsdHMgPSB7XG4gICAgdGl0bGU6IFwiTm9pc2UgTW9kdWxlXCIsXG4gICAgdHlwZTogJ25vaXNlLW1vZHVsZScsXG4gICAgbm9pc2VUeXBlOiAnYnJvd24nXG59O1xuXG5jbGFzcyBDb2xvck5vaXNlTW9kdWxlIGV4dGVuZHMgU291bmRNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSBPYmplY3QuYXNzaWduKHt9LCBjb2xvck5vaXNlRGVmYXVsdHMsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIC8vIFNldHVwIHRoZSBzb3VuZCBnZW5lcmF0b3JcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBuZXcgTm9pc2VHZW4odGhpcy5hdWRpb0N0eCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBzb3VuZCBnZW5lcmF0b3Igc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmdlbmVyYXRvci5zZXROb2lzZVR5cGUodGhpcy5tb2RlbC5ub2lzZVR5cGUpO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBnZW5lcmF0b3JcbiAgICAgICAgdGhpcy5nZW5lcmF0b3Iuc3RhcnQoKTtcbiAgICB9XG5cbiAgICByZW1vdmUgKCkge1xuICAgICAgICBzdXBlci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5nYWluTm9kZS5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICogICAgICBHZXR0ZXJzIGFuZCBTZXR0ZXJzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKioqIG5vaXNlVHlwZSAqKiovXG4gICAgZ2V0IG5vaXNlVHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLm5vaXNlVHlwZTtcbiAgICB9XG5cbiAgICBzZXQgbm9pc2VUeXBlICh0eXBlKSB7XG4gICAgICAgIGlmKHR5cGUgIT09IHZvaWQgMCAmJiB0eXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm5vaXNlVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5zZXROb2lzZVR5cGUodGhpcy5tb2RlbC5ub2lzZVR5cGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xvck5vaXNlTW9kdWxlO1xuIiwiaW1wb3J0IEJpbmF1cmFsQmVhdE1vZHVsZSBmcm9tICcuL2JpbmF1cmFsLWJlYXQnO1xuaW1wb3J0IENvbG9yTm9pc2VNb2R1bGUgZnJvbSAnLi9jb2xvci1ub2lzZSc7XG5cbnZhciBtb2R1bGVzID0ge1xuICAgICdub2lzZS1tb2R1bGUnOiBDb2xvck5vaXNlTW9kdWxlLFxuICAgICdiaW5hdXJhbC1iZWF0LW1vZHVsZSc6IEJpbmF1cmFsQmVhdE1vZHVsZVxufTtcblxudmFyIFNvdW5kTW9kdWxlRmFjdG9yeSA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uICh0eXBlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChtb2R1bGVzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vZHVsZXNbdHlwZV0ob3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTb3VuZE1vZHVsZUZhY3Rvcnk7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG52YXIgc291bmRNb2R1bGVEZWZhdWx0cyA9IHtcbiAgICAgICAgbXV0ZWQgIDogZmFsc2UsXG4gICAgICAgIHNvbG9lZCA6IGZhbHNlLFxuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICB2b2x1bWUgOiB7XG4gICAgICAgICAgICByZWY6ICd2b2x1bWUnLFxuICAgICAgICAgICAgY29udHJvbFR5cGU6ICdzbGlkZXJfY29udHJvbCcsXG4gICAgICAgICAgICBmb2xsb3dNb2R1bGVJZDogbnVsbCxcbiAgICAgICAgICAgIHNsaWRlclZhbHVlOiAwLjUsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH1cbiAgICB9O1xuXG5jbGFzcyBTb3VuZE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hdWRpb0N0eCAgID0gb3B0aW9ucy5hdWRpb0N0eDtcbiAgICAgICAgdGhpcy5tYXN0ZXJHYWluID0gb3B0aW9ucy5tYXN0ZXJHYWluO1xuICAgICAgICB0aGlzLmdhaW5Ob2RlICAgPSB0aGlzLmF1ZGlvQ3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgLy8gU2V0dXAgZGVmYXVsdCB2YWx1ZXMuXG5cbiAgICAgICAgdGhpcy5tb2RlbCA9IE9iamVjdC5hc3NpZ24oe30sIHNvdW5kTW9kdWxlRGVmYXVsdHMpO1xuXG4gICAgICAgIC8vIElmIHRoZSBkYXRhIGF0dHJpYnV0ZSBpcyBzZXQgYW5kIGlzIGFuIG9iamVjdFxuICAgICAgICAvLyBpbml0aWFsaXplIHRoaXMgbW9kZWwgd2l0aCBpdC5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhICYmIHV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuZGF0YSkpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RlbCwgb3B0aW9ucy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudm9sdW1lID0gdGhpcy5tb2RlbC52b2x1bWU7XG5cbiAgICAgICAgLy8gdGhpcy5zY29wZS4kb24oJ2JiOnNvdW5kc2NhcGU6c29sbycsIGZ1bmN0aW9uIChlLCBzb2xvQ291bnQpIHtcbiAgICAgICAgLy8gICAgIF9zZWxmLnNvbG9DaGVjayhzb2xvQ291bnQpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLm1hc3RlckdhaW4pO1xuICAgIH1cblxuICAgIHN0b3AgKCkge1xuICAgICAgICB0aGlzLmdhaW5Ob2RlLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlICgpIHt9XG5cbiAgICByZW1vdmUgKCkge1xuICAgICAgICB0aGlzLnNvbG8gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzb2xvQ2hlY2sgKHNvbG9Db3VudCkge1xuICAgICAgICBpZighdGhpcy5tb2RlbC5zb2xvZWQgJiYgc29sb0NvdW50ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9sbG93TW9kdWxlUHJvcGVydHkgKG1vZHVsZUlkLCBwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzLFxuICAgICAgICAgICAgZm9sbG93TW9kdWxlID0gZm9sbG93TW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24oZm9sbG93TW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvbGxvd01vZHVsZS5pZCA9PT0gbW9kdWxlSWQ7XG4gICAgICAgICAgICB9KVswXTtcblxuICAgICAgICAvLyBzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7IHJldHVybiBmb2xsb3dNb2R1bGVbcHJvcGVydHldLnZhbHVlOyB9LCBmdW5jdGlvbiAocHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAvLyAgICAgX3NlbGZbcHJvcGVydHldLnZhbHVlID0gcHJvcGVydHkudmFsdWU7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAqICAgICAgR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqKiBpZCAqKiovXG4gICAgZ2V0IGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuaWQ7XG4gICAgfVxuXG4gICAgLyoqKiB0aXRsZSAqKiovXG4gICAgZ2V0IHRpdGxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IHRpdGxlICh0aXRsZSkge1xuICAgICAgICBpZiAodGl0bGUgIT0gbnVsbCAmJiB0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqIHR5cGUgKioqL1xuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudHlwZTtcbiAgICB9XG5cbiAgICAvKioqIGdhaW4gKioqL1xuICAgIGdldCBnYWluICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZ2FpbiAoZ2FpbkludCkge1xuICAgICAgICBpZihnYWluSW50ICE9PSB2b2lkIDAgJiYgdHlwZW9mIGdhaW5JbnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSBnYWluSW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKiBzb2xvICoqKi9cbiAgICBnZXQgc29sbyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnNvbG9lZDtcbiAgICB9XG5cbiAgICBzZXQgc29sbyAoc29sb0Jvb2wpIHtcbiAgICAgICAgaWYoc29sb0Jvb2wgIT09IHZvaWQgMCAmJiB0eXBlb2Ygc29sb0Jvb2wgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2xvZWQgPSBzb2xvQm9vbDtcbiAgICAgICAgICAgIC8vIHRoaXMuc2NvcGUuJGVtaXQoJ2JiOnNvdW5kbW9kdWxlOnNvbG8nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiogbXV0ZSAqKiovXG4gICAgZ2V0IG11dGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5tdXRlZDtcbiAgICB9XG5cbiAgICBzZXQgbXV0ZSAobXV0ZUJvb2wpIHtcbiAgICAgICAgaWYobXV0ZUJvb2wgIT09IHZvaWQgMCAmJiB0eXBlb2YgbXV0ZUJvb2wgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5tdXRlZCA9IG11dGVCb29sO1xuICAgICAgICAgICAgaWYodGhpcy5lbmFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1vZGVsLm11dGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FpbiA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYWluID0gdGhpcy52b2x1bWUudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKiBlbmFibGUgKioqL1xuICAgIGdldCBlbmFibGUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuZW5hYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZW5hYmxlIChlbmFibGVCb29sKSB7XG4gICAgICAgIGlmKGVuYWJsZUJvb2wgIT09IHZvaWQgMCAmJiB0eXBlb2YgZW5hYmxlQm9vbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmVuYWJsZWQgPSBlbmFibGVCb29sO1xuICAgICAgICAgICAgaWYgKGVuYWJsZUJvb2wpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm11dGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FpbiA9IHRoaXMudm9sdW1lLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYWluID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiogdm9sdW1lICoqKi9cbiAgICBnZXQgdm9sdW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudm9sdW1lO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUgKHZvbHVtZU9iaikge1xuICAgICAgICBpZih2b2x1bWVPYmogIT09IHZvaWQgMCAmJiB0eXBlb2Ygdm9sdW1lT2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLnZvbHVtZSwgdm9sdW1lT2JqKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZSA9PT0gdHJ1ZSAmJiB0aGlzLm11dGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYWluID0gdGhpcy52b2x1bWUudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvdW5kTW9kdWxlO1xuIiwidmFyIHV0aWxzID0ge1xuICAgIGlzT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9IG51bGwpO1xuICAgIH0sXG4gICAgLy8gU3RvbGVuIGZyb20gaHR0cDovL3d3dy5uY3pvbmxpbmUubmV0L2Jsb2cvMjAxMi8xMi8xMS9hcmUteW91ci1taXhpbnMtZWNtYXNjcmlwdC01LWNvbXBhdGlibGUvXG4gICAgbWl4aW46IGZ1bmN0aW9uIChyZWNlaXZlciwgc3VwcGxpZXIpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc3VwcGxpZXIpLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZWNlaXZlciwgcHJvcGVydHksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc3VwcGxpZXIsIHByb3BlcnR5KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHV0aWxzO1xuIl19
