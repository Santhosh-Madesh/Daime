

function adaptMiddleware(middleware){

    return async(req, res, next)=>{

        const request = {
            params: req.params,
            query: req.query,
            body: req.body,
            headers: req.headers
        }

        const response = await middleware.handleRequest(request);

        if(!response){
            res.status(400).json("Invalid input")
            return
        }

        

        req.userId = response;


        next()

    }
}

module.exports = adaptMiddleware;