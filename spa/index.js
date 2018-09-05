// THINGS TO do

// RENDER SCREEN
//    SHOW TONE BUTTONS
//    PLAY SEQUENCE
console.log('index.js');

const noteFrequencyMap = {
  c: 261.6,
  d: 293.7,
  e: 329.7,
  f: 349.2,
  g: 392,
  a: 440,
  b: 493
}

var audioContext = new AudioContext();

function playFrequency(frequency) {
  // create 2 second worth of audio buffer, with single channels and sampling rate of your device.
  var sampleRate = audioContext.sampleRate;
  var duration = 2*sampleRate;
  var numChannels = 1;
  var buffer  = audioContext.createBuffer(numChannels, duration, sampleRate);
  // fill the channel with the desired frequency's data
  var channelData = buffer.getChannelData(0);
  for (var i = 0; i < sampleRate; i++) {
    channelData[i]=Math.sin(2*Math.PI*frequency*i/(sampleRate));
  }

  // create audio source node.
  var source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);

  // finally start to play
  source.start(0);
}

function playNote(note) {
  const frequency = noteFrequencyMap[note]
  playFrequency(frequency)
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Here you can manipulate your DOM!')

  const els = document.querySelectorAll('.tone-button')
  console.log(els)

  els.forEach(el => {
    el.addEventListener('click', function() {
      playNote(el.dataset.tone)
    });
    //const tone = el.data.tone
    console.log(el.dataset.tone);
  })
})
