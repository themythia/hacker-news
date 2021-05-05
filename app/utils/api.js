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
  return Promise.all(array.map((id) => fetchItem(id).then((data) => data)))
    .then((data) =>
      data.filter(
        (item) =>
          item.type == 'story' && item.dead !== true && item.deleted !== true
      )
    )
    .catch((error) => console.log(error));
};

export const fetchUser = (name) => {
  const api = `${url}user/${name}${format}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const user = data;
      const list = listItems(data.submitted.slice(0, 30));
      return [user, list];
    })
    .catch((error) => console.log(error));
};

export const fetchComments = (id) => {
  const api = `${url}item/${id}${format}`;
  return fetch(api)
    .then((res) => res.json())
    .then((data) => iterateComments(data.kids, data))
    .catch((error) => console.log(error));
};

const iterateComments = (array, data) => {
  const post = {
    by: data.by,
    time: data.time,
    title: data.title,
    url: data.url,
    descendants: data.descendants,
    id: data.id,
  };
  const comments = Promise.all(
    array.map((id) => fetchItem(id).then((data) => data))
  )
    .then((data) =>
      data.filter(
        (item) =>
          item.type == 'comment' && item.dead !== true && item.deleted !== true
      )
    )
    .catch((error) => console.log(error));

  return [post, comments];
};
