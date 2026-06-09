(async function () {
  async function load(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      el.innerHTML = await res.text();
    } catch (e) {}
  }

  await Promise.all([
    load('header-placeholder', 'shared/header.html'),
    load('nav-placeholder',    'shared/nav.html'),
    load('footer-placeholder', 'shared/footer.html'),
  ]);

  // Highlight active link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // Hamburger toggle
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');
  btn?.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav?.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      btn?.classList.remove('open');
      nav?.classList.remove('open');
    });
  });
})();
