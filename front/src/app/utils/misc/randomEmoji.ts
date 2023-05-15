import React from 'react';
const animalEmojis = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🐸',
  '🐵',
  '🐔',
  '🐧',
  '🐦',
  '🐤',
  '🐣',
  '🐥',
  '🦆',
  '🦅',
  '🦉',
  '🦇',
  '🐺',
  '🐗',
  '🐴',
  '🦄',
  '🐝',
  '🐛',
  '🦋',
  '🐌',
  '🐚',
  '🐞',
  '🐜',
  '🕷',
  '🦂',
  '🦀',
  '🦑',
  '🐙',
  '🦐',
  '🦞',
];

const convertEmojiToUnicode = (emoji: string) => {
  const comp = emoji.codePointAt(0)?.toString(16);
  if (!comp) return '';
  return `&#x${comp}`;
};

export const randomAnimalEmoji = () => {
  console.log('randomAnimalEmoji');

  const randomIndex = Math.floor(Math.random() * animalEmojis.length);

  return convertEmojiToUnicode(animalEmojis[randomIndex]);
};

export const getEmojiFromUnicode = (unicode: string) => {
  if (!unicode) return '';

  const comp = unicode.replace(/&#x/g, '').replace(/;/g, '');

  if (!comp) return '';

  return String.fromCodePoint(Number(`0x${comp}`));
};
