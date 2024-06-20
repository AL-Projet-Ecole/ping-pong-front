export async function loadGammes() {
    return fetch('http://127.0.0.1:3333/gammes')
        .then(res => res.json())
        .then(data => {return data});
}

export async function AddMachine(libelle_machine){
    return fetch('https://dummyjson.com/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            libelle_machine: {libelle_machine}
        })
    })
        .then(res => res.json())
        .then(console.log);
}