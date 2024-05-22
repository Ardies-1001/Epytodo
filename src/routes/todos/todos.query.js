// Importe la connexion à la base de données depuis le fichier de configuration
const databaseConnection = require('../../config/db');




// Fonction pour récupérer toutes les tâches
async function getTodos() {
    // Exécute une requête pour sélectionner toutes les tâches
    const query = await (await databaseConnection).execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo');

    // Retourne toutes les tâches
    return query[0];
}

// Fonction pour récupérer une tâche spécifique par son ID
async function getTodo(todoId) {
    // Exécute une requête pour sélectionner la tâche avec l'ID spécifié
    const query = await (await databaseConnection).execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [todoId]);

    // Retourne la tâche trouvée
    return query[0][0];
}

// Fonction pour insérer une nouvelle tâche dans la base de données
async function insertTodo(title, description, due_time, status, user_id) {
    // Exécute une requête pour insérer une nouvelle tâche avec les données fournies
    const query = await (await databaseConnection).execute('INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)',
        [title, description, due_time, status, user_id]);

    // Retourne l'ID de la nouvelle tâche insérée
    return query[0].insertId;
}

// Fonction pour récupérer l'ID d'une tâche en utilisant son ID
async function getTodoId(todoId) {
    // Exécute une requête pour sélectionner l'ID de la tâche
    const query = await (await databaseConnection).execute('SELECT id FROM todo WHERE id = ?', [todoId]);

    // Vérifie si une correspondance a été trouvée
    if (query[0].length > 0) {
        return query[0][0].id; // Retourne l'ID de la tâche trouvée
    }
    return false; // Retourne false si aucune tâche correspondante n'est trouvée
}

// Fonction pour mettre à jour une tâche existante dans la base de données
async function updateTodo(todoId, title, description, due_time, status, user_id) {
    // Exécute une requête pour mettre à jour la tâche avec les nouvelles données
    await (await databaseConnection).execute('UPDATE todo SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?',
        [title, description, due_time, status, user_id, todoId]);
}

// Fonction pour supprimer une tâche de la base de données
async function deleteTodo(todoId) {
    // Exécute une requête pour supprimer la tâche avec l'ID spécifié
    (await databaseConnection).execute('DELETE FROM todo WHERE id = ?', [todoId]);
}

// Exporte toutes les fonctions pour les rendre disponibles pour d'autres modules
module.exports = {
    getTodoId,
    getTodos,
    getTodo,
    insertTodo,
    updateTodo,
    deleteTodo
};
