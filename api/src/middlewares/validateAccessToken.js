import { checkAccessToken } from "../config/generateToken.js";

export const validateAccessToken = (req, res, next) => {
    const accessToken = req.headers.authorization;

    try {
        if (!accessToken || !accessToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No valid token, authorization denied." });
        }
        const token = accessToken.split(' ')[1]; // Remueve 'Bearer ' y obtiene solo el token
        const verified = checkAccessToken(token);
        req.user = verified; // Asigna el usuario verificado a req.user
        next(); // Continua con la siguiente función en la ruta
    } catch (error) {
        return res.status(401).json({ message: "Could not get authorized." });
    }
};