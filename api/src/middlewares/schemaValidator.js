export const schemaValidator = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors.map(err => err.message).join(', ');
    return res.status(400).json({ message: errorMessage });
  }
};