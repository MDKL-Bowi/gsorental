const fleet = [
  {name:'New Avanza 1.5 G CVT',type:'MPV',spec:'MPV • Automatic • 7 Penumpang',img:'assets/avanza.webp',tags:['mpv'],message:'New Avanza 1.5 G CVT'},
  {name:'New Veloz Hybrid EV',type:'HYBRID MPV',spec:'MPV • Automatic • 7 Penumpang',img:'assets/veloz.webp',tags:['mpv','hybrid'],message:'New Veloz Hybrid EV'},
  {name:'All New Innova Zenix Hybrid EV',type:'HYBRID MPV',spec:'MPV • Automatic • 7 Penumpang',img:'assets/zenix.webp',tags:['mpv','hybrid'],message:'All New Innova Zenix Hybrid EV'},
  {name:'Hiace Commuter',type:'COMMUTER',spec:'MPV • Manual • 8–15 Penumpang',img:'assets/hiace.webp',tags:['mpv','commuter'],message:'Hiace Commuter'}
];
let filtered = [...fleet], current = 0;
const $ = id => document.getElementById(id);
const wa = name => `https://wa.me/6281383552217?text=${encodeURIComponent(`Halo GSO Rental, saya ingin menanyakan ${name}.`)}`;

function renderShowcase(){
  if (!filtered.length) return;
  current = ((current % filtered.length) + filtered.length) % filtered.length;
  const main = filtered[current];
  const prev = filtered[(current - 1 + filtered.length) % filtered.length];
  const next = filtered[(current + 1) % filtered.length];
  $('main-car-img').src = main.img; $('main-car-img').alt = main.name;
  $('main-car-type').textContent = main.type; $('main-car-name').textContent = main.name; $('main-car-spec').textContent = main.spec; $('main-car-cta').href = wa(main.message);
  $('prev-car-img').src = prev.img; $('prev-car-name').textContent = prev.name;
  $('next-car-img').src = next.img; $('next-car-name').textContent = next.name;
  $('catalog-index').textContent = String(current + 1).padStart(2,'0');
  document.querySelector('.catalog-progress span').textContent = `/ ${String(filtered.length).padStart(2,'0')}`;
  $('catalog-dots').innerHTML = filtered.map((_,i)=>`<button class="catalog-dot ${i===current?'active':''}" aria-label="Lihat armada ${i+1}" data-index="${i}"></button>`).join('');
  document.querySelectorAll('.catalog-dot').forEach(btn=>btn.addEventListener('click',()=>{current=Number(btn.dataset.index);renderShowcase();}));
}

function renderGrid(){
  $('catalog-grid').innerHTML = filtered.map(car=>`<article class="catalog-card reveal visible"><div class="catalog-card-img"><img src="${car.img}" alt="${car.name}" loading="lazy"></div><div><span>${car.type}</span><h3>${car.name}</h3><p>${car.spec}</p><a class="mini-cta" href="${wa(car.message)}" target="_blank" rel="noopener">Tanya Ketersediaan</a></div></article>`).join('');
}

document.querySelectorAll('.catalog-tab').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.catalog-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const filter = btn.dataset.filter; filtered = filter==='all' ? [...fleet] : fleet.filter(car=>car.tags.includes(filter)); current=0; renderShowcase(); renderGrid();
}));
document.querySelector('.showcase-arrow.prev').addEventListener('click',()=>{current--;renderShowcase();});
document.querySelector('.showcase-arrow.next').addEventListener('click',()=>{current++;renderShowcase();});
renderShowcase(); renderGrid();
