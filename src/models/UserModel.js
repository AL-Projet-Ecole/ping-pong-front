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