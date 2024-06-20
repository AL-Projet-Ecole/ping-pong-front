export async function loadGammes() {
    return fetch('http://127.0.0.1:3333/gammes')
        .then(res => res.json())
        .then(data => {return data});
}