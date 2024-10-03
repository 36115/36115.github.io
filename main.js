(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')
    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return 'auto'
    }
    const setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', 'light')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }
    setTheme(getPreferredTheme())
    const showActiveTheme = theme => {
        const activeThemeIcon = document.querySelector('.theme-icon-active')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('i').getAttribute('class')
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        })

        btnToActive.classList.add('active')
        const themeSwitcher = document.querySelector('#bd-theme')
        if (themeSwitcher) {
            const activeThemeIcon = themeSwitcher.querySelector('i')
            const btnIcon = btnToActive.querySelector('i').getAttribute('class')
            const themeSwitcherLabel = `${btnToActive.textContent} (${theme})`
            activeThemeIcon.setAttribute('class', btnIcon)
        }
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })
    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())
        document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
            toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            localStorage.setItem('theme', theme)
            setTheme(theme)
            showActiveTheme(theme)
            })
        })
    })
})()