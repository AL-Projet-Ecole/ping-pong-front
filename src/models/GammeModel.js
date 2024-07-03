import { toast } from 'react-toastify';
export const loadGammes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/gammes');
        if (!response.ok) {
            toast.error("Erreur lors du chargement des gammes.");
            throw new Error('Erreur lors du chargement des gammes');
        }
        const data = await response.json();
        return data.map(gamme => ({
            id: gamme.id_gamme,
            title: gamme.titre_gamme,
            description: gamme.description_gamme,
            prix: gamme.prix_gamme,
            provenance: gamme.provenance_gamme,
            type: gamme.type_gamme,
            stock: gamme.stock_gamme
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const loadGammesByType = async (type_gamme) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/gammes/type/'+ type_gamme);
        if (!response.ok) {
            toast.error("Erreur lors du chargement des gammes.");
            throw new Error('Erreur lors du chargement des gammes');
        }
        const data = await response.json();
        return data.map(gamme => ({
            id: gamme.id_gamme,
            title: gamme.titre_gamme,
            description: gamme.description_gamme,
            prix: gamme.prix_gamme,
            provenance: gamme.provenance_gamme,
            type: gamme.type_gamme,
            stock: gamme.stock_gamme
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const loadGammeById = async (id_gamme) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/gammes/id/' + id_gamme);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de la gamme.');
        }
        const gamme = await response.json();
        return {
            id: gamme.id_gamme,
            title: gamme.titre_gamme,
            description: gamme.description_gamme,
            prix: gamme.prix_gamme,
            provenance: gamme.provenance_gamme,
            type: gamme.type_gamme,
            stock: gamme.stock_gamme
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export async function AddGamme(gammeData) {
    const { titre_gamme, description_gamme, prix_gamme, provenance_gamme, type_gamme, stock_gamme } = gammeData;

    try {
        const response = await fetch('http://127.0.0.1:3333/gammes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titre_gamme,
                description_gamme,
                prix_gamme,
                provenance_gamme,
                type_gamme,
                stock_gamme
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData); // Journal de débogage
            throw new Error(errorData.errors[0].msg);
        }

        toast.success("La gamme à bien été crée.");
    } catch (error) {
        toast.error("Erreur lors de la création de la gamme.");
        throw error;
    }
}

export async function DeleteGamme(id_gamme) {
    try {
        const response = await fetch(`http://127.0.0.1:3333/gammes/${id_gamme}`, {
            method: 'DELETE',
        });

        const responseText = await response.text(); // Lire la réponse brute
        console.log('Raw Response:', responseText); // Journal de débogage

        if (!response.ok) {
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch (e) {
                console.error('Invalid JSON response:', responseText);
                throw new Error('Invalid JSON response from server');
            }

            console.error('Server Error:', errorData); // Journal de débogage
            throw new Error(errorData.message);
        }

        toast.success("La gamme a bien été supprimée.");
    } catch (error) {
        if (error.message === 'Impossible de supprimer cette gamme car elle est référencée par une réalisation.') {
            toast.error("Impossible de supprimer cette gamme car elle est référencée par une réalisation.");
        } else {
            toast.error("Erreur lors de la suppression de la gamme.");
        }
    }
}



