"use strict";
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var bbe = new BrainbeatsEngine(ctx);
$.ajax('data/soundscape.json').success(function(data) {
  bbe.parseJson(data);
  bbe.play();
});
