

function adaptRoute(controller){

    return async(req, res) => {
        const request = {
            params: req.params,
            query: req.query,
            body: req.body,
            headers: req.headers,
            userId: req.userId ? req.userId : null
        }

        const response = await controller.handleRequest(request);

        res.status(response.statusCode).json(response.body);
    }
}

module.exports = adaptRoute;