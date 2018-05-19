const { performance } = require('perf_hooks');
const async = require('async');
const { wait } = require('../common');

performance.mark('A');
async.auto(
  {
    task1: function(callback) {
      wait(100, 'task1').then(result => callback(null, result));
    },
    task2: function(callback) {
      wait(200, 'task2').then(result => callback(null, result));
    },
    task3: [
      'task1',
      'task2',
      function(results, callback) {
        wait(300, `${results.task1} : ${results.task2} : task3`).then(result =>
          callback(null, result)
        );
      }
    ],
    task4: [
      'task3',
      function(results, callback) {
        wait(400, `${results.task3} : task4`).then(result =>
          callback(null, result)
        );
      }
    ]
  },
  function(err, results) {
    performance.mark('B');
    performance.measure('AtoBTime', 'A', 'B');
    const measure = performance.getEntriesByName('AtoBTime')[0];
    console.log('series duration', measure.duration);
    console.log(results.task4);
  }
);
