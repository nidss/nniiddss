document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Menu Logic ---
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

    // --- Toast Notification Logic ---
    function createToastContainer() {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    window.showToast = function(message, type = 'success') {
        const container = createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const title = type === 'success' ? 'Success!' : 'Notification';
        
        const icon = type === 'success' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11"></polyline></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

        toast.innerHTML = `
            <div class="toast-icon-box">
                ${icon}
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;
        
        container.appendChild(toast);

        // Close button logic
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.onclick = () => {
            removeToast(toast);
        };
        
        // Auto remove after 5 seconds
        const timeoutId = setTimeout(() => {
            removeToast(toast);
        }, 5000);

        function removeToast(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(100%)';
            el.style.transition = 'all 0.4s cubic-bezier(0.2, 0, 0, 1)';
            setTimeout(() => el.remove(), 400);
            clearTimeout(timeoutId);
        }
    };

    // Check for pending toast in localStorage
    const pendingToast = localStorage.getItem('pendingToast');
    if (pendingToast) {
        const toastData = JSON.parse(pendingToast);
        showToast(toastData.message, toastData.type);
        localStorage.removeItem('pendingToast');
    }

    // --- Add Policy Form Logic ---
    const addPolicyForm = document.querySelector('.add-policy-form');
    const headerSaveBtn = document.getElementById('headerSaveBtn');

    function handlePolicySave(e) {
        if (e) e.preventDefault();
        
        // Save toast info to localStorage
        localStorage.setItem('pendingToast', JSON.stringify({
            message: 'บันทึกข้อมูลลูกค้าสำเร็จ',
            type: 'success'
        }));
        
        // Redirect to policy list
        window.location.href = 'crm_policy_list.html';
    }

    if (addPolicyForm) {
        addPolicyForm.addEventListener('submit', handlePolicySave);
    }

    if (headerSaveBtn) {
        headerSaveBtn.addEventListener('click', handlePolicySave);
    }
});