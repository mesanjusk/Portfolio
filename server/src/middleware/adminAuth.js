const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345';

export const requireAdmin = (req, res, next) => {
  const password = req.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Admin password is required.' });
  }
  next();
};
