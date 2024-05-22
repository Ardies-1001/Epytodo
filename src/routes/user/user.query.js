// Importe la connexion à la base de données depuis le fichier de configuration
const databaseConnection = require('../../config/db');

// Récupère l'ID d'un utilisateur en utilisant son email
async function getUserIdByEmail(email) {
    const query = await (await databaseConnection).execute('SELECT id FROM user WHERE email = ?', [email]);

    // Vérifie si une correspondance a été trouvée
    if (query[0].length > 0) {
        return query[0][0].id; // Retourne l'ID de l'utilisateur trouvé
    }
    return false; // Retourne false si aucun utilisateur correspondant n'est trouvé
}


// Nous supprimons un utilisateur de la base de données en utilisant son ID
async function deleteUser(userId) {
    // Nous supprimons d'abord toutes les tâches associées à cet utilisateur
    (await databaseConnection).execute('DELETE FROM todo WHERE user_id = ?', [userId]);
    // Puis Nous supprimons l'utilisateur lui-même
    (await databaseConnection).execute('DELETE FROM user WHERE id = ?', [userId]);
}

// Récupère l'ID d'un utilisateur en utilisant son ID
async function getUserIdById(userId) {
    const query = await (await databaseConnection).execute('SELECT id FROM user WHERE id = ?', [userId]);

    // Vérifie si une correspondance a été trouvée
    if (query[0].length > 0) {
        return (query[0][0].id); // Retourne l'ID de l'utilisateur trouvé
    }
    return false; // Retourne false si aucun utilisateur correspondant n'est trouvé
}

// Insère un nouvel utilisateur dans la base de données
async function insertUser(email, password, name, firstname) {
    await (await databaseConnection).execute('INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)',
        [email, password, name, firstname]);
}

// Récupère le mot de passe d'un utilisateur en utilisant son email
async function getUserPassword(email) {
    const query = await (await databaseConnection).execute('SELECT password FROM user WHERE email = ?', [email]);

    // Vérifie si une correspondance a été trouvée
    if (query[0].length > 0) {
        return query[0][0].password; // Retourne le mot de passe de l'utilisateur trouvé
    }
    return false; // Retourne false si aucun utilisateur correspondant n'est trouvé
}

// Récupère les informations d'un utilisateur en utilisant son ID
async function getUser(userId) {
    const query = await (await databaseConnection).execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?',
        [userId]);

    // Retourne les informations de l'utilisateur trouvé
    return query[0][0];
}

// Récupère toutes les tâches d'un utilisateur en utilisant son ID
async function getUserTodos(userId) {
    const query = await (await databaseConnection).execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?',
        [userId]);

    // Retourne toutes les tâches de l'utilisateur trouvé
    return query[0];
}

// Met à jour les informations d'un utilisateur dans la base de données en utilisant son ID
async function updateUser(userId, email, password, name, firstname) {
    await (await databaseConnection).execute('UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?',
        [email, password, name, firstname, userId]);
}

// Récupère les informations mises à jour d'un utilisateur en utilisant son ID
async function getUserUpdateResponse(userId) {
    const query = await (await databaseConnection).execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?',
        [userId]);

    // Retourne les informations mises à jour de l'utilisateur trouvé
    return query[0][0];
}

// Nous exportons toutes les fonctions pour les rendre disponibles pour d'autres modules
module.exports = {
    getUserIdByEmail,
    getUserIdById,
    insertUser,
    getUserPassword,
    getUser,
    getUserTodos,
    updateUser,
    getUserUpdateResponse,
    deleteUser
};
