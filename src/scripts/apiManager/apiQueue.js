export const apiQueue = (ticksPerMinute = 12) => {
  const tasks = [];
  const DELAY_BETWEEN_MILLISECONDS = (60 / ticksPerMinute) * 1000;
  let isRunning = false;

  const add = (
    taskToAdd,
    taskArguments,
    setter,
    hasPriority,
    repeat,
    ticksPerMinuteOverride
  ) => {
    const newDeferredTask = deferredTask(taskToAdd, taskArguments, setter);
    const taskToQueue = {
      task: newDeferredTask,
      hasPriority,
      repeat,
      ticksPerMinuteOverride,
    };
    if (hasPriority) tasks.unshift(taskToQueue);
    else tasks.push(taskToQueue);
  };
  const run = async () => {
    let currentDelay = DELAY_BETWEEN_MILLISECONDS;
    if (isRunning) {
      if (tasks.length > 0) {
        const currentTask = tasks.shift();
        try {
          await currentTask.task.execute();
        } catch (e) {
          console.log("error");
        }

        if (currentTask.repeat) tasks.push(currentTask);
        if (currentTask.ticksPerMinuteOverride) {
          const delay = currentTask.ticksPerMinuteOverride;
          currentDelay = (60 / delay) * 1000;
        }
      }
      setTimeout(run, currentDelay);
    }
  };
  const pause = () => {
    console.log("stopping");
    isRunning = false;
  };
  const start = () => {
    if (!isRunning) {
      console.log("starting");
      isRunning = true;
      run();
    }
  };
  return { add, pause, start };
};

const deferredTask = (task, taskArguments, setterFunction) => {
  const execute = async () => {
    await task(...taskArguments).then((value) => {
      setterFunction(value);
    });
  };
  return { execute };
};
