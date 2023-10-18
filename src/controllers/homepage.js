// HOMEPAGE CONTROLLER
export const getHomepage = (req, res) => {
    try {
        res.status(200).redirect('/static/login');
    } catch (error) {
        res.status(400).send({ error: `Error en login: ${error}` });
    }
}

//ERROR HANDLING
export const handleErrors = (req, res) => {
    res.status(404).send("Error 404 - Pagina no encontrada");
}