export async function loadPostes() {
    return fetch('http://127.0.0.1:3333/postes')
        .then(res => res.json())
        .then(data => {return data});
}