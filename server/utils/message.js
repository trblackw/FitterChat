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

module.exports = { generateMessage };
