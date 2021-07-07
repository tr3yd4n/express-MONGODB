import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import authorsRoutes from "./authors/index.js"
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js"
import blogsRoutes from "./blogs/index.js"
import mongoose from 'mongoose'


const server = express()
const port = process.env.MONGO_CONNECTION
console.log(process.env)




server.use(cors())

server.use(express.json())

// ROUTES

server.use("/authors", authorsRoutes)

server.use("/blogs", blogsRoutes)

//  next(err) --> ERROR HANDLERS
server.use(notFound)

server.use(forbidden)

server.use(catchAllErrorHandler)

console.table(listEndpoints(server))

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, })
    .then(server.listen(port, () => { console.log("Running on port", port) }))
    .catch((err) => console.log(err))


