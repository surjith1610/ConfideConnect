import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, decodedToken) => {
      if (err) return res.sendStatus(403);
      // if (decodedToken.userId != req.params.userId) return res.sendStatus(401);
      next();
    });
}