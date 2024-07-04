import {toast} from "react-toastify";

export const loadMachines = async () => {
    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/machines');
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
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/machines/' + id_machine);
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
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postMachines/Unassigned/' + id_poste);
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
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postMachines/listMachine/' + id_poste);
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
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postMachines/', {
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

        toast.success("La relation entre le poste de travail et la machine à bien été crée.");
    } catch (error) {
        toast.error("Erreur lors de la création de la relation entre le poste de travail et la machine.");
        throw error;
    }
}

export async function UpdateMachine(machineData) {
    const { id, libelle } = machineData;
    try {
        const response = await fetch(`https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/machines/${id}`, {
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

        toast.success("La mise à jour de la machine a bien été effectuée.");
    } catch (error) {
        toast.error("Erreur lors de la mise à jour de la machine.");
        throw error;
    }
}

export async function DeleteAssignedMachine(id_poste_machine){
    try {
        const response = await fetch(`https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postMachines/${id_poste_machine}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        toast.success("La relation entre le poste de travail et la machine à bien été supprimée.");
    } catch (error) {
        toast.error("Erreur lors de la suppression de la relation entre le poste de travail et la machine.");
        throw error;
    }
}

export async function AddMachine(machineData) {
    const { libelle_machine } = machineData;

    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/machines/', {
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

        toast.success("La machine à bien été crée.");
    } catch (error) {
        toast.error("Erreur lors de l'ajout de la machine.");
        throw error;
    }
}

export async function DeleteMachine(id_machine){
    try {
        const response = await fetch(`https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/machines/${id_machine}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        toast.success("La machine à bien été supprimée.");
    } catch (error) {
        if (error.message === 'Impossible de supprimer cette machine car elle est référencée par une réalisation.') {
            toast.error("Impossible de supprimer cette machine car elle est référencée par une réalisation.");
        } else {
            toast.error("Erreur lors de la suppression de la machine.");
        }
        throw error;
    }
}