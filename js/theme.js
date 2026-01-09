// ============================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ============================================

(function () {
    const THEME_KEY = 'portfolio-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get initial theme
    function getInitialTheme() {
        // Check localStorage
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) return savedTheme;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK;
        }

        return LIGHT;
    }

    // Apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateToggleIcon(theme);
    }

    // Update toggle button icon
    function updateToggleIcon(theme) {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>`;

        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>`;

        toggle.innerHTML = theme === DARK ? sunIcon : moonIcon;
        toggle.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === DARK ? LIGHT : DARK;

        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');

        applyTheme(newTheme);

        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    // Initialize
    function init() {
        // Apply initial theme immediately (before DOM ready to prevent flash)
        const initialTheme = getInitialTheme();
        document.documentElement.setAttribute('data-theme', initialTheme);

        // Wait for DOM to add event listener
        document.addEventListener('DOMContentLoaded', () => {
            updateToggleIcon(initialTheme);

            const toggle = document.querySelector('.theme-toggle');
            if (toggle) {
                toggle.addEventListener('click', toggleTheme);
            }

            // Listen for system theme changes
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    if (!localStorage.getItem(THEME_KEY)) {
                        applyTheme(e.matches ? DARK : LIGHT);
                    }
                });
            }
        });
    }

    init();
})();
