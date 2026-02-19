class ToastSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <i class="fa-solid ${icons[type]} toast-icon"></i>
            <div class="toast-content">${message}</div>
            <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
        `;

        this.container.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);

        const timeout = setTimeout(() => this.close(toast), duration);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeout);
            this.close(toast);
        });
    }

    close(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }
}

const toast = new ToastSystem();
export default toast;
