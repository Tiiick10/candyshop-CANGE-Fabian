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

    console.log(req.body);

    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont requis." });
    }
  
    try {
      db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (!user) {
          return res.status(400).json({ message: "Utilisateur non trouvé." });
        }
  
        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Mot de passe incorrect." });
        }
  
        // Génération du token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
  
        // Réponse avec un message et le token
        res.json({ message: "Connexion réussie", token, user: { id: user.id, username: user.username } });
      });
    } catch (error) {
      console.error("Erreur serveur:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  
  

module.exports = router
