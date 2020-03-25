const jwt = require('jsonwebtoken');
const users = require('../../database/users');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    
    if (!(email || password)) {
      return res.status(400).json({ error: 'Email e password são obrigatórios!' });
    }

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ error: 'Email ou senha incorretos!' })
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Email ou senha incorretos!' })
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, 'c706a38d356b588477ff8a4f46c203f5', {
        expiresIn: '7d',
      }),
    });
  }
}

module.exports = new SessionController();