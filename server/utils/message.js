const formatTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: formatTime()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
   return {
      from, 
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt: formatTime()
   }
}

module.exports = { generateMessage, generateLocationMessage };
