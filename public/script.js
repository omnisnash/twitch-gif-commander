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
socket.onerror = function(error) {
    console.error(error);
};

// Lorsque la connexion est établie.
socket.onopen = function(event) {
    console.log("Connexion établie.");

    // Lorsque la connexion se termine.
    this.onclose = function(event) {
        console.log("Connexion terminé.");
    };

    // Lorsque le serveur envoi un message.
    this.onmessage = function(event) {
        console.log("Message:", event.data);

        const imageElement = document.getElementById("current-gif");
        imageElement.setAttribute("src", "./gif/" + event.data + ".gif")
    };

    // Envoi d'un message vers le serveur.
    this.send("Hello world!");
};
