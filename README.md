# <b>🐕 Delgo Client Repository 🐕</b>
![logo_1](https://user-images.githubusercontent.com/54196723/185036077-7ec238dd-88f6-4c82-adc9-89eaca0b3c2c.png)

<br/>


## <b> 📚 Contents </b>

-   ### <b> <a href="#1"> 🐶 Service introduce </a> </b>
-   ### <b> <a href="#2"> 🐶 Repositories </a> </b>
-   ### <b> <a href="#3"> 🐶 Technology </a> </b>
-   ### <b> <a href="#0"> 🐶 Team introduce </a> </b>
-   ### <b> <a href="#4"> 🐶 Store link </a> </b>
-   ### <b> <a href="#5"> 🐶 Develop period </a> </b>
-   ### <b> <a href="#6"> 🐶 Result </a> </b>

<br/>




<h2 id="1">
    <b>💁 Service introduce</b>
</h2>

### 전국민 반려인을 위한 반려견 동반 여행 O2O 서비스 플랫폼

-   <b>지역별 다양한 숙소정보 제공</b>
-   <b>실시간 가격 비교</b>
-   <b>일정별 예약 현황 확인</b>
-   <b>간편한 예약 결제</b>
-   <b>쿠폰/포인트 할인</b>
-   <b>리뷰를 통한 솔직한 후기</b></b>
-   <b>마음에 드는 숙소찜</b>
-   <b>delgo 자체 숙소 추천</b>

<br/>


<h2 id="2">
<b>📂 Repositories</b>
</h2>

-   ### <b> <a href="https://github.com/Team-Delgo"> 🔗 Delgo-Organization </a> </b>
-   ### <b> <a href="https://github.com/Team-Delgo/DelgoClient" > 🔗 Delgo-Frontend </a> </b>
-   ### <b> <a href="https://github.com/Team-Delgo/DelgoServer" > 🔗 Delgo-Backend </a> </b>
-   ### <b> <a href="https://github.com/Team-Delgo/DelgoAndroid" > 🔗 Delgo-Android </a> </b>
-   ### <b> <a href="https://github.com/Team-Delgo/DelgoIOS"> 🔗 Delgo-IOS </a> </b>
-   ### <b> <a href="https://github.com/Team-Delgo/PMS" > 🔗 Delgo-PMS-Frontend </a> </b>
-   ### <b> <a href="https://github.com/Team-Delgo/PMS_SERVER" > 🔗 Delgo-PMS-Backend </a> </b>

<br/>


<h2 id="3">🛠 Technology</h2>

### ⚙️ Tech Stack

`React`, `Redux Toolkit`, `React Query`, `SCSS`, `TypeScript`, `Eslint`, `Prettier`, `Kakao Map`, `Toss Payments`, `Spring Boot`, `JPA`, `Maria DB`, `Nginx`, `Apache Tomcat`, `NCP`, `Object Storage`, `JWT`, `OAuth 2.0`, `REST API`

### ⚙️ Architecture

`MVC`

### ⚙️ ERD

![KakaoTalk_20220821_120505217](https://user-images.githubusercontent.com/54196723/185776809-d8868cdb-918c-4ba9-a75e-8e568074aad2.jpg)

<br/>

<h2 id="0">
    <b>💁 Team  introduce </b>
</h2>



| Name        | Part   | Development                                   |
|:------------:|:-------:|:-----------------------------------------------|
|<a href="https://github.com/wjdtjrdn1234">정석우</a>|**front-end**|숙소 검색 서비스 구현</li> <li>지역별 숙소 필터링 구현</li> <li>일정별 숙소 예약현황,가격정보 노출</li> <li>데이터 로딩시 보여줄 skeleton UI 개발 </li><br/>나의 저장소 서비스 구현<li>위시리스트 숙소리스트 노출 </li><li> 예약내역 리스트 노출 </li><li>위시리스트,여행내역 없을시 추천숙소 노출</li><br/>리뷰 작성 서비스 구현<li>formdata & FileReader 이용한 이미지확장자 파일 업로드(리뷰사진)</li><li>별점,텍스트,이미지를 통한 리뷰작성</li><br/>숙소 상세 서비스 구현<li>숙소사진,별점,리뷰,룸리스트,예약현황,가격,주소,숙소공지,환불규정 노출</li><li>일정별 예약현황,가격 다르게 노출</li><li>리뷰사진 있는 후기 필터링</li><li>Kakao Map API사용해 숙소위치 노출</li><li>react-responsive-carousel 라이브러리 사용해 숙소사진 슬라이더화</li><li>Redux Toolkit을 이용한 숙소정보,룸정보 상태관리</li><br/>예약 결제 서비스 구현 <li>Toss Payments API이용한 예약결제</li><li>쿠폰,포인트 이용한 할인</li><li>Redux Toolkit을 이용한 예약정보 상태관리(예약자명,숙소명,방타입명,쿠폰사용 유무,결제가격,일정)</li><br/>예약 조회 서비스 구현 <li>예약대기,예약확정에 따른 조건부 랜더링</li><li>예약 취소 구현 -> 취소시 예약취소 조회 페이지로 이동</li><br/>네이티브 Bridge 함수 연결 <li>Ios,Android copyToClipboard 연결</li><li>Ios,Android vibrate 연결</li><li>Ios,Android goToPlusFriends 연결</li><li>Ios,Android setNotify 연결</li><li>Ios numToCall 연결</li><br/> 에디터 노트 서비스 구현 <br/><br/>위시리스트 추가,삭제 구현 <br/><br/>React Query를 이용한 데이터 패칭,에러핸들링,로딩처리 비동기처리와 서버상태 관리<br/><br/>Redux Toolkit을 이용한 스크롤위치,지역명,탭 상태관리<br/><br/>axios.interceptors 이용한 accessToken ,refreshToken 재발급후 api재요청|
|<a href="https://github.com/ckrb63">김찬규</a>| **front-end**|로그인 서비스 개발<li>JWT Access, Refresh Token 관리</li> <li>비밀번호 찾기</li> <li>OAuth2.0 로그인 Kakao, Naver, Apple </li> <li>Redux Toolkit으로 회원 정보 상태 관리</li><br/>회원가입 서비스 개발<li>핸드폰 인증을 통한 회원가입 구현</li><li>입력값 정규식으로 유효성 검사, 불필요한 통신 최소화</li><li>FormData로 강아지 사진 등록</li><li>OAuth2.0 회원가입 Kakao, Naver, Apple </li><br/>회원 정보 페이지 서비스 개발<li>강아지 정보, 사진 수정</li><li>회원 정보 수정</li><li>예약 현황 확인</li><li>로그아웃, 회원탈퇴</li><li>쿠폰 조회,등록</li><li>리뷰 목록 페이지</li><li>설정 페이지</li><br/>체험 기능 구현<li>로그인이 필요한 기능은 SignIn페이지로 보내는 Alert</li><br/>Redux Toolkit을 통한 전역 비동기 Error Alert 기능 개발<br/><br/>Calendar 개발<li>Room Type에 따른 예약 가능 날짜,가격 동기화</li><br/>홈 화면 내부 페이징 가능한 예약현황 확인 서비스 개발<br/><br/>앱 내부 애니메이션, 효과<br/><br/>이미지 browser-image-compression로 Base64 압축 후 FormData 업로드|
|<a href="https://github.com/Gupuroom">이동재 </a>|**back-end**||
| <a href="https://github.com/danpung2">조현서 </a>|**back-end** <br/> **ios** <br/> **android**|회원 서비스 개발<li>유저, 펫 DB 관리</li> <li>회원가입 프로세스</li> <li>회원가입 시 이메일, 핸드폰 번호 등 중복 데이터 검증</li> <li>핸드폰 인증 DB 관리</li><li>핸드폰 인증 로직</li><li>핸드폰 번호 정규식으로 데이터베이스에 정해진 형식으로 저장</li><li>회원 정보, 강아지 정보 수정</li><li>회원탈퇴 기능 개발</li><br/>알림 서비스 개발<li>NCP의 sms 서비스를 활용한 핸드폰 인증 기능 담당</li><li>NCP의 BizMessage 서비스를 활용한 카카오톡 알림 기능 담당</li><br/>결제 서비스 개발<li>결제 취소 로직 개발</li><br/>Android 웹뷰 앱 개발<li>리액트와 안드로이드 간의 통신 구현</li><li>최초 실행 시 갤러리 등 디바이스 접근 권한 설정</li><li>웹뷰와 통신하여 진동, 디바이스 설정으로 이동 등 설정</li><li>웹뷰와 통신하여 카카오톡 플러스 친구로 이동 기능 개발</li><br/>Ios 웹뷰 앱 개발<li>리액트와 iOS 간의 통신 구현</li><li>최초 실행 시 알림 권한 설정</li><li>웹뷰와 통신하여 진동, 디바이스 설정으로 이동 등 설정</li><li>웹뷰와 통신하여 카카오톡 플러스 친구로 이동 기능 개발</li>|


<br/>



<h2 id="4">🛒 Store link</h2>

-   ### <b> <a href="https://play.google.com/store/apps/details?id=com.delgo.delgoandroid" target="_blank" > 🔗 Android </a> </b>
-   ### <b> <a href=""> 🔗 IOS </a> </b>

<br/>


<h2 id="5">📅 Develop period</h2>

<b>22.03.15 ~ 운영 관리 중</b>

<br/>


<h2 id="6">📷 Result</h2>
