// Simple client-side include for nav.html
async function loadNav() {
  const container = document.getElementById('site-nav');
  if (!container) return;
  try {
    const res = await fetch('nav.html');
    if (res.ok) {
      container.innerHTML = await res.text();
    } else {
      console.warn('Failed to load nav:', res.status);
    }
  } catch (err) {
    console.warn('Error loading nav:', err);
  }
}
document.addEventListener('DOMContentLoaded', loadNav);