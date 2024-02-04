const socket = io();
let localStream;
let remoteStream;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const userList = document.getElementById('userList');
let userId;

function startCall() {
  userId = document.getElementById('userId').value;
  if (!userId) {
    alert('Please enter a user ID.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      localStream = stream;
      localVideo.srcObject = stream;

      socket.emit('join', userId);

      socket.on('user-connected', (connectedUserId) => {
        addUserToList(connectedUserId);
        initiatePeerConnection(connectedUserId);
      });

      socket.on('user-disconnected', (disconnectedUserId) => {
        removeUserFromList(disconnectedUserId);
      });
    })
    .catch((error) => {
      console.error('Error accessing media devices:', error);
    });
}

function initiatePeerConnection(targetUserId) {
  const peer = new SimplePeer({
    initiator: true,
    stream: localStream,
  });

  peer.on('signal', (data) => {
    socket.emit('offer', {
      target: targetUserId,
      caller: userId,
      offer: data,
    });
  });

  peer.on('stream', (stream) => {
    remoteVideo.srcObject = stream;
  });

  socket.on('answer', (data) => {
    if (data.caller === userId && data.target === targetUserId) {
      peer.signal(data.answer);
    }
  });

  socket.on('ice-candidate', (data) => {
    if (data.target === userId) {
      peer.signal({ candidate: data.candidate });
    }
  });
}

function endCall() {
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
  socket.disconnect();
}

function addUserToList(connectedUserId) {
  const listItem = document.createElement('li');
  listItem.textContent = connectedUserId;
  userList.appendChild(listItem);
}

function removeUserFromList(disconnectedUserId) {
  const listItem = userList.querySelector(`li:contains(${disconnectedUserId})`);
  if (listItem) {
    listItem.remove();
  }
}
