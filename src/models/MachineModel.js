export const loadMachines = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/machines');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des machines');
        }
        const data = await response.json();
        return data.map(machine => ({
            id: machine.id_machine,
            title: machine.libelle_machine
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const loadListeMachines = async (id_post) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/postMachines/listMachine/' + id_post);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des machines du poste');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

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