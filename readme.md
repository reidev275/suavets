# SuaveTS

A Port of Suave.io to TypeScript as Express Middleware.

### WebPart

The entire library is designed to be `WebPart`s all the way down.  All filters and writers create `WebPart`s and there are combinators to combine multiple `WebPart`s into a single `WebPart`.


### choose

The `choose` function in `/src/webPart` takes an array of `WebPart` objects and attempts each one in order until it finds one that matches and then uses that `WebPart` to serve the response.


### pipe

The `pipe` function in `/src/webPart` takes an array of `WebPart` objects and combines them all together to create a new `WebPart` object.  

### Express Middleware

To plug this into the Express ecosystem, simply pass a `WebPart` to the `run` function from `/src/web` and pass the result to the `app.use` command from Express.  See `/examples` for some examples.
