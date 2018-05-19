const { performance } = require('perf_hooks');
const { wait } = require('../common');

//task in serires
const series = async () => {
  const wait1result = await wait(100, 'task1');
  const wait2result = await wait(200, `${wait1result} : task2`);
  const wait3result = await wait(300, `${wait2result} : task3`);
  return wait(300, `${wait3result} : task4`);
};

performance.mark('A');
series().then(result => {
  performance.mark('B');
  performance.measure('AtoBTime', 'A', 'B');
  const measure = performance.getEntriesByName('AtoBTime')[0];
  console.log('series duration', measure.duration);
  console.log(result);
});
