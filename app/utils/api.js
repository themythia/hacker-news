const url = 'https://hacker-news.firebaseio.com/v0/';
const format = '.json?print=pretty';
export const fetchStoryIds = (type) => {
  const api = `${url}${type}stories${format}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      return listItems(data.slice(0, 50));
    })
    .catch((error) => console.log(error));
};

const fetchItem = (id) => {
  const api = `${url}item/${id}${format}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const listItems = (array) => {
  //using promise.all for parallel fetch
  //filtering only stories, not dead or deleted
  return Promise.all(
    array.map((id) => fetchItem(id).then((data) => data))
  ).then((data) =>
    data.filter(
      (item) =>
        item.type == 'story' && item.dead !== true && item.deleted !== true
    )
  );
};

export const fetchUser = (name) => {
  const api = `${url}user/${name}${format}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const user = data;
      const list = listItems(data.submitted.slice(0, 10));
      return [user, list];
    })
    .catch((error) => console.log(error));
};
