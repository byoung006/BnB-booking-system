export const handleDateFormat = (savedEvents) => {
  //format date to Month Day, Year format
  return new Date(savedEvents).toDateString();
};
