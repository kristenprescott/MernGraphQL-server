const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  // TODO: add title to postSchema
  title: String,
  body: String,
  username: String,
  tags: [String],
  selectedFile: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      likes: [
        {
          username: String,
          createdAt: String,
        },
      ],
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", postSchema);

/*
mutation createPost{
  createPost(title: "Yo Momma SO Fat", body: "when she skips a meal, the stock market drops.", tags: ["yo momma", "stonks"], selectedFile: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK"){
    id
    title
    body
    tags
    selectedFile
    username
    createdAt
  }
}
*/

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWU0NmIxMzQ0YTRhZWQzMGI2ZjY4NyIsImVtYWlsIjoicHJlc2NvdHRkYXJsaW5nQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWVsbG8iLCJpYXQiOjE2MjYyNDA1NjIsImV4cCI6MTYyNjI0NDE2Mn0.gMGSj4GgwHIKVIOSZbCdM0cl35coLeFupqBu0_4zYF8
*/

/*
mutation {
  login(username: "aello", password: "lamppost"){
    id
    email
    token
    username
    createdAt
  }
}


{
  "data": {
    "login": {
      "id": "60ee46b1344a4aed30b6f687",
      "email": "prescottdarling@gmail.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWU0NmIxMzQ0YTRhZWQzMGI2ZjY4NyIsImVtYWlsIjoicHJlc2NvdHRkYXJsaW5nQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWVsbG8iLCJpYXQiOjE2MjYyNDIxMTUsImV4cCI6MTYyNjI0NTcxNX0.yXhP1HZCSt309yaFqYVQPamFwYG6rwJmUHjkdrybKkY",
      "username": "aello",
      "createdAt": "2021-07-14T02:06:41.316Z"
    }
  }
}
*/
