// Les élements pour démarrer le serveur
const express = require('express');
const app = express();
const port = 3000;

// Ici on liste les packages à utiliser
require('dotenv').config();
const bodyParser = require('body-parser');

// C'est le block du Middlewares
const authMiddleware = require('./middleware/auth');
const userNotFoundMiddleware = require('./middleware/userNotFound');
const todoNotFoundMiddleware = require('./middleware/todoNotFound');

// Blocks des Routes
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todosRoutes = require('./routes/todos/todos');

// La Consideration du body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Les endpoints sont construit
app.post('/register', authRoutes.register);
app.post('/login', authRoutes.login);
app.get('/user', authMiddleware, userRoutes.user);
app.get('/user/todos', authMiddleware, userRoutes.userTodos);
app.get('/users/:id', authMiddleware, userNotFoundMiddleware, userRoutes.userById);
app.put('/users/:id', authMiddleware, userNotFoundMiddleware, userRoutes.userUpdate);
app.delete('/users/:id', authMiddleware, userNotFoundMiddleware, userRoutes.userDelete);
app.get('/todos', authMiddleware, todosRoutes.todos);
app.get('/todos/:id', authMiddleware, todoNotFoundMiddleware, todosRoutes.todo);
app.post('/todos', authMiddleware, todosRoutes.todoInsert);
app.put('/todos/:id', authMiddleware, todoNotFoundMiddleware, todosRoutes.todoUpdate);
app.delete('/todos/:id', authMiddleware, todoNotFoundMiddleware, todosRoutes.todoDelete);


// Lancement du serveur sur le port donnée
app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
});
