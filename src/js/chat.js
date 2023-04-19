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
  //create element variable
  const li = document.createElement('li');
  const profile = document.createElement('profile');
  const user = document.createElement('span');
  const img = document.createElement('img');
  const message = document.createElement('span');
  const time = document.createElement('span');

  //메세지 시간
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursText = hours > 12 ? `오후 ${hours - 12}` : `오전 ${hours}`;
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  const dateText = `${hoursText}:${minutesText}`;

  //list
  li.classList.add('send');
  chatList.appendChild(li);

  //profile
  profile.classList.add('profile');
  li.appendChild(profile);

  // user Name
  user.innerText = data.name;
  user.classList.add('user');
  profile.appendChild(user);

  // profile image
  img.setAttribute('src', 'http://placeimg.com/50/50/any');
  img.setAttribute('alt', 'any');
  profile.appendChild(img);

  // message
  message.classList.add('message');
  message.innerText = data.msg;
  li.appendChild(message);

  // messasge time
  time.classList.add('time');
  time.innerText = dateText;
  li.appendChild(time);

  // 대화창 초기화
  chatInput.value = '';
});
