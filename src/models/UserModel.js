import {toast} from "react-toastify";

export async function loadUsers() {
    return fetch('http://127.0.0.1:3333/users')
        .then(res => res.json())
        .then(data => {return data});
}
export const loadUserById = async (id_user) => {
    try {
        const response = await fetch('http://127.0.0.1:3333/users/id/' + id_user);
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