import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'randomSecret', {
    expiresIn: '1h'
  });
};

export default generateToken;