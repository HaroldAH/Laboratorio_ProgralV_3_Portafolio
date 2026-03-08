/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== LANGUAGE SWITCHER ===============*/
let currentLanguage = localStorage.getItem('language') || 'en';

// Translations for dynamic content
const translations = {
    en: {
        navHome: 'Home',
        navAbout: 'About',
        navSkills: 'Skills',
        navProjects: 'Projects',
        navContact: 'Contact',
        formSuccess: (name, email) => `Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`,
        project1Title: 'Task Management System',
        project1Desc: 'Web application to manage tasks built with React and Node.js. Features real-time updates and user authentication.',
        project2Title: 'E-commerce Platform',
        project2Desc: 'Full-stack e-commerce solution with shopping cart, payment integration, and admin dashboard for product management.',
        project3Title: 'Real-time Chat Application',
        project3Desc: 'WebSocket-based chat application with rooms, private messaging, and message history stored in the database.',
        project4Title: 'API REST Service',
        project4Desc: 'RESTful API with authentication, CRUD operations, data validation, and comprehensive documentation using Swagger.',
        project5Title: 'Dashboard Analytics',
        project5Desc: 'Interactive analytics dashboard with real-time data visualization, charts, and reporting features for business metrics.',
        project6Title: 'Weather App',
        project6Desc: 'Modern weather application with location-based forecasts, interactive maps, and detailed weather information.',
        liveDemo: 'Live Demo',
        github: 'GitHub'
    },
    es: {
        navHome: 'Inicio',
        navAbout: 'Acerca',
        navSkills: 'Habilidades',
        navProjects: 'Proyectos',
        navContact: 'Contacto',
        formSuccess: (name, email) => `¡Gracias ${name}! Tu mensaje ha sido recibido. Te responderé pronto a ${email}.`,
        project1Title: 'Sistema de Gestión de Tareas',
        project1Desc: 'Aplicación web para gestionar tareas construida con React y Node.js. Incluye actualizaciones en tiempo real y autenticación de usuarios.',
        project2Title: 'Plataforma E-commerce',
        project2Desc: 'Solución e-commerce full-stack con carrito de compras, integración de pagos y panel de administración para gestión de productos.',
        project3Title: 'Aplicación de Chat en Tiempo Real',
        project3Desc: 'Aplicación de chat basada en WebSocket con salas, mensajería privada e historial de mensajes almacenado en base de datos.',
        project4Title: 'Servicio API REST',
        project4Desc: 'API RESTful con autenticación, operaciones CRUD, validación de datos y documentación completa usando Swagger.',
        project5Title: 'Dashboard de Analíticas',
        project5Desc: 'Dashboard de analíticas interactivo con visualización de datos en tiempo real, gráficos y características de reportes para métricas de negocio.',
        project6Title: 'App del Clima',
        project6Desc: 'Aplicación moderna del clima con pronósticos basados en ubicación, mapas interactivos e información detallada del tiempo.',
        liveDemo: 'Demo en Vivo',
        github: 'GitHub'
    }
};

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-lang attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Update text content for most elements
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    // Update navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks[0].textContent = translations[lang].navHome;
    navLinks[1].textContent = translations[lang].navAbout;
    navLinks[2].textContent = translations[lang].navSkills;
    navLinks[3].textContent = translations[lang].navProjects;
    navLinks[4].textContent = translations[lang].navContact;

    // Update project titles and descriptions
    const projects = document.querySelectorAll('.project__card');
    projects.forEach((project, index) => {
        const title = project.querySelector('.project__title');
        const description = project.querySelector('.project__description');
        const links = project.querySelectorAll('.project__link span');
        
        title.textContent = translations[lang][`project${index + 1}Title`];
        description.textContent = translations[lang][`project${index + 1}Desc`];
        
        if (links[0]) links[0].textContent = translations[lang].liveDemo;
        if (links[1]) links[1].textContent = translations[lang].github;
    });

    // Update language toggle button
    const languageText = document.querySelector('.language-text');
    if (languageText) {
        languageText.textContent = lang === 'en' ? 'EN' : 'ES';
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
}

// Language toggle button
const languageToggle = document.getElementById('language-toggle');
if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        const newLang = currentLanguage === 'en' ? 'es' : 'en';
        changeLanguage(newLang);
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe project cards
document.querySelectorAll('.project__card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skills__category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(category);
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Show success message in current language
        const successMessage = translations[currentLanguage].formSuccess(name, email);
        alert(successMessage);
        
        // Reset form
        contactForm.reset();
    });
}

/*=============== TYPING ANIMATION ===============*/
const typed = document.querySelector('.home__title-main');
if (typed) {
    const text = typed.textContent;
    typed.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typed.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

/*=============== SMOOTH SCROLL ===============*/
// Already handled by CSS scroll-behavior: smooth
// But we can add some extra polish
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
