export async function loadOperations() {
    return fetch('http://127.0.0.1:3333/operations')
        .then(res => res.json())
        .then(data => {return data});
}

export async function AddOperation(id_poste, id_machine, libelle_operation, temps_estimation){
    return fetch('https://dummyjson.com/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_poste: {id_poste},
            id_machine: {id_machine},
            libelle_operation: {libelle_operation},
            temps_estimation: {temps_estimation}
        })
    })
        .then(res => res.json())
        .then(console.log);
}