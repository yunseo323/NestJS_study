# NestJS란

- TS 지원하는 노드 서버 애플리케이션 프레임워크
- express 기반
    - express와의 다른점은 NestJS는 아키텍처 구조를 프레임워크에서 제공한다는 점
    - express에서 사용한 라이브러리들을 그대로 사용 가능
    - Fastify를 부분적으로 사용할 수 있는 호환성


# Restful API에 대해

- 웹 서비스를 디자인하는 아키텍처 접근 방식인 REST(Representational State Transfer)
- REST는 어떤 기본 프로토콜과도 독립적이며 HTTP에 연결될 필요가 없지만, 일반적인 API 구현은 HTTP 프로토콜을 사용

## 정리해뒀던 rest api 
- 서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현. 
- REST에서는 주소 외에도 HTTP 요청 메서드라는 것을 사용 (GET, POST, PATCH...)
- REST: REpresentational State Transfer -> 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
- 주소 하나가 요청 메서드를 여러 개 가질 수 있음
    
    
[실습코드](https://github.com/posting-study/node_study/blob/main/codeFiles/REST/restServer.js)

- require로 http 모듈을 불러옴
- http 모듈의 `createServer` 함수로 서버 생성
- `.listen` 함수는 서버를 시작하게 하고, 클라이언트의 요청에 대기함 (8082 포트에서 대기중)
- createServer 함수에 비동기 함수 넘김. try-catch 문 사용
    - `GET(가져옴)`
        - 웹 브라우저 주소창에 URL을 입력하는 경우
        - 링크를 클릭하는 경우
        - 입력폼의 메소드 속성값이 get인 경우
    - `POST(게시)`, `PUT(집어넣음)` : 코드의 흐름을 기억할 것
        - `body`를 만든 후, 요청을 stream 형식으로 받음(코드 확인하기)
        - `req.on('data')`, `req.on('end')` 사용 -> 데이터를 꺼내기 위한 작업

    (POST의 GET의 문제점 해결)
        - URL에 데이터가 포함되지 않아 외부에 노출되지 않음
        - 바이너리, 대용량 데이터 전송 가능

    - `PATCH(부분 수정)`
    - `DELETE(삭제)`


-> 요청과 응답은 모두 헤더와 본문을 가짐. 헤더는 요청/응답에 대한 정보를 가지고, 본문은 서버와 클라이언트 간에 주고받을 실제 데이터를 담아둠

-> 개발자 도구 Network 탭에서 확인 가능

- `General`: 공통된 헤더
- `Request Headers`: 요청의 헤더
- `Response Headers`: 응답의 헤더 
- `Request Payload`: 요청의 본문
- `Preview`나 `Response` 탭: 응답의 본문
