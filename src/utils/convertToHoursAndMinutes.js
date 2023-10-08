export default function convertToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}ч${String(remainingMinutes).padStart(2, '0')}м`;
}
