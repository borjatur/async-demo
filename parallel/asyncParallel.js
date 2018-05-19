const { performance } = require('perf_hooks');
const async = require('async');
const { wait } = require('../common');

performance.mark('A');
async.parallel(
  [
    function(callback) {
      wait(100, 'task1').then(result => callback(null, result));
    },
    function(callback) {
      wait(200, 'task2').then(result => callback(null, result));
    },
    function(callback) {
      wait(300, 'task3').then(result => callback(null, result));
    },
    function(callback) {
      wait(400, 'task4').then(result => callback(null, result));
    }
  ],
  function(err, results) {
    performance.mark('B');
    performance.measure('AtoBTime', 'A', 'B');
    const measure = performance.getEntriesByName('AtoBTime')[0];
    console.log('series duration', measure.duration);
    console.log(results);
  }
);
