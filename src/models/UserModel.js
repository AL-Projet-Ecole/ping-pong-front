export async function loadUsers() {
    return fetch('http://127.0.0.1:3333/users')
        .then(res => res.json())
        .then(data => {return data});
}