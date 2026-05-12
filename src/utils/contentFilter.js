/**
 * Normaliza texto para comparación (minúsculas, sin acentos).
 */
function normalizeForMatch(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Lista representativa de términos inapropiados (español / variantes comunes).
 * Amplía o sustituye según políticas del producto.
 */
const BLOCKED_TOKENS = new Set([
  'idiota',
  'imbecil',
  'estupido',
  'estupida',
  'tonto',
  'tonta',
  'maldito',
  'maldita',
  'puta',
  'puto',
  'cabron',
  'joder',
  'mierda',
  'gilipollas',
  'pendejo',
  'pendeja',
  'maricon',
  'hdp',
  'mamada',
  'culero',
  'culera',
  'bastardo',
  'zorra',
  'asshole',
  'shit',
  'fuck',
  'bitch',
]);

/**
 * Extrae tokens alfanuméricos del texto normalizado.
 */
function extractTokens(text) {
  const normalized = normalizeForMatch(text);
  return normalized.split(/[^a-z0-9]+/i).filter(Boolean);
}

/**
 * Comprueba si algún token coincide con la lista bloqueada.
 */
export function containsInappropriateContent(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }
  const tokens = extractTokens(text);
  return tokens.some((token) => BLOCKED_TOKENS.has(token));
}

/**
 * Valida título, materia y descripción; devuelve mensaje de error o null si es válido.
 */
export function validateTaskContent({ title, subject, description }) {
  const fields = [
    { label: 'título', value: title },
    { label: 'materia', value: subject },
    { label: 'descripción', value: description },
  ];

  for (const { label, value } of fields) {
    if (containsInappropriateContent(value)) {
      return `Se detectó lenguaje inapropiado en el ${label}. Revisa el texto e inténtalo de nuevo.`;
    }
  }

  return null;
}
