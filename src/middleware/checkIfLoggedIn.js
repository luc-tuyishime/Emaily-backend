// Middleware is a function that take the incoming request and has the ability to modify it inside the middleware body

export default (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({
            error: 'You must log in'
        })
    }
    next()
}

// Next is a middleware that we call after 