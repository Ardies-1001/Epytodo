// Importe le module bcrypt pour le hachage des mots de passe
const bcrypt = require('bcryptjs');
// Importe les fonctions de requête utilisateur depuis le fichier user.query
const { getUser, getUserTodos, updateUser, getUserUpdateResponse, deleteUser } = require('./user.query');

// Fonction pour récupérer les informations d'un utilisateur
async function user(req, res) {
    // Renvoie les informations de l'utilisateur correspondant à l'ID dans la requête
    return res.status(200).json(await getUser(req.userId));
}



// Fonction pour supprimer un utilisateur
async function userDelete(req, res) {
    // Supprime l'utilisateur correspondant à l'ID dans la requête
    deleteUser(req.id);
    // Renvoie un message indiquant que l'utilisateur a été supprimé avec succès
    return res.status(200).json({ 'msg': `Successfully deleted record number: ${req.id}` });
}

// Fonction pour récupérer les tâches d'un utilisateur
async function userTodos(req, res) {
    // Renvoie les tâches de l'utilisateur correspondant à l'ID dans la requête
    return res.status(200).json(await getUserTodos(req.userId));
}

// Fonction pour récupérer les informations d'un utilisateur par son ID
async function userById(req, res) {
    // Renvoie les informations de l'utilisateur correspondant à l'ID dans la requête
    return res.status(200).json(await getUser(req.id));
}

// Fonction pour mettre à jour les informations d'un utilisateur
async function userUpdate(req, res) {
    // Récupère les données de la requête
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;
    // Expression régulière pour valider le format de l'email
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    // Vérifie si des paramètres obligatoires sont manquants ou si l'email est mal formaté
    if ([email, password, name, firstname].includes(undefined) === true || emailRegex.test(email) === false) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si les paramètres sont incorrects
    }
    try {
        // Met à jour les informations de l'utilisateur avec le nouvel email et le mot de passe haché
        await updateUser(req.id, email, bcrypt.hashSync(password, 10), name, firstname);
    } catch(err) {
        return res.status(409).json({ 'msg': 'Account already exists' }); // Renvoie une erreur 409 si un compte avec cet email existe déjà
    }
    // Renvoie les nouvelles informations de l'utilisateur après la mise à jour
    return res.status(200).json(await getUserUpdateResponse(req.id));
}

// Exporte toutes les fonctions pour les rendre disponibles pour d'autres modules
module.exports = {
    user,
    userTodos,
    userById,
    userUpdate,
    userDelete
};
