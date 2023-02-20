const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#chatForm").addEventListener("submit", (evt) => {
    evt.preventDefault();

    sendMessage();
  });
});


const sendMessage = async () => {
  let email = document.querySelector("#user");
  let message = document.querySelector("#message");

  let url = `${window.location.href}messages`;
  let body = JSON.stringify({ user: email.value, message: message.value });
  
  window.console.log("url -> " + url);
  window.console.log("body -> " + body);

  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      window.console.log(data);
      if (data.status === "error") {
        alert(data.error);
      }
    });

  message.value = "";
};

let messages = [];

socket.on("messages", async (data) => {
  let table = document.getElementById("dataTable");
  let html = "";

  html += "<tr>";
  html += "<th>User</th>";
  html += "<th>Message</th>";
  html += "</tr>";

  data.forEach((d) => {
    html += "<tr>";
    html += "<td>" + d.user + "</td>";
    html += "<td>" + d.message + "</td>";
    html += "</tr>";
  });

  table.innerHTML = html;
});

