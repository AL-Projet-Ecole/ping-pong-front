export const loadOperations = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/operations');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des opérations');
        }
        const data = await response.json();
        return data.map(operation => ({
            id: operation.id_operation,
            title: operation.libelle_operation,
            description: operation.temps_estimation,
            idm: operation.id_machine
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const loadOperationById = async (id_operation) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/operations/' + id_operation);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de l\'opération');
        }
        const data = await response.json();
        return {
            id: data.id_operation,
            title: data.libelle_operation,
            description: data.temps_estimation,
            idm: data.id_machine,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const loadListeOperations = async (id_gamme) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/listeOperations/' + id_gamme);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des opérations de la gamme');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


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

export async function DeleteOperation(id_operation){
    try {
        const response = await fetch(`http://127.0.0.1:3333/gammes/${id_operation}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log(`Gamme avec l'ID ${id_operation} supprimée avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la gamme :", error.message);
        throw error;
    }
}