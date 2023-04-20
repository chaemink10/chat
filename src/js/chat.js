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
  const list = new LiModel(data);
  list.makeLi();

  //대화창 초기화
  chatInput.value = '';
});

//채팅리스트 DOM
function LiModel({ name, msg, time }) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement('li');

    li.classList.add(this.name == nickName.value ? 'sent' : 'received');

    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img src="http://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}
