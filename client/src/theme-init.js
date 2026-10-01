(function initializeTheme() {
  const storedTheme = localStorage.getItem('theme');
  const preferredTheme = storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', preferredTheme);
  document.documentElement.style.colorScheme = preferredTheme;
})();
