export const script = () => {
  const htmlTag = document.documentElement;

  const item = localStorage.getItem('theme');
  const theme = item !== null ? JSON.parse(item) : 'system';

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  if (theme === 'system') {
    htmlTag.dataset.theme = systemTheme;
    htmlTag.classList.add(systemTheme);
  } else {
    htmlTag.dataset.theme = theme;
    htmlTag.classList.add(theme);
  }
};
