const fleet = [
  {name:'New Avanza 1.5 G CVT',type:'MPV',spec:'MPV • Automatic • 7 Penumpang',img:'assets/avanza.webp',tags:['mpv'],message:'New Avanza 1.5 G CVT'},
  {name:'New Veloz Hybrid EV',type:'HYBRID MPV',spec:'MPV • Automatic • 7 Penumpang',img:'assets/veloz.webp',tags:['mpv','hybrid'],message:'New Veloz Hybrid EV'},
  {name:'All New Innova Zenix Hybrid EV',type:'HYBRID MPV',spec:'MPV • Automatic • 7 Penumpang',img:'assets/zenix.webp',tags:['mpv','hybrid'],message:'All New Innova Zenix Hybrid EV'},
  {name:'Hiace Commuter',type:'COMMUTER',spec:'MPV • Manual • 8–15 Penumpang',img:'assets/hiace.webp',tags:['commuter'],message:'Hiace Commuter'}
];

let filtered = [...fleet];
let current = 0;
const $ = id => document.getElementById(id);
const wa = name => `https://wa.me/6281383552217?text=${encodeURIComponent(`Halo GSO Rental, saya ingin menanyakan ${name}.`)}`;

function renderShowcase() {
  if (!filtered.length) return;
  current = ((current % filtered.length) + filtered.length) % filtered.length;
  const main = filtered[current];
  const prev = filtered[(current - 1 + filtered.length) % filtered.length];
  const next = filtered[(current + 1) % filtered.length];

  $('main-car-img').src = main.img;
  $('main-car-img').alt = main.name;
  $('main-car-type').textContent = main.type;
  $('main-car-name').textContent = main.name;
  $('main-car-spec').textContent = main.spec;
  $('main-car-cta').href = wa(main.message);
  $('prev-car-img').src = prev.img;
  $('prev-car-name').textContent = prev.name;
  $('next-car-img').src = next.img;
  $('next-car-name').textContent = next.name;
  $('catalog-index').textContent = String(current + 1).padStart(2, '0');
  document.querySelector('.catalog-progress > span').textContent = `/ ${String(filtered.length).padStart(2, '0')}`;

  $('catalog-dots').innerHTML = filtered.map((car, i) =>
    `<button class="catalog-dot ${i === current ? 'active' : ''}" type="button" aria-label="Lihat ${car.name}" ${i === current ? 'aria-current="true"' : ''} data-index="${i}"></button>`
  ).join('');

  document.querySelectorAll('.catalog-dot').forEach(btn => btn.addEventListener('click', () => {
    current = Number(btn.dataset.index);
    renderShowcase();
  }));
}

function filterStaticGrid(filter) {
  let visibleCount = 0;
  document.querySelectorAll('.catalog-card').forEach(card => {
    const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
    const visible = filter === 'all' || tags.includes(filter);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  $('catalog-empty').hidden = visibleCount !== 0;
}

function setFilter(button) {
  document.querySelectorAll('.catalog-tab').forEach(tab => {
    const active = tab === button;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });

  const filter = button.dataset.filter;
  filtered = filter === 'all' ? [...fleet] : fleet.filter(car => car.tags.includes(filter));
  current = 0;
  filterStaticGrid(filter);
  renderShowcase();
}

document.querySelectorAll('.catalog-tab').forEach(btn => btn.addEventListener('click', () => setFilter(btn)));
document.querySelector('.showcase-arrow.prev')?.addEventListener('click', () => { current -= 1; renderShowcase(); });
document.querySelector('.showcase-arrow.next')?.addEventListener('click', () => { current += 1; renderShowcase(); });

document.getElementById('fleet-showcase')?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    current -= 1;
    renderShowcase();
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    current += 1;
    renderShowcase();
  }
});

renderShowcase();
filterStaticGrid('all');
