# NestJS 개요 및 객체지향 패턴

Nest CLI 를 사용해 새 프로젝트를 설정함

```BASH
$ npm i -g @nestjs/cli
$ nest new project-name
```

src
- app.controller.spec.ts: 컨트롤러에 대한 단위 테스트
- app.controller.ts: 단일 경로가 있는 기본 컨트롤러
    - 컨트롤러가 return 값을 받음(2)
- app.module.ts: 애플리케이션 루트 모듈
    - 모듈로 AppController, AppService 가 export 됨(3)
- app.service.ts: 하나의 방법으로 기본 서비스 제공
    - 비즈니스 로직
    - res.send가 아닌 return(1)
- 메인.ts: NestFactory를 사용해 Nest 어플리케이션 인스턴스 생성함
    - 모듈이 NestFactory.create()에 들어감(4)

# NestJS 구조 - Controller 패턴

- 컨트롤러의 목적은 애플리케이션에 대한 특정 요청을 수신
- 라우팅 메커니즘은 어떤 컨트롤러가 어떤 요청을 수신하는지 제어
- 종종 각 컨트롤러에는 둘 이상의 경로가 있으며 다른 경로는 다른 작업을 수행할 수 있음
- 기본 컨트롤러를 만들기 위해 **클래스**와 **데코레이터**를 사용 합니다. 
    - 데코레이터는 클래스를 필수 메타데이터와 연결하고 Nest가 라우팅 맵을 생성할 수 있도록 합니다(요청을 해당 컨트롤러에 연결).

- 라우팅 : end point 설정
- Param
- Dto : body의 속성들

# Providers & 의존성 주입

- 기본 Nest 클래스는 대부분 공급자로 취급: 공급자, 종속성을 주입
- DI 찾아보기 :  객체지향, 의존성 관리 (키워드)

# Modules & 캡슐화

- 모듈 생성 (mo 혹은 modules)
```BASH
$ nest g mo module_name
```

# Nest 미들웨어

# Exception filter & Pipes - Pipe 패턴

# Intercerptors & AOP 패턴



