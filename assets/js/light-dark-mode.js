
// check if dark theme true or false
let dark_theme = window.matchMedia('(prefers-color-scheme: dark)');
// find radio inputs 
let input = {
    light: document.querySelector('#light-mode'),
    dark: document.querySelector('#dark-mode')
}

// change checked radio button depending on current theme 
function checkMatch() {
    if (dark_theme.matches) {
        input.dark.checked = true;
        input.dark.dispatchEvent(new Event('change'));
    } else {
        input.light.checked = true;
        input.light.dispatchEvent(new Event('change'));
    }
}
// alter theme if user changes system theme while on page 
dark_theme.addEventListener('change', checkMatch);

// store current theme each time inputs change 
for (let mode in input) {
    input[mode].addEventListener('change', () => {
        localStorage.setItem('theme', mode);
    });
}

// check if a theme is stored
// if not, use system theme 
let theme = localStorage.getItem('theme');
if (theme === null) {
    checkMatch();
} else {
    input[theme].checked = true;
}