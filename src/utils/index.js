export const handleFetch = (API, callback) => {
  const TOKEN = localStorage.getItem("filx_token");
  fetch(API, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then(res => res.json())
    .then(data => callback(data));
};
