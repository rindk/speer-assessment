export const formatTimeFromNumber = (time) => {
  if (!Number.isInteger(time)) {
    return '00:00:00';
  }
  if (time < 0) {
    time = 0;
  }
  // time /= 1000;

  const hour = ('0' + Math.floor(time / 3600)).slice(-2);
  const min = ('0' + Math.floor((time % 3600) / 60)).slice(-2);
  const sec = ('0' + Math.floor(time % 60)).slice(-2);
  return `${hour}:${min}:${sec}`;
};
