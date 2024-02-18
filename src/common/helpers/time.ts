export const minutesToHHMM = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

export const timestampToStartDay = (timestamp) => {
  // Create a new Date object using the provided timestamp
  const date = new Date(Number(timestamp));

  // Extract year, month, and day from the original timestamp
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Create a new Date object with the time set to midnight (00:00:00) of that day
  const newDate = new Date(year, month, day);

  // Return the timestamp of the new Date object
  return newDate.getTime();
};
