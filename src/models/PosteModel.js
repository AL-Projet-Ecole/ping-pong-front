import {toast} from "react-toastify";

export async function loadPostes() {
    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postes')
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des postes');
        }
        const data = await response.json();
        return data.map(poste => ({
            id: poste.id_poste,
            title: poste.libelle_poste,
            createdAt : poste.createdAt,
            updatedAt : poste.updatedAt
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const loadPosteById = async (id_poste) => {
    try {
        console.log(id_poste)
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postes/' + id_poste);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de l\'opération');
        }
        const data = await response.json();
        return {
            id: data.id_poste,
            title: data.libelle_poste,
            createdAt : data.createdAt,
            updatedAt : data.updatedAt
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};


export async function AddPoste(posteData) {
    const { libelle_poste } = posteData;

    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                libelle_poste,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData); // Journal de débogage
            throw new Error(errorData.errors[0].msg);
        }

        toast.success("Le poste de travail à bien été crée.");
    } catch (error) {
        toast.error("Erreur lors de la création du poste de travail.");
        throw error;
    }
}

export async function UpdatePoste(posteData) {
    const { id, libelle } = posteData;
    try {
        const response = await fetch(`https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_poste: id,
                libelle_poste: libelle
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

export const loadListePostes = async (id_post) => {
    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postMachines/listPost/' + id_post);
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

export async function DeletePoste(id_poste){
    try {
        const response = await fetch(`https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/postes/${id_poste}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        toast.success("Le poste de travail à bien été supprimé.");
    } catch (error) {
        if (error.message === 'Impossible de supprimer ce poste de travail car il est référencé par une réalisation.') {
            toast.error("Impossible de supprimer ce poste de travail car il est référencé par une réalisation.");
        } else {
            toast.error("Erreur lors de la suppression du poste de travail.");
        }
        throw error;
    }
}