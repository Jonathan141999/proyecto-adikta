import supabaseClient from './supabase-config.js';
import toast from './toast.js';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    const getI18nText = (key) => {
        const lang = window.currentLang || 'es';
        const translations = {
            es: {
                toast_success: "¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.",
                toast_error: "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
                toast_validation: "Por favor, completa todos los campos."
            },
            en: {
                toast_success: "Message sent successfully! We will get in touch with you soon.",
                toast_error: "There was an error sending the message. Please try again later.",
                toast_validation: "Please complete all fields."
            }
        };
        return translations[lang][key] || key;
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            nombre_completo: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            asunto: document.getElementById('asunto').value.trim(),
            mensaje: document.getElementById('mensaje').value.trim()
        };

        if (!formData.nombre_completo || !formData.email || !formData.asunto || !formData.mensaje) {
            toast.show(getI18nText('toast_validation'), 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = (window.currentLang === 'en' ? 'Sending...' : 'Enviando...');

            const { error } = await supabaseClient
                .from('formularios_contacto')
                .insert([formData]);

            if (error) throw error;

            toast.show(getI18nText('toast_success'), 'success');

            contactForm.reset();

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.show(getI18nText('toast_error'), 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
});
