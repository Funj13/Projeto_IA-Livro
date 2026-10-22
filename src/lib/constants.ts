export const WORDS_PER_PAGE_ESTIMATE = 350;
export const TOKENS_PER_PAGE_ESTIMATE = 500;
export const FREE_MODEL_MAX_PAGES = 1800; // Baseado no Gemini Flash Free Tier (~1M tokens)

export const MAX_PAGES_PER_STUDY = 30;
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const ACCEPTED_FORMATS_TEXT = "JPG, JPEG, PNG, WEBP, HEIC";

export const STUDY_MESSAGES = {
  INVALID_IMAGE: "Este arquivo não é uma imagem válida.",
  FILE_TOO_LARGE: "Cada imagem deve ter no máximo 15 MB.",
  MAX_PAGES_EXCEEDED: "Você pode adicionar até 30 páginas por estudo.",
  DUPLICATE_FILE: "Esta página já foi adicionada.",
  PAGES_READY: "Suas páginas estão prontas para serem processadas.",
} as const;
