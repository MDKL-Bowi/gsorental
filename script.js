document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Placeholder social links should not jump the page while the final URLs are unavailable.
document.querySelectorAll('.social-links a[href="#"]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
