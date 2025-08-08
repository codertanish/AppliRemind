let programs = {};
let scriptURL = "";
fetch('../programs.json')
  .then(response => response.json())
  .then(data => {
    programs = data;
  });
fetch('/config')
  .then(res => res.json())
  .then(data => {
    scriptURL = data.scriptURL;
  });


document.getElementById("notifyForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("emailInput").value.trim();
      const delay = document.getElementById("delaySelect").value;

      if (!email) return;

      await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({
          email,
          programID: currProgram,
          delay,
          deadline: programs[currProgram].applicationDeadline,
          url: programs[currProgram].url
        })
      });

      closeModal();
      alert("✅ You’ll be notified!");
    });