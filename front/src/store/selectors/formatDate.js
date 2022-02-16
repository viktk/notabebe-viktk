export const formatDate = (comment) => {
  const date = new Date(comment);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}/${year}`;
};

export const formatHour = (comment) => {
  const date = new Date(comment);
  let heure = date.getHours();
  let minutes = date.getMinutes();

  if (heure < 10) {
    heure = `0${heure}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${heure}h${minutes}`;
};



export const changeDate = (date) => {
  const newDate = date.split('-').reverse().join('/')
  return newDate
}

export const napTime = (time) => {
  const newTime = time.split(':').splice(0, 2).join(' h ')
  return newTime
}
