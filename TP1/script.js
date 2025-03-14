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
