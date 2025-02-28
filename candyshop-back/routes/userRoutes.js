const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const router = express.Router()

// Inscription

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body

  if (password !== repeatPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas." })
  }

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: "Email déjà utilisé." })

    const newUser = new User({ username, email, password })
    await newUser.save()

    res.status(201).json({ message: "Compte créé avec succès !" })
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

// Connexion

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect." })

    res.json({ message: "Connexion réussie", user: user.username })
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

module.exports = router
