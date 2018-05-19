const { performance } = require('perf_hooks');
const { wait } = require('../common');

const parallel = async () => {
  return await Promise.all([
    wait(100, 'task1'),
    wait(200, 'task2'),
    wait(300, 'task3'),
    wait(400, 'task4')
  ]);
};

performance.mark('A');
parallel().then(results => {
  performance.mark('B');
  performance.measure('AtoBTime', 'A', 'B');
  const measure = performance.getEntriesByName('AtoBTime')[0];
  console.log('parallel duration', measure.duration);
  console.log(results);
});
