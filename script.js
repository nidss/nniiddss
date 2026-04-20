document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleMenu() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        }
    }

    if (mobileMenuBtn && sidebarOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        sidebarOverlay.addEventListener('click', toggleMenu);
    }
});