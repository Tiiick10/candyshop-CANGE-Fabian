const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const usersFile = "users.json"

// Charger les utilisateurs depuis un fichier JSON

const loadUsers = () => {
  if (!fs.existsSync(usersFile)) return []
  return JSON.parse(fs.readFileSync(usersFile, "utf8"))
}

// Sauvegarder les utilisateurs

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8")
}

// Inscription d'un utilisateur

app.post("/api/users/register", async (req, res) => {
  const { username, email, password } = req.body

  let users = loadUsers()

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "Email déjà utilisé" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { id: Date.now(), username, email, password: hashedPassword }

  users.push(newUser)
  saveUsers(users)

  res.status(201).json({ message: "Utilisateur créé avec succès" })
})

// Connexion d'un utilisateur

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body

  let users = loadUsers()
  const user = users.find(u => u.email === email)

  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect" })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" })

  res.json({ user, token })
})

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`))
