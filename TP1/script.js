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
function updateMessagesFromServer() {
    fetch('http://localhost:8080/msg/getAll')
        .then(response => response.json())
        .then(data => {
            const messageList = document.getElementById("messageList");
            messageList.innerHTML = "";
            data.forEach(msg => {
                const li = document.createElement("li");
                li.textContent = msg;
                messageList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des messages :", error);
        });
}

document.getElementById("updateButton").addEventListener("click", () => {
    updateMessagesFromServer();
});

document.getElementById("sendButton").addEventListener("click", () => {
    const pseudo = document.getElementById("pseudoInput").value.trim();
    const messageText = document.getElementById("messageInput").value.trim();
    if (messageText !== "") {
        const encodedMessage = encodeURIComponent(messageText);
        fetch(`http://localhost:8080/msg/post/${encodedMessage}`)
            .then(response => response.json())
            .then(data => {
                console.log("Message posté, nouvel index:", data.newIndex);
                updateMessagesFromServer();
            })
            .catch(error => {
                console.error("Erreur lors du post du message :", error);
            });
        document.getElementById("messageInput").value = "";
        document.getElementById("pseudoInput").value = "";
    }
});

document.getElementById("toggleStyle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

updateMessagesFromServer();

fetch('http://localhost:8080/msg/getAll')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            alert(data[0]);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des messages :', error);
    });
