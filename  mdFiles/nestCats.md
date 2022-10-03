nestCat 서비스 만들어보며 배우기

# 1. NestJs MongoDB 연결 with mongoose

- app.module.ts에 몽구스 - 몽고디비 연결
- 환경변수 설정 ->  @nestjs/config 설치
- ConfigModule을 import 해줘야 사용 가능 

# 2. DB 스키마, 컨트롤러 설계 & validation

- mongoose import
- 모듈 컨트롤러 설계(Get, Post...)
- 스키마 생성: 모듈.schema.ts 생성
    - class-validator(라이브러리) 설치 : db에 저장될때 validation 기능 검사 -> 몹시 유용!

# 회원가입 서비스 개발 & DTO 패턴

<controller>
- signUp 기능 구현 : 회원가입 시 필요한 요소를 validaion 검사하자
- email, name, password가 필수로 있어야 함 => DTO로 달아주자

<service>
- 전달받는 body에서 데이터 validaion 검사
- password 암호화
- db에 저장 -> service에서 schema를 쓰려면 의존성 주입이 필요함
- cats.module.ts에 import 해줘야 쓸 수 있음 
- cat.service에서 promise로 리턴 -> controller에서 await으로 받음

- DTO 패턴: 계층간 데이터 교환을 위한 객체
    - DB에서 데이터를 얻어 서비스나 컨트롤러로 보냄 이말은,
    - 클라이언트에서 받은 데이터를 DTO로 변환해 validation 검사를 하고, 이것이 컨트롤러, 서비스, db에 이동하는 것이다
    - 클래스 패턴을 사용하는 이유: 데코레이터 사용 가능, 상속(재사용성)

- CatSchema를 숨겨주자 (스키마 단계에서 비밀번호를 볼 수 있으면 안됨)
    - CatSchema에서 virtual('readOnlyData')를 만들어줌 -> 가상 (실제 데이터베이스x)
    - 이걸 service.ts에서 .readOnlyData만 반환해주자

# NestJS와 fastify & 협업을 위한 API 문서 만들기, CORS

- api 설계 : end point, 메서드, body 내용..
- nest가 제공해주는 api 만드는 툴을 사용해보자
- `fastify`: Express와 유사한 방식으로 작동하는(하지만 더 빠른) nest에 적합한 프레임워크 
    - 추천하는 설계: 기본동작 api 설계는 express로, 빠른 속도가 필요한 건 fastify로
- swagger 설치 -> main.ts에서 설정
- swagger의 endpoint로 가면 api 구성을 볼 수 있음 -> http://localhost:8000/docs
- 컨트롤러에 @ApiOperation으로 각 기능을 설명해 줄 수 있음
- 컨트롤러에 @ApiResponse로 각 상태코드에 대한 description을 달아줄 수 있음 -> dto 사용도 가능
- Dto에 apiProperty를 달아줄 수 있음 (request 예시)

dto의 property를 schema에서 가져오자 (상속이용)
- PickType, OmitType 사용해서 일부만 가져올 수 있음

### CORS란?
Cross-origin resource sharing(CORS): 서비스하고 있지 않은 사이트에서 의도치 않은 접근을 막음. CORS에서 허용한 페이지만 접근 허용함.

# Repository 패턴과 레이어 분리

- cats repository 모듈 사용해 주기 위해 module.ts에 등록(providers)
- service.ts에서도 클래스에 CatsRepository로 의존성 주입 연결
### Repository 디자인 패턴

- 서비스 로직과 데이터베이스 사이의 중개자(repository)를 둠
- 여러 서비스 모듈에서 데이터베이스를 접근하고자 할때 서비스 모듈끼리 순환 참조를 하는 것이 아니라, repository에게 일을 맡김 -> 모듈간의 분리
- 다른 여러 데이터베이스를 사용할때도 중간에서 로직을 분리할 수 있음 (몽고디비, mysql 둘다 사용하는 경우...)
- repository 또한 dependency injection이 가능한 class임



# JWT와 로그인 서비스 & 순환 참조 모듈

# passport와 인증 전략 & Custom decorator

# Swagger API와 보안 설정 & 로그인 API 프론트엔드와 연결

# Multer와 미디어 파일 서비스