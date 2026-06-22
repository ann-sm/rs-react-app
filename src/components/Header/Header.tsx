'use client';

import Link from 'next/link';
import { useTheme } from '../../contexts/theme/useTheme';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useRouter, useSearchParams } from 'next/navigation';
import revalidatePokemonData from '../../actions/revalidateAction';

const Header = () => {
  const t = useTranslations('header');
  const { theme, toggleTheme } = useTheme();

  const router = useRouter();
  
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const detailsId = searchParams?.get('details');

  const handleRefresh = () => {
    revalidatePokemonData(page, detailsId || undefined);
    router.refresh();
  }

  return (
    <header className="bg-teal-700 shadow-lg">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="flex justify-end gap-6">
          <LanguageSwitcher />
          <Link
            href={'/about'}
            className="inline-flex items-center gap-2 text-gray-100 dark:text-teal-950 hover:text-yellow-400 transition-colors duration-200 hover:cursor-pointer group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-info-circle transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </Link>
          <button
            className="inline-flex items-center gap-2 text-gray-100 dark:text-teal-950 hover:text-yellow-400 transition-colors duration-200 hover:cursor-pointer group"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-moon-stars transition-transform duration-200 group-hover:scale-110"
              aria-label="Toggle dark mode"
              viewBox="0 0 16 16"
            >
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278zM4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.3 7.3 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
              <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258a1.16 1.16 0 0 0 .732-.732z" />
            </svg>
            ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sun transition-transform duration-200 group-hover:scale-110"
              aria-label="Toggle light mode"
              viewBox="0 0 16 16"
            >
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>
            )}
          </button>
          <button
            onClick={handleRefresh}
            className="w-28 bg-teal-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-teal-800 transition-colors duration-200 font-mono"
          >
            {t('refresh')}
          </button>
        </div>
        <h1 className="inline-block text-4xl font-logo font-black text-yellow-400 uppercase text-center mb-4 tracking-wider [text-shadow:2px_2px_0_rgb(185_28_28)] transition-all duration-300 hover:scale-102">
          <Link href='/'>PokéSearch</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
