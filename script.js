/* text_iife.js */
// 텍스트 작성과 삭제 즉시 실행 함수
(function(){
    const spanEl = document.querySelector("main h2 span");
    /*document.querySelector(sellectors)는 제공한 선택자 또는 선택자 뭉치와 일치하는 문서 내 첫 번째 Element를 반환한다. 일치하는 요소가 없으면 null을 반환한다. */
    const txtArr = ['저것도', '요것도', '저기도', '요기도', '여기도'];
    //const는 절대로 변경되지 않을 값을 사용함
    let index = 0;
    //let은 한번 선언했던 변수와 동일하게 생성되는 것을 방지함(중복 사용 금지)
    let currentTxt = txtArr[index].split("");
    //split()은 객체를 지정한 구분자를 이용하여 여러 개의 문자열로 나눈다.
    //txtArr[index].split("")는 내용이 없으므로 다 나누게 한다.
    function writeTxt(){
      spanEl.textContent  += currentTxt.shift();
      //shift()는 배열에서 첫 번째 요소를 제거하고 제거된 요소를 반환한다.  
      //spanEl.textContent는 spanE1인터페이스의 textContent속성은 노드와 그 자손의 텍스트 콘텐츠를 표현한다.

      if(currentTxt.length !== 0){ 
        setTimeout(writeTxt, Math.floor(Math.random() * 200));
        //setTimeout는 어떤 코드를 바로 실행하지 않고 일정 시간 기다린 후 실행함
        //setTimeout(writeTxt, Math.floor(Math.random() * 100));는 첫 번째 인자는 실행할 코드(writeTxt), 두 번째 인자는 지연 시간(Math.floor(Math.random() * 100))단위는 ms
      }else{
        currentTxt = spanEl.textContent.split("");
        setTimeout(deleteTxt, 4000);
      }
    }
    function deleteTxt(){
      currentTxt.pop();
      spanEl.textContent = currentTxt.join("");
      //join()는 배열의 모든 요소를 연결해 하나의 문자열로 만든다.
      if(currentTxt.length !== 0){
        setTimeout(deleteTxt, Math.floor(Math.random() * 200))
      }else{
        index = (index + 1) % txtArr.length;
        currentTxt = txtArr[index].split("");
        writeTxt();
      }
    }
    writeTxt();
  })();
  /* end text_iife.js */


  /* scroll_request.js */
  /* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
  //메뉴바 고정
  const headerEl = document.querySelector("header");
  window.addEventListener('scroll', function(){
    requestAnimationFrame(scrollCheck);
  });
  function scrollCheck(){
    let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
    if(browerScrollY > 0){
      headerEl.classList.add("active");
    }else{
      headerEl.classList.remove("active");
    }
  }
  /* end scroll_request.js */
  

  /* move.js */
  /* 애니메이션 스크롤 이동 */
  const animationMove = function(selector){
    // ① selector 매개변로 이동할 대상 요소 노드 가져오기
    const targetEl = document.querySelector(selector);
    // ② 현재 브라우저의 스크롤 정보(y 값)
    const browserScrollY = window.pageYOffset;
    // ③ 이동할 대상의 위치(y 값)
    const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
    // ④ 스크롤 이동
    window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
  };
  // 스크롤 이벤트 연결하기
  const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
  for(let i = 0; i < scollMoveEl.length; i++){
    scollMoveEl[i].addEventListener('click', function(e){
      const target = this.dataset.target;
      animationMove(target);
    });
  }
  /* End move.js */