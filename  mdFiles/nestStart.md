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
- 컨트롤러에서 서비스를 의존성을 주입받음(서비스를 사용할 수 있음)

# Modules & 캡슐화

- 모듈 생성 (mo 혹은 modules)
```BASH
$ nest g mo module_name
```
- 모듈이름은 복수형으로
- 컨트롤러,서비스도 CLI로 만들 수 있음
- 각 모듈들은 묶여져서 App Module 하나로 export, main으로 간다
- App Module에서 각 모듈들에서 만들어낸 상품들을 사용할 수 있는 것임 -> 다시 말해서 controllers(AppController)와 providers(AppService)에서 사용할 수 있는 것임

=> 이를 **캡슐화**라고 함

- 모듈은 기본적으로 공급자를 캡슐화한다. 현재 모듈의 직접 부분이 아니거나 가져온 모듈에서 exports  하지 않은 공급자를 삽입할 수 없음  
- 사용하려면 무조건 export 해야함!
- 그렇다고 providers에 하나하나 달아주는 것은 좋은 패턴이 아님 : 단일 책임의 원칙
- 해당 모듈에서 해당 서비스를 외부에서 접근 가능하도록 providers에서 제공해주는 것티 맞음
# Nest 미들웨어
마찬가지로 CLI로 만들 수 있음

- 미들웨어: 라우터 이전에 호출(express와 동일)
- 미들웨어는 순서가 있음
- 마찬가지로 제공자, 소비자 개념으로 이해
- @Injectable: 의존성 주입 가능 (provider에)
    - 공급자 및 컨트롤러와 마찬가지로 동일한 모듈 내에서 사용할 수 있는 종속성을 삽입 -> constructor
    - @Module 데코레이터에는 미들웨어 설정 x
    - 대신 configure() 모듈 클래스 메서드를 사용해 설정
- .forRoutes()로 모듈에 바인딩

# Exception filter(예외처리)

- NestJS에서는 자동으로 statusCode, message, error 내보냄
- http Error은 HttpException(), HttpStatus 사용
- 예외처리 메시지를 일일이 달아주는 것은 비효율적
- 재사용성을 고려해 하나로 모이게 해서 필터링을 거쳐 리턴하게 한다 : http-exception.filter.ts
- filter 적용
    - 각각: @useFilters
    - 전역: app.useGlobalFilters(new ExceptionFilter()) //app에 대해서 필터링 추가
- error 형식에 따라 분기 처리 가능
- express: res.status(400).send({...})
- NestJS: response.status(status).json({...}) //send를 json 형식으로

# Pipes - Pipe 패턴

파이프에는 두가지 일반적인 사용이 있음
- 변환: 입력 데이터를 원하는 형식으로 변환
- 유효성 검사: 입력 데이터를 평가하고 유효하면 변경하지 않고 전달 (데이터가 올바르지 않으면 예외 발생)

-> ex) param을 숫자 자료형으로 변환 시켜줄 수 있고, 문자열이 들어오면 error를 낸다

- 이 파이프는 파이프들끼리 연결을 해서 기능을 추가할 수 있다
- request -> 미들웨어 -> 인터셉터 -> 파이프 -> 컨트롤러 -> 서비스 -> 인터셉터 -> 예외처리필터 -> response
# Intercerptors & AOP 패턴

- 인터셉터는 @Injectable() 데코레이터로 주석이 달린 클래스
- 인터셉터는 NestInterceptor 인터페이스를 구현해야 함
- AOP(Aspect Oriented Programming) 기술 -> 분리로 모듈성을 증가시킴



