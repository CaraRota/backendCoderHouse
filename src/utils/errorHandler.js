//Error handling
import EErrors from '../services/errors/enums.js';

export default (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EErrors.INVALID_USER_ERROR:
            res.status(400).send({ status: "error", error: error.message });
            break;
        case EErrors.INVALID_PRODUCT_ERROR:
            res.status(400).send({ status: "error", error: error.message });
            break;
        default:
            res.status(500).send({ status: "error", error: "Unhandled error" });
            break;
    }
}