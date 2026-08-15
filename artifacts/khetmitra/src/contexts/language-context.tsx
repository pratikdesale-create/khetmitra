import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Language } from "@/lib/i18n";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNested(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("khetmitra-language") : null;
    return (stored as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("khetmitra-language", language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (path: string): string => {
    const value = getNested(translations[language], path) ?? getNested(translations.en, path);
    return value ?? path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}