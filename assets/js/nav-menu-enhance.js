let toggle = document.getElementById('nav-toggle');
toggle.setAttribute('aria-expanded', 'false');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        toggle.setAttribute('aria-expanded', 'true');
    } else {
        toggle.setAttribute('aria-expanded', 'false');
    }
});

toggle.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        toggle.checked = !toggle.checked;
        toggle.dispatchEvent(new Event('change'));
    }
});