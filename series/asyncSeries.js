const { performance } = require('perf_hooks');
const async = require('async');
const { wait } = require('../common');

performance.mark('A');
async.waterfall(
  [
    function(callback) {
      wait(100, 'task1').then(result => callback(null, result));
    },
    function(task1result, callback) {
      wait(200, `${task1result} : task2`).then(result =>
        callback(null, result)
      );
    },
    function(task2result, callback) {
      wait(300, `${task2result} : task3`).then(result =>
        callback(null, result)
      );
    },
    function(task3result, callback) {
      wait(400, `${task3result} : task4`).then(result =>
        callback(null, result)
      );
    }
  ],
  function(err, result) {
    performance.mark('B');
    performance.measure('AtoBTime', 'A', 'B');
    const measure = performance.getEntriesByName('AtoBTime')[0];
    console.log('series duration', measure.duration);
    console.log(result);
  }
);
