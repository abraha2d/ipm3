export const getAMPM = (unixTime: number) => {
  return new Date(unixTime * 1000).getHours() >= 12 ? "pm" : "am";
};

export const getTime = (unixTime: number) => {
  return new Date(unixTime * 1000)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    .split(" ")[0];
};
