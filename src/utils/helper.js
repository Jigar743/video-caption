export const makeTimeArray = (time) => {
  let temp = [];
  for (let i = 0; i <= time; i++) {
    if (i >= 0 && i < 10) {
      temp.push(`0${i}`);
    } else {
      temp.push(`${i}`);
    }
  }

  return temp;
};

export const convertIntoSeconds = (time) => {
  let seconds = 0;

  seconds += parseInt(time.hour) * 3600;
  seconds += parseInt(time.minute) * 60;
  seconds += parseInt(time.second);

  return seconds;
};
