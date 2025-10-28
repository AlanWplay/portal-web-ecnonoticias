// Sistema de modo oscuro unificado
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.mobileThemeToggle = document.getElementById('mobileThemeToggle');
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupEventListeners();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = this.prefersDarkScheme.matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.enableDarkMode();
        } else {
            this.enableLightMode();
        }
    }

    enableDarkMode() {
        document.body.classList.add('dark-mode');
        this.updateToggleButtons('Modo Claro', '☀️ Cambiar a modo claro');
        localStorage.setItem('theme', 'dark');
    }

    enableLightMode() {
        document.body.classList.remove('dark-mode');
        this.updateToggleButtons('Modo Oscuro', '🌙 Cambiar a modo oscuro');
        localStorage.setItem('theme', 'light');
    }

    updateToggleButtons(desktopText, mobileText) {
        if (this.themeToggle) {
            this.themeToggle.textContent = desktopText;
        }
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.innerHTML = mobileText;
        }
    }

    toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
    }

    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }

        this.prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    this.enableDarkMode();
                } else {
                    this.enableLightMode();
                }
            }
        });
    }
}

// Gestor del Menú Móvil
class MobileMenu {
    constructor() {
        this.hamburgerBtn = document.getElementById('hamburgerBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.closeMenuBtn = document.getElementById('closeMenuBtn');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    openMenu() {
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.hamburgerBtn.style.display = 'none';
    }

    closeMenu() {
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.hamburgerBtn.style.display = 'flex';
    }

    setupEventListeners() {
        this.hamburgerBtn.addEventListener('click', () => this.openMenu());
        this.closeMenuBtn.addEventListener('click', () => this.closeMenu());

        // Cerrar menú al hacer clic en un enlace
        this.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Cerrar menú con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Cerrar menú al hacer clic fuera del contenido del menú
        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileMenu) {
                this.closeMenu();
            }
        });
    }
}

// Gestor del Buscador
class SearchManager {
    constructor() {
        this.searchToggle = document.getElementById('searchToggle');
        this.searchBox = document.getElementById('searchBox');
        this.init();
    }

    init() {
        if (this.searchToggle && this.searchBox) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.searchBox.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!this.searchBox.contains(e.target) && e.target !== this.searchToggle) {
                this.searchBox.classList.remove('active');
            }
        });

        this.searchBox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Carrusel de Noticias
class Carrusel {
    constructor(contenedor) {
        this.contenedor = contenedor;
        this.slides = contenedor.querySelector('.carrusel-contenedor');
        this.slideItems = contenedor.querySelectorAll('.carrusel-slide');
        this.indicadores = contenedor.querySelectorAll('.indicador');
        this.btnPrev = contenedor.querySelector('.carrusel-prev');
        this.btnNext = contenedor.querySelector('.carrusel-next');
        this.toggleBtn = document.getElementById('toggleAutoPlay');
        
        this.slideActual = 0;
        this.totalSlides = this.slideItems.length;
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.iniciar();
    }
    
    iniciar() {
        this.setupEventListeners();
        this.configurarTouch();
        this.iniciarAutoPlay();
    }
    
    setupEventListeners() {
        this.btnPrev.addEventListener('click', () => this.slideAnterior());
        this.btnNext.addEventListener('click', () => this.slideSiguiente());
        
        this.indicadores.forEach((indicador, index) => {
            indicador.addEventListener('click', () => this.irASlide(index));
        });
        
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleAutoPlay());
        }
    }
    
    configurarTouch() {
        this.contenedor.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });
        
        this.contenedor.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }
    
    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.slideSiguiente();
            } else {
                this.slideAnterior();
            }
        }
    }
    
    slideSiguiente() {
        this.slideActual = (this.slideActual + 1) % this.totalSlides;
        this.actualizarCarrusel();
    }
    
    slideAnterior() {
        this.slideActual = (this.slideActual - 1 + this.totalSlides) % this.totalSlides;
        this.actualizarCarrusel();
    }
    
    irASlide(index) {
        this.slideActual = index;
        this.actualizarCarrusel();
    }
    
    actualizarCarrusel() {
        const translateX = -this.slideActual * 100;
        this.slides.style.transform = `translateX(${translateX}%)`;
        
        this.indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('activo', index === this.slideActual);
        });
    }
    
    iniciarAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.slideSiguiente();
        }, 5000);
        this.isAutoPlaying = true;
        this.updateToggleButton();
    }
    
    detenerAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.isAutoPlaying = false;
        this.updateToggleButton();
    }
    
    toggleAutoPlay() {
        if (this.isAutoPlaying) {
            this.detenerAutoPlay();
        } else {
            this.iniciarAutoPlay();
        }
    }
    
    updateToggleButton() {
        if (this.toggleBtn) {
            this.toggleBtn.innerHTML = this.isAutoPlaying ? 
                '⏸️ Pausar' : '▶️ Reanudar';
        }
    }
}

// Animaciones de Scroll
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const elements = document.querySelectorAll('.article, .news-card, .sidebar-article');
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }
}

// Inicialización de la aplicación
class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            // Inicializar managers
            new ThemeManager();
            new MobileMenu();
            new SearchManager();
            
            // Inicializar carrusel si existe
            const carruselElement = document.querySelector('.carrusel');
            if (carruselElement) {
                new Carrusel(carruselElement);
            }
            
            // Inicializar animaciones
            new ScrollAnimations();
            
            console.log('🚀 Tecnonoticias - Aplicación inicializada correctamente');
        });
    }
}

// Iniciar la aplicación
new App();

// Smooth scrolling para enlaces internos
document.addEventListener('DOMContentLoaded', () => {
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
});

// Preload de imágenes críticas
function preloadCriticalImages() {
    const criticalImages = [
        'nvidiatrans.png',
        'ipad.jpg',
        'perro_policia.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});