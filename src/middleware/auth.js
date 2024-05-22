// Importe le module jsonwebtoken pour la gestion des tokens JWT
const jwt = require('jsonwebtoken');
// Importe la fonction getUserIdByEmail depuis le fichier user.query dans le répertoire routes/user
const { getUserIdByEmail } = require('../routes/user/user.query');

// Middleware pour l'authentification des utilisateurs
async function auth(req, res, next) {
    let decoded;
    // Récupère le token d'authentification à partir de l'en-tête de la requête
    const token = req.headers.authorization;

    try {
        // Vérifie et décode le token avec la clé secrète
        decoded = jwt.verify(token, process.env.SECRET);
    } catch(err) {
        return res.status(498).json({ 'msg': 'Token is not valid' }); // Renvoie une erreur 498 si le token n'est pas valide
    }

    // Récupère l'ID de l'utilisateur à partir de l'email décodé
    const userId = await getUserIdByEmail(decoded.email);

    // Vérifie si aucun utilisateur n'est trouvé avec cet email
    if (userId === false) {
        return res.status(404).json({ 'msg': 'Not found' }); // Renvoie une erreur 404 si aucun utilisateur correspondant n'est trouvé
    }

    // Si l'utilisateur est authentifié avec succès, ajoute son ID à la requête pour le traitement ultérieur
    req.userId = userId;
    next(); // Passe au middleware suivant
}

// Exporte la fonction auth pour l'utiliser dans d'autres modules
module.exports = auth;


/*

    Resumer
    Ici le script gère l'authentification des utilisateurs en vérifiant la 
    validité du token JWT, en décodant le token pour obtenir l'email 
    de l'utilisateur, puis en récupérant l'ID de l'utilisateur correspondant 
    à cet email. Ensuite, il ajoute l'ID de l'utilisateur à la requête 
    pour le traitement ultérieur. Si aucun utilisateur n'est trouvé avec cet email,
    il renvoie une erreur 404

*/