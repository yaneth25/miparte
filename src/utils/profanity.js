const BLOCKED_WORDS = [
  'puto',
  'puta',
  'mierda',
  'pendejo',
  'pendeja',
  'cabron',
  'cabrón',
  'culero',
  'verga',
  'chinga',
  'chingar',
  'pinche',
  'idiota',
  'estupido',
  'estúpido',
  'imbecil',
  'imbécil',
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'damn',
];

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function containsProfanity(text) {
  const normalized = normalize(text);
  return BLOCKED_WORDS.some((word) => {
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    return pattern.test(normalized) || normalized.includes(word);
  });
}

export function validateCleanText(text, fieldLabel) {
  if (!text.trim()) {
    return `${fieldLabel} es obligatorio.`;
  }
  if (text.length > 50) {
    return `${fieldLabel} no puede superar 50 caracteres.`;
  }
  if (containsProfanity(text)) {
    return `${fieldLabel} contiene palabras no permitidas.`;
  }
  return null;
}
