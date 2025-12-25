const openBtn = document.getElementById('bookNow');
const modal = document.getElementById('bookingModal');
const form = document.getElementById('bookingForm');
const firstInput = modal?.querySelector('input[name="name"]');

function openModal() {
  if (!modal) return;
  modal.removeAttribute('hidden');
  // small delay so focusable element exists visually
  requestAnimationFrame(() => firstInput?.focus());
  document.addEventListener('keydown', onKeyDown);
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute('hidden', '');
  openBtn?.focus();
  document.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  if (e.key === 'Escape') closeModal();
}

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target === openBtn) return;
  if (target?.matches('[data-close]')) {
    closeModal();
  }
});

// overlay click close
modal?.addEventListener('click', (e) => {
  if (e.target === modal.querySelector('.modal__overlay')) closeModal();
});

openBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Network error');
    // handle success (toast, close modal, etc.)
    closeModal();
  } catch (err) {
    console.error('Booking submit failed', err);
    alert('Submission failed — please try again.');
  }
});