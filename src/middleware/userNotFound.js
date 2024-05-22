// Importe la fonction getUserIdById depuis le fichier user.query dans le répertoire routes/user
const { getUserIdById } = require('../routes/user/user.query');

// Middleware pour gérer les cas où un utilisateur n'est pas trouvé
async function userNotFound(req, res, next) {
    // Récupère l'ID de l'utilisateur à partir des paramètres de la requête
    const userId = Number(req.params.id);

    // Vérifie si l'ID de l'utilisateur est invalide
    if (!userId) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si l'ID est invalide
    }

    // Vérifie si l'utilisateur avec cet ID existe dans la base de données
    if (await getUserIdById(userId) === false) {
        return res.status(404).json({ 'msg': 'Not found' }); // Renvoie une erreur 404 si aucun utilisateur correspondant n'est trouvé
    }

    // Si l'utilisateur existe, ajoute l'ID à la requête pour le traitement ultérieur
    req.id = userId;
    next(); // Passe au middleware suivant
}

// Exporte la fonction userNotFound pour l'utiliser dans d'autres modules
module.exports = userNotFound;


/*
    Résumer
    Ici le scrript gère les cas où un utilisateur n'est pas trouvé, en vérifiant d'abord la 
    validité de l'ID de l'utilisateur et en renvoyant les erreurs appropriées le 
    cas échéant. Ensuite, il ajoute l'ID de l'utilisateur à la requête pour le 
    traitement ultérieur.
*/