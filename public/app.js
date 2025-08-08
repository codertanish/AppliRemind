let programs = {};
let scriptURL = "";
fetch('../programs.json')
  .then(response => response.json())
  .then(data => {
    programs = data;
  });

async function submit(formData) {
  try {
    const response = await fetch('/submit-program', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    console.log('Submission successful:', result);
  } catch (err) {
    console.error('Submission failed:', err);
  }
}
document.getElementById("notifyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  const delay = document.getElementById("delaySelect").value;

  if (!email) return;

  await submit({
    email,
    programID: currProgram,
    delay,
    deadline: programs[currProgram].applicationDeadline,
    url: programs[currProgram].url
  });

  closeModal();
  alert("✅ You’ll be notified!");

});