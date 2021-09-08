SimonDev()를 간단한 클라이언트 데모를 위해 수정함

수정된 부분
1. 로그인 필요없이 처리되기 (대량 클라이언트를 로딩하여 서버에 부하를 주기 위함.)
2. 캐릭터를 변경함. (사용자, NPC)
3. 밝은 분위기 처리
4. 캐릭터의 이동 추가 (새)
5. 카메라의 줌 인/아웃


To web server in the current directory
웹서버를 로컬의 현재 디렉토리에서 실행하기 위해 local-web-server를 npm을 이용하여 global에 설치를 한다. 꼭 lcoal-web-server 말고 많은 http 서버거 았으니 다른 것을 사용하여도 상관이 없다. 

```
$ npm install -g local-web-server
```

client가 있는 directory에서 아래의 명령을 실행한다. 

``` 
$ ws 
```

서버를 먼저 실행한 상태에서 브라우져에 http://localhost:8000을 입력하여 페이지를 로딩합니다.