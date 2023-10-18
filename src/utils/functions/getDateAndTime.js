const getDateAndTime = rawTime => {
  const time = new Date(rawTime);
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return [formattedDate, formattedTime];
};

export default getDateAndTime;
