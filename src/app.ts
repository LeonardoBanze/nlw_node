import "dotenv/config"
import  express  from "express";
import { router } from "./Routes";
import http from "http"
import {Server, Socket} from "socket.io"

import cors from "cors"


const app =  express();

app.use(express.json());
app.use(cors())

const ServerHttp = http.createServer(app);

const io = new Server(ServerHttp, {
    cors:{
        origin: "*"
    }
});

io.on("connection", (socket) =>
{
    console.log(`usuario conectado no socket ${socket.id}`);
})

app.use(router)

app.get("/github", (request, response) =>{
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.get("/signin/callback", (request, response) =>{
    const {code} = request.query;
    return response.json(code);
})

export{ServerHttp, io}