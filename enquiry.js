// Optional, browser-local form. No storage, fetches or automatic messages.
(() => {
  const details = document.getElementById('enquiry-details');
  const form = document.getElementById('enquiry-form');
  if (!details || !form) return;
  details.hidden = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(form);
    const text = name => String(values.get(name) || '').trim();
    const message = [
      'Halo GSO Rent, saya ingin cek ketersediaan.',
      `Unit: ${text('unit') || 'mohon rekomendasi'}`,
      `Layanan: ${text('service') || 'mohon rekomendasi'}`,
      `Tanggal & durasi: ${text('dates') || 'belum ditentukan'}`,
      `Lokasi jemput & tujuan: ${text('pickup') || 'belum ditentukan'}`,
      `Jumlah orang & koper: ${text('passengers') || 'belum ditentukan'}`,
      'Mohon penawaran tanpa BBM.'
    ].join('\n');
    // Same-tab navigation avoids pop-up blockers and leaves history for returning.
    window.location.assign(`https://wa.me/6281383552217?text=${encodeURIComponent(message)}`);
  });
})();
