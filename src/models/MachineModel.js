export const loadMachines = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/machines');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des machines');
        }
        const data = await response.json();
        return data.map(machine => ({
            id: machine.id_machine,
            title: machine.libelle_machine,
            createdAt : machine.createdAt,
            updatedAt : machine.updatedAt
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const loadMachineById = async (id_machine, id_poste_machine = null) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/machines/' + id_machine);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de la machine');
        }
        const data = await response.json();
        return {
            id : id_poste_machine,
            title: data.libelle_machine,
            idM: data.id_machine,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const loadUnassignedListeMachines = async (id_poste) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/postMachines/Unassigned/' + id_poste);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des machines du poste de travail');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const loadListeMachines = async (id_poste) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/postMachines/listMachine/' + id_poste);
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

export async function AddAssignementMachine(listMachineData) {
    const { idPoste, idMac } = listMachineData;

    try {
        const response = await fetch('http://127.0.0.1:3333/postMachines/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_poste: idPoste,
                id_machine: idMac,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Assignation d'une machine ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'assignation d'une machine :", error.message);
        throw error;
    }
}

export async function UpdateMachine(machineData) {
    const { id, libelle } = machineData;
    try {
        const response = await fetch(`http://127.0.0.1:3333/machines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_machine: id,
                libelle_machine: libelle
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Le poste de travail a bien été mis à jour ");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du poste de travail :", error.message);
        throw error;
    }
}

export async function DeleteAssignedMachine(id_poste_machine){
    try {
        const response = await fetch(`http://127.0.0.1:3333/postMachines/${id_poste_machine}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log(`Operation assigné avec l'ID ${id_poste_machine} supprimée avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la gamme :", error.message);
        throw error;
    }
}

export async function AddMachine(machineData) {
    const { libelle_machine } = machineData;

    try {
        const response = await fetch('http://127.0.0.1:3333/machines/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                libelle_machine
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Nouvelle machine ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la machine :", error.message);
        throw error;
    }
}

export async function DeleteMachine(id_machine){
    try {
        const response = await fetch(`http://127.0.0.1:3333/machines/${id_machine}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log(`Machine avec l'ID ${id_machine} supprimée avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la gamme :", error.message);
        throw error;
    }
}