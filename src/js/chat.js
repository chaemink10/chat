'use strict';

const socket = io();

const sendButton = document.querySelector('.send-button');
const nickName = document.querySelector('#nickname');
const chatInput = document.querySelector('.chatting-input');
const chatList = document.querySelector('.chatting-list');

let nick_name = '';

//전송 버튼 이벤트
sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const param = {
    name: nickName.value,
    msg: chatInput.value,
  };
  socket.emit('chatting', param);
});

socket.on('chatting', (data) => {
  const list = new LiModel(data, new Date());
  list.makeLi();

  //대화창 초기화
  chatInput.value = '';
});

function LiModel({ name, msg }, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  const hours = this.time.getHours();
  const minutes = this.time.getMinutes();
  const hoursText = hours > 12 ? `오후 ${hours - 12}` : `오전 ${hours}`;
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  const dateText = `${hoursText}:${minutesText}`;

  this.makeLi = () => {
    const li = document.createElement('li');

    console.log(this.name, nickName.value);

    li.classList.add(this.name == nickName.value ? 'sent' : 'received');

    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img src="http://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${dateText}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}
