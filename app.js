import { business } from './site.config.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const phoneDigits = (value) => value.replace(/\D/g, '');
const validNumber = (value) => /^\+[1-9]\d{9,14}$/.test(value);
const formatPhone = (value) => /^\+90\d{10}$/.test(value)
  ? `0 (${value.slice(3, 6)}) ${value.slice(6, 9)} ${value.slice(9, 11)} ${value.slice(11)}`
  : value;
const hasPhone = validNumber(business.phone);
const hasWhatsApp = validNumber(business.whatsapp);

$$('[data-business-name]').forEach(element => { element.textContent = business.name; });
$$('[data-business-tagline]').forEach(element => { element.textContent = business.tagline; });
document.title = `${business.name} — Evinize iyi gelecek bir dokunuş.`;
$('.header .brand').setAttribute('aria-label', `${business.name} ana sayfa`);
$('#year').textContent = new Date().getFullYear();
if (business.serviceArea) $$('[data-service-area]').forEach(element => { element.textContent = business.serviceArea; });
if (hasPhone) {
  $$('[data-phone-label]').forEach(element => { element.textContent = formatPhone(business.phone); });
  $$('[data-phone-link]').forEach(element => {
    element.href = `tel:${business.phone}`;
    element.setAttribute('aria-label', `${business.name} işletmesini arayın: ${formatPhone(business.phone)}`);
  });
}
if (hasPhone && hasWhatsApp) $$('[data-contact-pending]').forEach(element => { element.hidden = true; });
else if (hasPhone) $$('[data-contact-pending]').forEach(element => { element.textContent = 'WhatsApp bilgisi yakında eklenecek. Telefonla bize ulaşabilirsiniz.'; });
else if (hasWhatsApp) $$('[data-contact-pending]').forEach(element => { element.textContent = 'Bize WhatsApp üzerinden ulaşabilirsiniz. Telefon bilgisi yakında eklenecek.'; });

function whatsappUrl(message) {
  return `https://wa.me/${phoneDigits(business.whatsapp)}?text=${encodeURIComponent(message)}`;
}
if (hasWhatsApp) $$('[data-whatsapp-link]').forEach(element => {
  element.href = whatsappUrl('Merhaba, tadilat ve usta desteği hizmetleriniz hakkında bilgi almak istiyorum.');
  element.target = '_blank';
  element.rel = 'noopener noreferrer';
});

const menuButton = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menüyü aç');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

const projects = [
  { title: 'Ferah yaşam alanları', category: 'interior', tag: 'İç mekân', subtitle: 'Boya · Parke · Aydınlatma', image: 'photo-1600210492486-724fe5c67fb0', alt: 'Ahşap detaylı, açık renk mobilyalı aydınlık salon', service: 'Ev tadilatı', description: 'Açık tonlar, doğal ahşap dokular ve doğru aydınlatmayla evinizde ferah bir bütünlük yakalayın. Boya, zemin ve elektrik işlerini alanınızın ihtiyacına göre birlikte planlayabiliriz.' },
  { title: 'Sade ve işlevsel banyolar', category: 'bathroom', tag: 'Banyo', subtitle: 'Fayans · Sıhhi tesisat · Vitrifiye', image: 'photo-1620626011761-996317b8d101', alt: 'Modern lavabo ve ayna detaylarıyla yenilenmiş banyo', service: 'Fayans ve parke', description: 'Kolay temizlenen yüzeyler ve kullanışlı detaylarla banyonuzu yenileyin. Fayans döşeme, tesisat yenileme ve vitrifiye montajını bir arada değerlendirebiliriz.' },
  { title: 'Evin kalbine yeni bir görünüm', category: 'interior', tag: 'Mutfak', subtitle: 'Zemin · Tesisat · Boya', image: 'photo-1556912172-45b7abe8b7e1', alt: 'Açık renk dolaplar ve geniş tezgâhla düzenlenmiş mutfak', service: 'Ev tadilatı', description: 'Günlük hayatın merkezindeki mutfağınız için uyumlu zeminler, yenilenmiş yüzeyler ve ihtiyaçlarınıza uygun tesisat çözümleri. Yapılacak işleri mevcut alanınıza göre belirleyelim.' },
  { title: 'Doğaya açılan bir yaşam', category: 'exterior', tag: 'Dış mekân', subtitle: 'Ev kurulumu · Dış cephe · Çatı', image: 'photo-1449158743715-0a90ebb6d2d8', alt: 'Yeşil bir bahçe içinde modern ev dış cephesi', service: 'Prefabrik ev kurulumu', description: 'Size ait yeni bir yaşam alanına ilham veren dış mekânlar. Prefabrik ev kurulumu, tamamlayıcı tesisat ve boya işleri için projenizin kapsamını birlikte konuşabiliriz. Fotoğraftaki yapı yalnızca mimari ilham amacıyla gösterilmektedir.' },
];
const remoteImage = (id, width) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
const dialog = $('#project-dialog');
let lastProjectButton;
let selectedProject;

function renderProjects(filter = 'all') {
  const visible = projects.filter(project => filter === 'all' || project.category === filter);
  $('#project-grid').replaceChildren(...visible.map(project => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'project-card';
    card.setAttribute('aria-label', `${project.title} — uygulama fikrini incele`);
    card.innerHTML = `<div class="project-image"><img src="${remoteImage(project.image, 850)}" alt="${project.alt}" width="850" height="600" loading="lazy"><span class="project-tag">${project.tag}</span></div><div class="project-info"><div><h3>${project.title}</h3><p>${project.subtitle}</p></div><svg class="icon" aria-hidden="true"><use href="#i-up"/></svg></div>`;
    card.addEventListener('click', () => {
      selectedProject = project;
      lastProjectButton = card;
      $('#dialog-title').textContent = project.title;
      $('#dialog-description').textContent = project.description;
      $('#dialog-image').src = remoteImage(project.image, 1200);
      $('#dialog-image').alt = `${project.alt}; temsili uygulama`;
      dialog.showModal();
    });
    return card;
  }));
  $('.filter-status').textContent = `${visible.length} uygulama fikri gösteriliyor.`;
}
renderProjects();
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  renderProjects(button.dataset.filter);
}));
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => lastProjectButton?.focus({ preventScroll: true }));
$('#dialog-contact').addEventListener('click', () => {
  $('#service').value = selectedProject.service;
  dialog.close();
  requestAnimationFrame(() => $('#service').focus({ preventScroll: true }));
});
$$('[data-service]').forEach(link => link.addEventListener('click', () => {
  $('#service').value = link.dataset.service;
  $('#form-status').textContent = '';
}));
$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!hasWhatsApp) {
    $('#form-status').textContent = hasPhone
      ? 'WhatsApp henüz eklenmedi. Yukarıdaki telefon numarasından bize ulaşabilirsiniz.'
      : 'İletişim numarası henüz eklenmedi. WhatsApp bağlantısı numara eklendikten sonra kullanılabilir.';
    return;
  }
  const service = $('#service').value;
  const message = $('#message').value.trim();
  const text = `Merhaba, ${service.toLocaleLowerCase('tr-TR')} için bilgi almak istiyorum.${message ? `\n\n${message}` : ''}`;
  window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  $('#form-status').textContent = 'WhatsApp açılıyor. Mesajınızı oradan kontrol edip gönderebilirsiniz.';
});
