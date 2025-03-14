// ===========================
// Ancien code TP1 (local)

/*
// Variable globale contenant les messages initiaux
let msgs = [
    { "msg": "Hello World", "pseudo": "Alice", "date": "2025-03-14 10:00:00" },
    { "msg": "Blah Blah", "pseudo": "Bob", "date": "2025-03-14 10:01:00" },
    { "msg": "I love cats", "pseudo": "Charlie", "date": "2025-03-14 10:02:00" }
];

// Fonction qui réaffiche la liste des messages sur la page
function update(messages) {
    const messageList = document.getElementById("messageList");
    messageList.innerHTML = "";
    messages.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.pseudo} [${item.date}] : ${item.msg}`;
        messageList.appendChild(li);
    });
}

document.getElementById("updateButton").addEventListener("click", () => {
    update(msgs);
});

document.getElementById("sendButton").addEventListener("click", () => {
    const pseudo = document.getElementById("pseudoInput").value.trim();
    const messageText = document.getElementById("messageInput").value.trim();
    if (messageText !== "") {
        const newMessage = {
            "msg": messageText,
            "pseudo": pseudo || "Anonyme",
            "date": new Date().toLocaleString()
        };
        msgs.push(newMessage);
        update(msgs);
        document.getElementById("messageInput").value = "";
        document.getElementById("pseudoInput").value = "";
    }
});

document.getElementById("toggleStyle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
*/

// ===========================
// Nouveau code pour connecter TP1 (l'interface) au micro-service TP2

/**
 * TP2 partie 3
 */
const SERVER_URL = "https://archiapp-tp2.onrender.com";

// Met à jour l'affichage des messages depuis TP2
function updateMessagesFromServer() {
    fetch(`${SERVER_URL}/msg/getAll`)
        .then(response => response.json())
        .then(messages => {
            const messageList = document.getElementById("messageList");
            messageList.innerHTML = ""; // Effacer les anciens messages

            messages.forEach(({ pseudo, date, msg }) => {
                const li = document.createElement("li");
                li.textContent = `${pseudo} [${date}] : ${msg}`;
                messageList.appendChild(li);
            });
        })
        .catch(error => console.error("⚠️ Erreur récupération messages :", error));
}

// Envoie un message à TP2 et met à jour l'affichage
document.getElementById("sendButton").addEventListener("click", () => {
    const pseudo = encodeURIComponent(document.getElementById("pseudoInput").value.trim() || "Anonyme");
    const messageText = encodeURIComponent(document.getElementById("messageInput").value.trim());

    if (messageText !== "") {
        fetch(`${SERVER_URL}/msg/post/${messageText}?pseudo=${pseudo}`)
            .then(() => updateMessagesFromServer()) // Rafraîchir la liste
            .catch(error => console.error("⚠️ Erreur lors de l'envoi :", error));

        // 🔄 Réinitialiser les champs
        document.getElementById("messageInput").value = "";
        document.getElementById("pseudoInput").value = "";
    }
});

// Rafraîchir les messages avec le bouton "Mise à jour"
document.getElementById("updateButton").addEventListener("click", updateMessagesFromServer);

// Supprimer un message (en demandant son index)
document.getElementById("deleteButton").addEventListener("click", () => {
    const messageIndex = prompt("Entrez l'index du message à supprimer :");
    if (messageIndex !== null) {
        fetch(`${SERVER_URL}/msg/del/${messageIndex}`)
            .then(() => updateMessagesFromServer())
            .catch(error => console.error("⚠️ Erreur lors de la suppression :", error));
    }
});

// Basculer entre le mode clair et sombre
document.getElementById("toggleStyle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Charger les messages au démarrage
updateMessagesFromServer();
