import {toast} from "react-toastify";

export async function loadUsers() {
    return fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/users')
        .then(res => res.json())
        .then(data => {return data});
}
export const loadUserById = async (id_user) => {
    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/users/id/' + id_user);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du user.');
        }
        const user = await response.json();
        return {
            id: user.id_user,
            title: user.nom_user + " " + user.prenom_user,
            description: user.email_user
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};


export async function addUser(userData) {
    const { login_user, mdp_user, nom_user, prenom_user, email_user, role_user } = userData;

    try {
        const response = await fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login_user,
                mdp_user,
                nom_user,
                prenom_user,
                email_user,
                role_user
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        toast.success("L'utilisateur à bien été crée.");
    } catch (error) {
        toast.error("Erreur lors de la création de l'utilisateur");
        throw error;
    }
}

export async function DeleteUser(id_user){
    try {
        const response = await fetch(`https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/users/${id_user}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        toast.success("L'utilisateur à bien été supprimé.");
    } catch (error) {
        toast.error("Erreur lors de la suppression de l'utilisateur.");
        throw error;
    }
}