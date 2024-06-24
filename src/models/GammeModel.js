export const loadGammes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/gammes');
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des gammes');
        }
        const data = await response.json();
        return data.map(gamme => ({
            id: gamme.id_gamme,
            title: gamme.titre_gamme,
            description: gamme.description_gamme,
            quantite: gamme.quantite,
            prix: gamme.prix_gamme,
            provenance: gamme.provenance_gamme
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function AddGamme(gammeData) {
    const { titre_gamme, description_gamme, quantite_gamme, prix_gamme, provenance_gamme } = gammeData;

    try {
        const response = await fetch('http://127.0.0.1:3333/gammes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titre_gamme,
                description_gamme,
                quantite_gamme,
                prix_gamme,
                provenance_gamme
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.log("Nouvelle gamme ajoutée");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la gamme :", error.message);
        throw error;
    }
}

export async function DeleteGamme(id_gamme){
    try {
        const response = await fetch(`http://127.0.0.1:3333/gammes/${id_gamme}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        console.log(`Gamme avec l'ID ${id_gamme} supprimée avec succès`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la gamme :", error.message);
        throw error;
    }
}


