//**********************      LOGIN PART        ***************************/

export async function LoginApi(username, password) {
  return fetch('http://127.0.0.1:3333/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
  login_user: username,
  mdp_user: password
})
})
.then(res => res.json())
.then(data => {return data});
}

//**********************      POSTS PART        ***************************/

export async function LoadPost() {
  return fetch('https://dummyjson.com/posts?limit=18')
    .then(res => res.json())
    .then(data => {return data.posts});
}

export async function GetOnePost(id){
  return fetch('https://dummyjson.com/posts/'+ id)
  .then(res => res.json())
  .then(data => {console.log(data);return data});
}

export async function AddPost(title, body){
  return fetch('https://dummyjson.com/posts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: {title},
    body: {body},
    userId: 1,
  })
})
.then(res => res.json())
.then(console.log);
} 

export async function UpdatePost(idPost, title, body){
  fetch('https://dummyjson.com/posts/'+ idPost, {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: title,
    body: body
  })
})
.then(res => res.json())
.then(console.log);
}

export async function DeletePost(idPost){
  return fetch('https://dummyjson.com/posts/'+ idPost, {
  method: 'DELETE',
})
.then(res => res.json())
.then(console.log);
}

//******************          COMMENTS PART        ***************************/

export async function getAllComByIdPost(id){
  return fetch('https://dummyjson.com/comments/post/'+ id)
    .then(res => res.json())
    .then(data => {if(data.comments !== undefined) {return data.comments}});
}

export default {};
