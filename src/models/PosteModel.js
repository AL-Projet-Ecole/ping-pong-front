export async function loadPostes() {
    try {
        const response = await fetch('http://127.0.0.1:3333/postes')
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des postes');
        }
        const data = await response.json();
        return data.map(poste => ({
            id: poste.id_poste,
            title: poste.libelle_poste,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}
