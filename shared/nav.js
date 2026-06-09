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

  // Hide home button on index page
  if (page === 'index.html' || page === '') {
    document.getElementById('btn-home')?.classList.add('hidden');
  }
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

  // Sidebar toggle (desktop)
  const toggleBtn = document.getElementById('btn-nav-toggle');
  const pageBody  = document.querySelector('.page-body');

  function applyNavState(collapsed) {
    if (collapsed) {
      pageBody?.classList.add('nav-collapsed');
      if (toggleBtn) toggleBtn.textContent = '›';
    } else {
      pageBody?.classList.remove('nav-collapsed');
      if (toggleBtn) toggleBtn.textContent = '‹';
    }
  }

  // Restore saved state
  applyNavState(localStorage.getItem('navCollapsed') === '1');

  toggleBtn?.addEventListener('click', () => {
    const collapsed = !pageBody?.classList.contains('nav-collapsed');
    localStorage.setItem('navCollapsed', collapsed ? '1' : '0');
    applyNavState(collapsed);
  });
})();
