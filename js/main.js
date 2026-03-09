// --- Menú mobile ---
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if (navClose)  navClose.addEventListener('click',  () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});


// --- Cambio de idioma ---
let currentLanguage = localStorage.getItem('language') || 'en';

const translations = {
    en: {
        navHome:     'Home',
        navAbout:    'About',
        navSkills:   'Skills',
        navProjects: 'Projects',
        navContact:  'Contact',
        formSuccess: (name, email) =>
            `Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`,
        project1Title: 'Task Management System',
        project1Desc:  'Web application to manage tasks built with React and Node.js. Features real-time updates and user authentication.',
        project2Title: 'E-commerce Platform',
        project2Desc:  'Full-stack e-commerce solution with shopping cart, payment integration, and admin dashboard for product management.',
        project3Title: 'Real-time Chat Application',
        project3Desc:  'WebSocket-based chat application with rooms, private messaging, and message history stored in the database.',
        project4Title: 'API REST Service',
        project4Desc:  'RESTful API with authentication, CRUD operations, data validation, and comprehensive documentation using Swagger.',
        project5Title: 'Dashboard Analytics',
        project5Desc:  'Interactive analytics dashboard with real-time data visualization, charts, and reporting features for business metrics.',
        project6Title: 'Weather App',
        project6Desc:  'Modern weather application with location-based forecasts, interactive maps, and detailed weather information.',
        github: 'GitHub'
    },
    es: {
        navHome:     'Inicio',
        navAbout:    'Acerca',
        navSkills:   'Habilidades',
        navProjects: 'Proyectos',
        navContact:  'Contacto',
        formSuccess: (name, email) =>
            `¡Gracias ${name}! Tu mensaje ha sido recibido. Te responderé pronto a ${email}.`,
        project1Title: 'Sistema de Gestión de Tareas',
        project1Desc:  'Aplicación web para gestionar tareas construida con React y Node.js. Incluye actualizaciones en tiempo real y autenticación de usuarios.',
        project2Title: 'Plataforma E-commerce',
        project2Desc:  'Solución e-commerce full-stack con carrito de compras, integración de pagos y panel de administración para gestión de productos.',
        project3Title: 'Aplicación de Chat en Tiempo Real',
        project3Desc:  'Aplicación de chat basada en WebSocket con salas, mensajería privada e historial de mensajes almacenado en base de datos.',
        project4Title: 'Servicio API REST',
        project4Desc:  'API RESTful con autenticación, operaciones CRUD, validación de datos y documentación completa usando Swagger.',
        project5Title: 'Dashboard de Analíticas',
        project5Desc:  'Dashboard de analíticas interactivo con visualización de datos en tiempo real, gráficos y reportes de métricas de negocio.',
        project6Title: 'App del Clima',
        project6Desc:  'Aplicación moderna del clima con pronósticos por ubicación, mapas interactivos e información detallada del tiempo.',
        github: 'GitHub'
    }
};

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (!text) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });

    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        const ph = el.getAttribute(`data-placeholder-${lang}`);
        if (ph) el.placeholder = ph;
    });

    const navLinks = document.querySelectorAll('.nav__link');
    const navKeys  = ['navHome', 'navAbout', 'navSkills', 'navProjects', 'navContact'];
    navLinks.forEach((link, i) => { link.textContent = translations[lang][navKeys[i]]; });

    document.querySelectorAll('.project__card').forEach((card, i) => {
        const n = i + 1;
        card.querySelector('.project__title').textContent       = translations[lang][`project${n}Title`];
        card.querySelector('.project__description').textContent = translations[lang][`project${n}Desc`];
        const ghSpan = card.querySelector('.project__link span');
        if (ghSpan) ghSpan.textContent = translations[lang].github;
    });

    const langText = document.querySelector('.language-text');
    if (langText) langText.textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
}

const languageToggle = document.getElementById('language-toggle');
if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        changeLanguage(currentLanguage === 'en' ? 'es' : 'en');
    });
}

document.addEventListener('DOMContentLoaded', () => changeLanguage(currentLanguage));


// --- Header y scroll-top ---
function scrollHeader() {
    document.getElementById('header').classList.toggle('scroll-header', window.scrollY >= 50);
}

function scrollTop() {
    document.getElementById('scroll-top').classList.toggle('show-scroll', window.scrollY >= 560);
}

window.addEventListener('scroll', scrollHeader);
window.addEventListener('scroll', scrollTop);



// --- Enlace activo según sección visible ---
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const top    = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav__link[href*=${id}]`);

        if (scrollY > top && scrollY <= bottom) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);



// --- Animaciones al hacer scroll ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.section').forEach(el => {
    el.style.cssText = 'opacity:0; transform:translateY(30px); transition:opacity .8s ease, transform .8s ease';
    observer.observe(el);
});

document.querySelectorAll('.project__card').forEach((el, i) => {
    el.style.cssText = `opacity:0; transform:translateY(30px); transition:opacity .6s ease ${i * 0.1}s, transform .6s ease ${i * 0.1}s`;
    observer.observe(el);
});

document.querySelectorAll('.skills__category').forEach((el, i) => {
    el.style.cssText = `opacity:0; transform:translateY(30px); transition:opacity .6s ease ${i * 0.15}s, transform .6s ease ${i * 0.15}s`;
    observer.observe(el);
});



// --- Formulario de contacto ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const data      = new FormData(contactForm);
        const name      = data.get('name');
        const email     = data.get('email');
        const message   = data.get('message');
        const submitBtn = contactForm.querySelector('.contact__button');

        submitBtn.disabled    = true;
        submitBtn.textContent = currentLanguage === 'en' ? 'Sending...' : 'Enviando...';

        fetch('https://formsubmit.co/ajax/harolah26@gmail.com', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body:    JSON.stringify({ name, email, message, _subject: 'Nuevo mensaje del portafolio' })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success === 'true' || res.success === true) {
                alert(translations[currentLanguage].formSuccess(name, email));
                contactForm.reset();
            } else {
                alert(currentLanguage === 'en'
                    ? 'Something went wrong. Please try again.'
                    : 'Algo salió mal. Inténtalo de nuevo.');
            }
        })
        .catch(() => {
            alert(currentLanguage === 'en'
                ? 'Something went wrong. Please try again.'
                : 'Algo salió mal. Inténtalo de nuevo.');
        })
        .finally(() => {
            submitBtn.disabled   = false;
            submitBtn.innerHTML  = (currentLanguage === 'en' ? 'Send Message' : 'Enviar Mensaje')
                + ' <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
                + '<line x1="22" y1="2" x2="11" y2="13"/>'
                + '<polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        });
    });
}



// --- Typing animation en el hero ---
const typed = document.querySelector('.home__title-main');
if (typed) {
    const fullText = typed.textContent;
    typed.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < fullText.length) {
            typed.textContent += fullText.charAt(i++);
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 500);
}


// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
