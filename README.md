# COZY Talk.(코지톡)
우리가 서로 편안한 채팅 공간 🙂    
<br/>
<img src="https://user-images.githubusercontent.com/116782319/231546355-63168b24-ea6a-4143-b4e9-276aecda3150.gif"  width="500" align="center" />
<h4>🔗demo http://49.50.172.207:3011/</h4>
   
   <br/><br/>
<h3>🌤️ COZY Talk 를 소개합니다 💬</h3>
<hr />

<p>일상에서 발견할 수 있는 안락함과 편안함을 나눠보세요.</p>
<p>대화 주제에 있어 정말 편안한 순간이 있으면 좋겟다고 생각했습니다.</p>
<p>코지톡은 익명채팅인 만큼, 서로를 존중하는 공간이 되길 바랍니다. 🙆</p>

   <br/><br/>
<h3>🛠️ 사용 기술 & 라이브러리</h3>

**`Frontend`**
• React / Redux / TypeScript / socket.io-client



**`Backend`**
• node / Express / socket.io


**`Communication`**
• Notion / Figma



   <br/><br/>
### 🎨 초기 디자인 & 기획

---

**`Figma`** 작업

<span>
<img src="https://user-images.githubusercontent.com/116782319/231549916-61c90f1f-ba55-47ff-9a8b-610ad3142c24.png"  width="300" align="center" />
<img src="https://user-images.githubusercontent.com/116782319/231549927-a3c73e1c-5b15-410a-a1ec-51b57e345b32.png"  width="300" align="center" />
</span>


1. 닉네임치고 들어가면, 채팅방 들어가기
2. 채팅시작 
3. 채팅방 기능 
- [x]  이모티콘 library
- [x]  DM 기능
- [x]  파일 전송 ( 이미지 파일)
- [x]  임티 기능
- [x]  공지 기능 ( 누구나 )


<p><a href="https://www.figma.com/file/7z1PhduusVui5q7UiFRKeg/%EC%B1%84%ED%8C%85?node-id=0%3A1&t=IOjnrFE3ITondcbF-1" />cozy figma</p>


   <br/><br/>
<h3>✒ 구현 기능</h3>
<hr />


<br/>

**채팅 로비**

**React & TypeScript 로 `SPA` 구현**

- 메인 로비화면에서 [socket.io](http://socket.io) 연결 요청
- 닉네임 입력 ⇒ 서버에서 { [socket.id](http://socket.id) 키 : 닉네임} 로 접속인원 저장
- 애니메이션 ⇒ 배경이미지 간단한 움직임 구현
- 입. 퇴장 ⇒ 시간, 날짜, 알림

<img src="https://user-images.githubusercontent.com/116782319/231546758-213e872d-2700-483e-a752-327a8003056d.png"  width="500" align="center" />


<br/><br/>

**채팅방 기능**

- **`Multer`** 미들웨어 ⇒ 파일 업로드 ⇒ socket으로 view 전달
- **`emoji-mart`** 라이브러리 사용 ⇒  **`이모지`** 기능
- **`DM`** ⇒  socket의 [io.emit.to](http://io.emit.to) 기능 사용 & 본인에게는 사용 불가
    
    일반 채팅과 DM 색 다르게 구현
    
- **`공지`** ⇒  **`redux`** 에 데이터를 배열로 저장 ( map함수 reverse로 최신순 출력 )
    
    최신 공지만 활성화
    
<span>
<img src="https://user-images.githubusercontent.com/116782319/231547211-d8635de3-c477-4f67-96fb-b1e3b18136ec.png"  width="400" align="center" />
<img src="https://user-images.githubusercontent.com/116782319/231547207-f207fbca-eff7-4dc1-b054-1c9558b46db5.png"  width="400" align="center" />
</span>
    
<br/><br/>

**반응형**

- 화면 크기에 따라 ui와 기능 변경

<span><img src="https://user-images.githubusercontent.com/116782319/231548217-91bbfda5-f10d-4553-9aa4-5ad94390b5dc.png"  width="250" align="center" />
<img src="https://user-images.githubusercontent.com/116782319/231548259-2700d9bd-f3ec-4c45-b23a-4bf2814129cd.png"  width="200" align="center" />
<img src="https://user-images.githubusercontent.com/116782319/231548287-add4928e-15c9-4da6-b767-47700e7852bd.png"  width="140" align="center" /></span>




   <br/><br/>
### 🤔 배운점 & 느낀점

---

[COZY Talk. 개인 회고록](https://www.notion.so/COZY-Talk-9c7704d2be7246068a7d2022f7fd8be6)

**타입스크립트 기반 리엑트를 처음해봐서 😂**

겪는 오류들이 모두 타입스크립트 때문인줄 알았습니다…

하지만, 기본적으로 리액트 오류들도 많아 리액트도 계속 공부해야하는 것을 느꼈네요

타입 지정보다는 응용하는 법이 조금 어려웠던 것 같아요.

리덕스나 이런데에 어찌 응용하는것 등! 다음에는 본격적으로 더 응용을 해보고싶어요.

<br/>


**팀원들 없는 개인 프로젝트 😔**

기획이나 계획은 혼자라서 더 빨랐지만, 의견을 많이 물어보고 싶었어요 

혼자하다보니 초조함에 오타나 문법으로 틀려서 혼자 끙끙 거리던 모습이 기억나는데..

오류를 볼 때 좀 더 차분히 살펴봐야 한다고 리마인드를 하게되었습니다.

<br/>


**socket을 사용해 볼 좋은 기회였습니다.💨**

저번 반다리 프로젝트 때 DB를 사용해서 하던것을

저도 간단하게 DB없이 해보고싶었습니다. 

반다리 때는 없던 DM, 이모지, 공지, 업로드 기능들을 혼자나마 구현해서 보람있었습니다.

<br/>


**css 여전히.. 까다롭지만!**  ☺️

이번에는 조금이나마 소소하게 애니메이션을 넣었고, 컨셉과 잘 맞아서 뿌듯하네요!

다음에는 테일윈드 한번 써보고 싶습니다.

<br/>


**다음에는 클론코딩도 해보고싶어요** 💛

리액트 & 타입스크립트 사용해서 클론코딩 혼자 해봐도 좋을것같네요!
