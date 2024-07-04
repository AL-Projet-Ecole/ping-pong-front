import {toast} from "react-toastify";

export const loadRealisations = async () => {
    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/realisations');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des réalisations');
        }
        const data = await response.json();
        return data.map(realisation => ({
            id: realisation.id_realisation,
            idG: realisation.id_gamme,
            idU: realisation.id_user,
            idO: realisation.id_operation,
            idM: realisation.id_machine,
            idP: realisation.id_poste,
            title: realisation.matricule_realisation,
            description: realisation.temps_realisation,
            dateFab: realisation.date_debut_fab,
            createdAt : realisation.createdAt,
            updatedAt : realisation.updatedAt
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};


export async function AddRealisation(realisationData) {
    const { idG, idU, idOp, idM, idP, temps_realisation, date_debut_fab } = realisationData;

    try {
        console.log(realisationData)
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/realisations/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_gamme: idG,
                id_user: idU,
                id_operation: idOp,
                id_machine: idM,
                id_poste: idP,
                temps_realisation: temps_realisation,
                date_debut_fab: date_debut_fab
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData); // Journal de débogage
            throw new Error('Server Error');
        }

        console.log("Nouvelle réalisation ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réalisation :", error.message);
        throw error;
    }
}