// Add current year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form handler (uses fetch to submit to Formspree)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    const url = this.action;
    const formData = new FormData(this);

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        // Successful submission
        alert('Message sent — thank you!');
        this.reset();

        // Redirect to _next (if provided) or back to home
        const next = this.querySelector('input[name="_next"]');
        if (next && next.value) {
          window.location.href = next.value;
        }
      } else {
        const data = await res.json().catch(() => null);
        const errMsg = (data && data.error) ? data.error : res.statusText;
        alert('Submission error: ' + errMsg);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  });
}