export const loadRealisations = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/realisations');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des réalisations');
        }
        const data = await response.json();
        return data.map(realisation => ({
            id: realisation.id_realisation,
            idG: realisation.id_gamme,
            idU: realisation.id_user,
            idO: realisation.id_operation,
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
    const { idU, idO, idP, description, dateFab } = realisationData;

    try {
        const response = await fetch('http://127.0.0.1:3333/realisations/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_user: idU,
                id_operation: idO,
                id_poste: idP,
                temps_realisation: description,
                date_debut_fab: dateFab
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Nouvelle réalisation ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réalisation :", error.message);
        throw error;
    }
}