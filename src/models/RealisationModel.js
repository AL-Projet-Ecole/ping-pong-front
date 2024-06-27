export async function loadRealisations() {
    return fetch('http://127.0.0.1:3333/realisations')
        .then(res => res.json())
        .then(data => {return data});
}