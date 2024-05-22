// Importe la fonction getTodoId depuis le fichier todos.query dans le répertoire routes/todos
const { getTodoId } = require('../routes/todos/todos.query');

// Middleware pour gérer les cas où une tâche n'est pas trouvée
async function todoNotFound(req, res, next) {
    // Récupère l'ID de la tâche à partir des paramètres de la requête
    const todoId = Number(req.params.id);

    // Vérifie si l'ID de la tâche est invalide
    if (!todoId) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si l'ID est invalide
    }

    // Vérifie si la tâche avec cet ID existe dans la base de données
    if (await getTodoId(todoId) === false) {
        return res.status(404).json({ 'msg': 'Not found' }); // Renvoie une erreur 404 si aucune tâche correspondante n'est trouvée
    }

    // Si la tâche existe, ajoute l'ID à la requête pour le traitement ultérieur
    req.id = todoId;
    next(); // Passe au middleware suivant
}

// Exporte la fonction todoNotFound pour l'utiliser dans d'autres modules
module.exports = todoNotFound;

/*

    Résumer
    Ici le script gère les cas où une tâche n'est pas trouvée, en vérifiant d'abord 
    la validité de l'ID de la tâche et en renvoyant les erreurs appropriées 
    le cas échéant. Ensuite, il ajoute l'ID de la tâche à la requête pour le 
    traitement ultérieur.
    

*/