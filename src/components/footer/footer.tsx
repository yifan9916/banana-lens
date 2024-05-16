import { LocaleSwitcher } from '../locale-switcher';
import { ThemeSwitcher } from '../theme-switcher';

export const Footer = () => {
  return (
    <footer className="flex justify-end items-end gap-2 p-12 pt-20">
      <ThemeSwitcher />
      <LocaleSwitcher />
    </footer>
  );
};
