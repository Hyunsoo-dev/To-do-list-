const $clock = document.querySelector('.clock');

function countClock() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dayOfWeek = date.getDay(); 
  let hours = date.getHours();

  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];
  if (hours >= 12 && hours <= 24) {
    $clock.textContent = `${year}년 ${month}월 ${day}일 ${DAY_OF_WEEK[dayOfWeek]}요일 오후 ${hours - 12}시 ${minutes}분 ${seconds}초`;  
  } else if (hours >= 1 && hours < 12) {
    $clock.textContent = `${year}년 ${month}월 ${day}일 ${DAY_OF_WEEK[dayOfWeek]}요일 오전 ${hours}시 ${minutes}분 ${seconds}초`;  
  }
}
setInterval(countClock , 1000);



/**
 * 12 <= hours <= 24 => 오후
 * 1 <= hours < 12 => 오전 
 * 
 */