const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    // each Query, Modification, or Subscription returns a Post, it will go through this POST MODIFIER and apply these mods:
    likeCount(parent) {
      console.log("likeCount parent: ", parent); // <<--- see bottom for terminal output
      return parent.likes.length;
    },
    // same as above but => func
    commentCount: (parent) => parent.comments.length,
  },
  // TODO: figure out/finish adding commentComments & commentLikes
  // Comments: {
  //   likeCount(parent) {
  //     return parent.likes.length;
  //   },
  //   commentCount(parent) {
  //     return parent.comments.length;
  //   },
  // },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};

/*
-->> console.log("likeCount parent: ", parent); -->> 

likeCount parent:  {
  tags: [ 'yo momma', 'jokes' ],
  _id: 60ef1eb0eef01e124d52882c,
  title: 'Yo Momma is Really Dumb',
  body: "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'",
  selectedFile: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK',
  user: 60ee46b1344a4aed30b6f687,
  username: 'aello',
  createdAt: '2021-07-14T17:28:16.040Z',
  comments: [
    {
      _id: 60ef240b2a35a5138cfe94b2,
      body: 'comment testing',
      username: 'aello',
      createdAt: '2021-07-14T17:51:07.620Z',
      likes: []
    }
  ],
  likes: [
    {
      _id: 60ef2273d3016613693535b1,
      username: 'aello',
      createdAt: '2021-07-14T17:44:19.567Z'
    }
  ],
  __v: 9
}
likeCount parent:  {
  tags: [ 'yo momma', 'stonks' ],
  _id: 60ee7e2d97afd5fc75f2411c,
  title: 'Yo Momma SO Fat',
  body: 'when she skips a meal, the stock market drops.',
  selectedFile: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK',
  user: 60ee46b1344a4aed30b6f687,
  username: 'aello',
  createdAt: '2021-07-14T06:03:25.618Z',
  comments: [
    {
      _id: 60ef1a511328e01132bc3123,
      body: 'test comment',
      username: 'aello',
      createdAt: '2021-07-14T17:09:37.759Z',
      likes: []
    }
  ],
  likes: [
    {
      _id: 60ef3f2f0a21ab1e9c476db4,
      username: 'aello',
      createdAt: '2021-07-14T19:46:55.416Z'
    }
  ],
  __v: 2
}
likeCount parent:  {
  tags: [],
  _id: 60ee707e07f471f86bfad749,
  title: 'Yo Momma SO Fat',
  body: 'when she skips a meal, the stock market drops.',
  user: 60ee46b1344a4aed30b6f687,
  username: 'aello',
  createdAt: '2021-07-14T05:05:02.284Z',
  comments: [
    {
      _id: 60ef3e6d0a21ab1e9c476da0,
      body: 'blah blah blah',
      username: 'aello',
      createdAt: '2021-07-14T19:43:41.164Z'
    }
  ],
  likes: [
    {
      _id: 60ef3f400a21ab1e9c476db7,
      username: 'aello',
      createdAt: '2021-07-14T19:47:12.518Z'
    }
  ],
  __v: 2
}
likeCount parent:  {
  tags: [],
  _id: 60ee703607f471f86bfad747,
  title: 'If I had a Million Dollars',
  body: '*dabs*',
  user: 60ee46b1344a4aed30b6f687,
  username: 'aello',
  createdAt: '2021-07-14T05:03:50.184Z',
  comments: [
    {
      _id: 60ef3e8a0a21ab1e9c476da4,
      body: 'blah blah blah',
      username: 'aello',
      createdAt: '2021-07-14T19:44:10.953Z'
    }
  ],
  likes: [
    {
      _id: 60ef3f570a21ab1e9c476dc4,
      username: 'aello',
      createdAt: '2021-07-14T19:47:35.207Z'
    }
  ],
  __v: 6
}
likeCount parent:  {
  tags: [],
  _id: 60ee702507f471f86bfad745,
  title: 'Moreover...',
  body: '*dabs*',
  user: 60ee46b1344a4aed30b6f687,
  username: 'aello',
  createdAt: '2021-07-14T05:03:33.455Z',
  comments: [
    {
      _id: 60ef3e9d0a21ab1e9c476da8,
      body: 'blah blah blah',
      username: 'aello',
      createdAt: '2021-07-14T19:44:29.144Z'
    }
  ],
  likes: [
    {
      _id: 60ef3f5f0a21ab1e9c476dc7,
      username: 'aello',
      createdAt: '2021-07-14T19:47:43.856Z'
    }
  ],
  __v: 2
}
likeCount parent:  {
  tags: [],
  _id: 60ee700e07f471f86bfad743,
  title: 'TestTitle',
  body: 'More than words, more than words...',
  user: 60ee46b1344a4aed30b6f687,
  username: 'aello',
  createdAt: '2021-07-14T05:03:10.299Z',
  comments: [
    {
      _id: 60ef3eae0a21ab1e9c476dac,
      body: 'blah blah blah',
      username: 'aello',
      createdAt: '2021-07-14T19:44:46.022Z'
    }
  ],
  likes: [
    {
      _id: 60ef3f690a21ab1e9c476dca,
      username: 'aello',
      createdAt: '2021-07-14T19:47:53.773Z'
    }
  ],
  __v: 2
}
*/

/*
///////////////////////////////////////////////////////////////////////////
// <<-------------------------- ALL REQ/RES -------------------------->> //
///////////////////////////////////////////////////////////////////////////
  PLAYGROUND REQS:
  <<------------------------------ USER ------------------------------>>
      REGISTER:
REGISTER REQ:
 mutation{
   register(registerInput:{
     username:"testUser"
     password:"lamppost"
     confirmPassword:"lamppost"
     email:"user@email.com"
   }){
     id
     email
     token
     username
     createdAt
   }
 }

REGISTER RES:
{
  "data": {
    "register": {
      "id": "60ef1dbdabf2ed121b827c95",
      "email": "user@email.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWYxZGJkYWJmMmVkMTIxYjgyN2M5NSIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjI2MjgzNDUzLCJleHAiOjE2MjYyODcwNTN9.gV9PvQhxf23tgN-IuzLNP_Q60Nf-hf4ohXauEYCieoo",
      "username": "testUser",
      "createdAt": "2021-07-14T17:24:13.674Z"
    }
  }
}

      LOGIN:
 LOGIN REQ:
 mutation {
  login(username: "aello", password: "lamppost"){
    id
    email
    token
    username
    createdAt
  }
}
LOGIN RES:
{
  "data": {
    "login": {
      "id": "60ee46b1344a4aed30b6f687",
      "email": "prescottdarling@gmail.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWU0NmIxMzQ0YTRhZWQzMGI2ZjY4NyIsImVtYWlsIjoicHJlc2NvdHRkYXJsaW5nQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWVsbG8iLCJpYXQiOjE2MjYyODMzMTIsImV4cCI6MTYyNjI4NjkxMn0.-YlD7MqzD0Yd0U6jYpCqGE7p5qsxL8WQzYHM_1bRbz4",
      "username": "aello",
      "createdAt": "2021-07-14T02:06:41.316Z"
    }
  }
}

<<------------------------------ POST ------------------------------>>
      GETPOSTS
GETPOSTS REQ(example):
query posts{
    getPosts{
    id
    username
    title
    body
    selectedFile
    tags
    likes {
      id
      username
      createdAt
    }
    comments {
      id
      username
      body
      createdAt
    }
    likeCount
    commentCount
    createdAt
  }
}
GETPOSTS RES:
{
  "data": {
    "getPosts": [
      {
        "id": "60ef1eb0eef01e124d52882c",
        "username": "aello",
        "title": "Yo Momma is Really Dumb",
        "body": "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'",
        "selectedFile": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK",
        "tags": [
          "yomomma",
          "jokes"
        ],
        "likes": [
          {
            "id": "60ef2273d3016613693535b1",
            "username": "aello",
            "createdAt": "2021-07-14T17:44:19.567Z"
          }
        ],
        "comments": [
          {
            "id": "60ef240b2a35a5138cfe94b2",
            "username": "aello",
            "body": "comment testing",
            "createdAt": "2021-07-14T17:51:07.620Z"
          }
        ],
        "likeCount": 1,
        "commentCount": 1,
        "createdAt": "2021-07-14T17:28:16.040Z"
      },
      {...},
      {...},
      {...}
    ]
  }
}


GETPOST: {

}
GETPOST REQ:
{
  getPost(postId:"60ee703607f471f86bfad747"){
    id
    username
    title
    body
    tags
    selectedFile
    comments {
      id
      username
      body
      likes {
        id
        username
        createdAt
      }
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    createdAt
  }
}

GETPOST RES:
{
  "data": {
    "getPost": {
      "id": "60ee703607f471f86bfad747",
      "username": "aello",
      "title": "If I had a Million Dollars",
      "body": "*dabs*",
      "tags": [],
      "selectedFile": null,
      "comments": [],
      "likes": [],
      "createdAt": "2021-07-14T05:03:50.184Z"
    }
  }
}

    CREATEPOST:
CREATEPOST REQ:
mutation createPost{
  createPost(title: "Yo Momma is Really Dumb", body: "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'", tags: ["yo momma", "jokes"], selectedFile: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK"){
    id
    title
    body
    tags
    selectedFile
    username
    createdAt
  }
}
CREATEPOST RES:
{
  "data": {
    "createPost": {
      "id": "60ef1eb0eef01e124d52882c",
      "title": "Yo Momma is Really Dumb",
      "body": "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'",
      "tags": [
        "yo momma",
        "jokes"
      ],
      "selectedFile": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK",
      "username": "aello",
      "createdAt": "2021-07-14T17:28:16.040Z"
    }
  }
}

    DELETE POST:
DELETE REQ:
mutation deletePost{
  deletePost(postId: "60ee6ff607f471f86bfad741")
}
DELETE RES:
{
  "data": {
    "deletePost": "Post deleted successfully"
  }
}

    LIKE POST:
LIKEPOST REQ:
mutation{
  likePost(postId:"60ef1eb0eef01e124d52882c"){
    id
    title
    body
    username
    likes{
      id
      username
      createdAt
    }
  }
}

LIKEPOST RES:
{
  "data": {
    "likePost": {
      "id": "60ef1eb0eef01e124d52882c",
      "title": "Yo Momma is Really Dumb",
      "body": "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'",
      "username": "aello",
      "likes": [
        {
          "id": "60ef1f73e542f81271ac8be6",
          "username": "aello",
          "createdAt": "2021-07-14T17:31:31.444Z"
        }
      ]
    }
  }
}

<<------------------------------ COMMENT ------------------------------>>
    CREATECOMMENT:
CREATECOMMENT REQ:
mutation comment{
  createComment(postId:"60ef1eb0eef01e124d52882c" body:"comment testing"){
    id
    username
    title
    body
    comments {
      id
      username
      createdAt
    }
    comments {
      id
      username
      body
      createdAt
    }
  }
}
CREATECOMMENT RES:
{
  "data": {
    "createComment": {
      "id": "60ef1eb0eef01e124d52882c",
      "username": "aello",
      "title": "Yo Momma is Really Dumb",
      "body": "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'",
      "comments": [
        {
          "id": "60ef240b2a35a5138cfe94b2",
          "username": "aello",
          "createdAt": "2021-07-14T17:51:07.620Z",
          "body": "comment testing"
        }
      ]
    }
  }
}

    LIKECOMMENT:
LIKECOMMENT REQ:

LIKECOMMENT RES:


    COMMENTCOMMENT:
COMMENTCOMMENT REQ:

COMMENTCOMMENT RES:


<<------------------------------ PUBSUB ------------------------------>>
REQ:
subscription{
  newPost{
    id
    username
    title
    body
    selectedFile
    tags
    comments {
      id
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    createdAt
  }
}

RES:
it just listens, theres no data res.
*/
