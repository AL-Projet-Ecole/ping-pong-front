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
            idM: operation.id_machine,
            createdAt : operation.createdAt,
            updatedAt : operation.updatedAt
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const loadOperationById = async (id_operation, id_liste_operation = null) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/operations/' + id_operation);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de l\'opération');
        }
        const data = await response.json();
        return {
            id : id_liste_operation,
            idOp: data.id_operation,
            title: data.libelle_operation,
            description: data.temps_estimation,
            idM: data.id_machine,
            createdAt : data.createdAt,
            updatedAt : data.updatedAt
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

export const loadUnassignedListeOperations = async (id_gamme) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/listeOperations/Unassigned/' + id_gamme);
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

export async function AddAssignementOperation(listOperationData) {
    const { idGamme, idOp } = listOperationData;

    try {
        console.log(idGamme, idOp)
        const response = await fetch('http://127.0.0.1:3333/listeOperations/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_gamme: idGamme,
                id_operation: idOp,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Assignation d'opération ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'assignation d'opération :", error.message);
        throw error;
    }
}


export async function DeleteAssignedOperation(id_liste_operation){
    try {
        const response = await fetch(`http://127.0.0.1:3333/listeOperations/${id_liste_operation}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log(`Operation assigné avec l'ID ${id_liste_operation} supprimée avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la gamme :", error.message);
        throw error;
    }
}

export async function AddOperation(operationData) {
    const { id_machine, libelle_operation, temps_estimation } = operationData;

    try {
        const response = await fetch('http://127.0.0.1:3333/operations/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_machine,
                libelle_operation,
                temps_estimation
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Nouvelle opération ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'opération :", error.message);
        throw error;
    }
}

export async function UpdateOperation(operationData) {
    const { id, libelle, description, idM } = operationData;
    try {
        const response = await fetch(`http://127.0.0.1:3333/operations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_operation:id,
                id_machine: idM,
                libelle_operation: libelle,
                temps_estimation: description
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("L'opération a bien été mise à jour");
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'opération :", error.message);
        throw error;
    }
}

export async function DeleteOperation(id_operation){
    try {
        const response = await fetch(`http://127.0.0.1:3333/operations/${id_operation}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log(`Opération avec l'ID ${id_operation} supprimée avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'opération :", error.message);
        throw error;
    }
}