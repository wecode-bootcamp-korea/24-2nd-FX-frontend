export const handleFetch = (API, callback) => {
  fetch(API)
    .then(res => res.json())
    .then(data => callback(data));
};
