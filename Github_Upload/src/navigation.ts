import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Главная',
      href: getPermalink('/'),
    },
    {
      text: 'Лента',
      href: getPermalink('/feed'),
    },
    {
      text: 'Блог',
      links: [
        {
          text: 'Все посты',
          href: getBlogPermalink(),
        },
        {
          text: 'Категории',
          href: getPermalink('tutorials', 'category'),
        },
      ],
    },
    {
      text: 'О нас',
      href: getPermalink('/about'),
    },
    {
      text: 'Контакты',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Войти', href: getPermalink('/auth'), icon: 'tabler:login' }],
};

export const footerData = {
  links: [
    {
      title: 'Платформа',
      links: [
        { text: 'Главная', href: getPermalink('/') },
        { text: 'Лента', href: getPermalink('/feed') },
        { text: 'Блог', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Аккаунт',
      links: [
        { text: 'Профиль', href: getPermalink('/profile') },
        { text: 'Мои записи', href: getPermalink('/profile') },
        { text: 'Настройки', href: getPermalink('/profile') },
      ],
    },
    {
      title: 'Информация',
      links: [
        { text: 'О нас', href: getPermalink('/about') },
        { text: 'Контакты', href: getPermalink('/contact') },
        { text: 'Условия', href: getPermalink('/terms') },
        { text: 'Конфиденциальность', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Условия', href: getPermalink('/terms') },
    { text: 'Политика конфиденциальности', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Telegram', icon: 'tabler:brand-telegram', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'VK', icon: 'tabler:brand-vk', href: '#' },
  ],
  footNote: `
    © 2026 Amantle. Все права защищены.
  `,
};
