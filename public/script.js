var socket = null;
try {
  // Connexion vers un serveur HTTP
  // prennant en charge le protocole WebSocket ("ws://").
  socket = new WebSocket("ws://localhost:4242");
} catch (exception) {
  console.error(exception);
}

// Récupération des erreurs.
// Si la connexion ne s'établie pas,
// l'erreur sera émise ici.
socket.onerror = function (error) {
  console.error(error);
};



function isVideoPlaying() {
  const videoElement = document.getElementById("current-video");

  return videoElement.currentTime > 0 && !videoElement.paused && !videoElement.ended && videoElement.readyState > 2
}

function loadContent(content) {

  if (isVideoPlaying()) { // Si une vidéo est en cours on change rien 
    return ;
  }

  
  if (content["type"] === "image") {
    loadImage(content);
  } else {
    loadVideo(content);
  }
}

function loadVideo(content) {
  console.log(" 	loadVideo : " + content["file"]);

  const imageElement = document.getElementById("current-img");
  const videoElement = document.getElementById("current-video");
  const videoSrcElement = document.getElementById("current-video-src");

  videoSrcElement.setAttribute("src", "./content/" + content["file"]);
  videoSrcElement.setAttribute("type", content["type"]);
  videoElement.load();
  videoElement.play();
  videoElement.style.display = "inline";
  imageElement.style.display = "none";

  videoElement.addEventListener("ended", rePrintImage, false) // Quand la vidéo s'arrrête on réaffiche l'image
  
  
}

function loadImage(content) {
  console.log(" 	loadImage : " + content["file"]);

  const imageElement = document.getElementById("current-img");
  const videoElement = document.getElementById("current-video");
  const videoSrcElement = document.getElementById("current-video-src");

  imageElement.setAttribute("src", "./content/" + content["file"]);
  videoSrcElement.setAttribute("src", "./content/nothing.not");
  videoElement.pause();
  imageElement.style.display = "inline";
  videoElement.style.display = "none";
}

function rePrintImage() {
  console.log(" 	BACKImage <- ");

  const imageElement = document.getElementById("current-img");
  const videoElement = document.getElementById("current-video");
  const videoSrcElement = document.getElementById("current-video-src");

  videoSrcElement.setAttribute("src", "./content/nothing.not");
  videoElement.pause();
  imageElement.style.display = "inline";
  videoElement.style.display = "none";
}

// Lorsque la connexion est établie.
socket.onopen = function (event) {
  console.log("Connexion établie.");

  // Lorsque la connexion se termine.
  this.onclose = function (event) {
    console.log("Connexion terminé.");
  };

  // Lorsque le serveur envoi un message.
  this.onmessage = function (event) {
    console.log("Message : " + event.data);
    let content = JSON.parse(event.data);
    loadContent(content);
  };

  // Envoi d'un message vers le serveur.
  this.send("Hello world !");
};
