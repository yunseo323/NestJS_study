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

## 2. 미들웨어 생성

## 3. CRUD api 생성 

## 4. 라우터(모듈) 분리

app.ts 에서 라우터들을 분리함.

이제 app.get이 아닌 route.get으로 받음

-> 분리한 라우터들에게 전달해주는 라우터(분리한 라우터 파일에서 export)가 생김

요청 -> 미들웨어 -> 전달 라우터 -> 처리 라우터

## express 싱글톤 패턴, 서비스 패턴

### <싱글톤 패턴>
객체의 인스턴스가 한개만 생성되게 함 -> 클래스로 딱 하나만 찍어낸다!

app이 전역적으로 쓰이기 때문에 이를 하나만 빼주도록 하겠다.

```TS
//app.ts
//** Create Read */

import * as express from 'express';
import catsRouter from './cats/cats.route';

class Server { // Server 클래스 생성
  public app: express.Application;

  constructor() { //인스턴스가 생성될 때 app이 하나 만들어짐
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() { //라우터들을 set
    this.app.use(catsRouter);
  }

  private setMiddleware() { //미들웨어
    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is logging middleware');
      next();
    });

    //* json middleware
    this.app.use(express.json());

    this.setRoute(); 

    //* 404 middleware
    this.app.use((req, res, next) => {
      console.log('this is error middleware');
      res.send({ error: '404 not found error' });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log('server is on...');
    });
  }
}

function init() {
  const server = new Server(); //server 하나만 씀
  server.listen(); 
}

init(); //init 함수 하나만 생성되게 함
```


### <서비스 패턴>

라우터에 서비스 패턴 적용하기 -> 유지보수 & 가독성 높이기

service.ts를 만든 뒤 route.ts의 비즈니스 로직을 옮긴다 => Nest에서 하는 방식