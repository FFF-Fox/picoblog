module.exports = function (title, body) {
  let post = {};

  post.title = title;
  post.body = body;

  post.toString = function () {
    return `Post -> title = ${post.title}, body = ${post.body}`;
  };

  return post;
}
