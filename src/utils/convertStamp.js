function convertStamp(createdAt, type) {
  const date = new Date(createdAt.split("T")[0]);
  const options = {
    weekday: "long",
    month: "long",
    timeZone: "UTC",
    timeZoneName: "short",
  };
  const fullDay = new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .split(" ");

  let cleanFormat = date
    .toUTCString()
    .replace(fullDay[1].slice(0, 3), fullDay[1]) // Change week day to full
    .replace(fullDay[0].slice(0, 3), fullDay[0]); // Change moth to full

  cleanFormat = cleanFormat.replace(" 00:00:00 GMT", "");
  cleanFormat = cleanFormat.split(fullDay[1]);
  cleanFormat[0] = fullDay[1];
  return cleanFormat; // ["Sunday", ", June 2023"];
}

export default convertStamp;
