export async function loadGammes() {
    return fetch('http://127.0.0.1:3333/gammes')
        .then(res => res.json())
        .then(data => {return data});
}

export async function AddGamme(titre_gamme){
    return fetch('https://dummyjson.com/gammes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titre_gamme: {titre_gamme}
        })
    })
        .then(res => res.json())
        .then(console.log);
}