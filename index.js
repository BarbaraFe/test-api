const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "Carlos", email: "carlos@email.com" }
];

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: "API funcionando" });
});

// Listar usuários
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Buscar usuário por id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
  res.json(user);
});

// Criar usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Campos obrigatórios" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Deletar usuário
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
