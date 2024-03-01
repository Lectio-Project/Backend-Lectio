import * as diacritics from 'diacritics';

const slug = (text: string) => {
  const textSplit = text.split('.');
  const ext = textSplit.pop();
  const date = new Date();
  const formatRegex = diacritics
    .remove(textSplit.join(''))
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/\d/g, '');

  return `${formatRegex}${+date}.${ext}`;
};

export default slug;
