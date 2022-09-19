# NestJS를 위한 express 정리

## 1. 초기 세팅

tsconfig.json의 컴파일 옵션에 따라 컴파일 -> dist 폴더 생성(js 파일)

```JSON
//package.json

{
    "scripts": {
      "build": "tsc", //tsconfig.json 옵션에 따라 컴파일
      "dev": "tsc-watch --onSuccess \"node dist/app.js\"", //tsc-watch로 컴파일 성공시 다음 파일을 실행하라
      "prestart": "npm run build",
      "start": "node dist/app.js" //npm run start -> prestart-> build
    },
    "devDependencies": {
      "@types/express": "^4.17.12",
      "@types/node": "^15.3.0",
      "prettier": "^2.2.1",
      "tsc": "^2.0.3", //ts 컴파일러
      "tsc-watch": "^4.2.9", //파일이 변경되면 컴파일을 자동으로
      "typescript": "^4.3.4"
    },
    "dependencies": {
      "express": "^4.17.1"
    }
  }
```

```TS
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
```


