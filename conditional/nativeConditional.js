const { performance } = require('perf_hooks');
const { wait } = require('../common');

//wait1, wait2 in parallel wait3 needs wait1, wait2 and wait4 needs wait3
const conditional = async () => {
  const results = await Promise.all([wait(100, 'task1'), wait(200, 'task2')]);
  const wait3result = await wait(300, `${results[0]} : ${results[1]} : task3`);
  return await wait(400, `${wait3result} : task4`);
};

performance.mark('A');
conditional().then(result => {
  performance.mark('B');
  performance.measure('AtoBTime', 'A', 'B');
  const measure = performance.getEntriesByName('AtoBTime')[0];
  console.log('conditional duration', measure.duration);
  console.log(result);
});
