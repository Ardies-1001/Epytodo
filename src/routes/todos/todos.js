// Importe les fonctions de requête de todo depuis le fichier todos.query
const { getTodos, getTodo, insertTodo, deleteTodo, updateTodo } = require('./todos.query');

// Fonction pour récupérer toutes les tâches
async function todos(req, res) {
    // Renvoie toutes les tâches sous forme de réponse JSON
    return res.status(200).json(await getTodos());
}

// Fonction pour supprimer une tâche
async function todoDelete(req, res) {
    // Supprime la tâche correspondant à l'ID dans la requête
    deleteTodo(req.id);
    // Renvoie un message indiquant que la tâche a été supprimée avec succès
    return res.status(200).json({ 'msg': `Successfully deleted record number: ${req.id}` });
}



// Fonction pour récupérer une tâche spécifique par son ID
async function todo(req, res) {
    // Renvoie la tâche correspondant à l'ID dans la requête sous forme de réponse JSON
    return res.status(200).json(await getTodo(req.id));
}



// Fonction pour mettre à jour une tâche existante
async function todoUpdate(req, res) {
    // Récupère les données de la requête
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const status = req.body.status;
    const user_id = req.body.user_id;

    try {
        // Met à jour la tâche avec les nouvelles données
        await updateTodo(req.id, title, description, due_time, status, user_id);
    } catch(err) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si les paramètres sont incorrects
    }
    // Renvoie les nouvelles données de la tâche mise à jour sous forme de réponse JSON
    return res.status(200).json({ title, description, due_time, user_id, status });
}

// Fonction pour insérer une nouvelle tâche
async function todoInsert(req, res) {
    let todoId;
    // Récupère les données de la requête
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const status = req.body.status;
    const user_id = req.body.user_id;

    try {
        // Insère la nouvelle tâche et récupère son ID
        todoId = await insertTodo(title, description, due_time, status, user_id);
    } catch(err) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si les paramètres sont incorrects
    }
    // Renvoie la nouvelle tâche insérée sous forme de réponse JSON
    return res.status(200).json(await getTodo(todoId));
}

// Exporte toutes les fonctions pour les rendre disponibles pour d'autres modules
module.exports = {
    todos,
    todo,
    todoInsert,
    todoUpdate,
    todoDelete
};
