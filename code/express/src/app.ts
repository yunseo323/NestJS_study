import * as express from "express";

const app: express.Express = express(); //서버

const port: number = 8000;

app.get("/test",(req:express.Request, res:express.Response)=>{
    //req(front -> /주소로 요청을 보냄)
    //res: app에서 보내는 응답(back->front) -> 다양한 데이터의 응답
    res.send({hi:"hello"});
})

app.listen(port, ()=>{ //listen: 포트번호에 서버를 염
    console.log(`app is listening at http://localhost:${port}`);
})

