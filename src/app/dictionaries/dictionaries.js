"use client";

const dictionaries = {
  en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@/app/dictionaries/ar.json').then((module) => module.default),
};

// Updated function to ensure the fallback works as expected
export const getDictionary = async (locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  return dictionaries['en']();  // Fallback to English if locale not found
};
