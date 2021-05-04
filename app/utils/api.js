export const fetchStoryIds = (type) => {
  const url = `https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const list = listItems(data.slice(0, 50));
      return list;
    })
    .catch((error) => console.log(error));
};

const fetchItem = (id) => {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

const listItems = (array) => {
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
