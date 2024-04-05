const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
       auth: {
            user: 'ashmithalaxmi@jmangroup.com',
            pass: 'Jman@600113',
         },
    });


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token');
      } else {
        req.user = decoded; // Attach decoded user data to the request
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
};


module.exports = {
    authenticateJWT,
    transporter
  }