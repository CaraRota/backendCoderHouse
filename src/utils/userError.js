import EErrors from '../services/errors/enums.js';

const UserErrorMiddleware = (error, req, res, next) => {
    console.log("Este es el error que arroja", error.code)
    switch (error.code) { //error.code siempre arroja undefined porque desde mongo el objecto error no tiene esa propiedad
        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name })
            break;
        default:
            res.send({ status: "error", error: "Unhandled error" })
            break;
    }
}

export default UserErrorMiddleware;