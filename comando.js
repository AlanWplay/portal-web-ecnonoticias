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
        this.updateToggleButtons('Modo Oscuro', '🌙 Cambiar a modo oscuro');
        localStorage.setItem('theme', 'dark');
    }

    enableLightMode() {
        document.body.classList.remove('dark-mode');
        this.updateToggleButtons('Modo Claro', '☀️ Cambiar a modo claro');
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

// Gestor del Buscador Mejorado
class SearchManager {
    constructor() {
        this.searchToggle = document.getElementById('searchToggle');
        this.searchBox = document.getElementById('searchBox');
        this.searchForm = document.getElementById('searchForm');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.suggestionTags = document.querySelectorAll('.suggestion-tag');
        
        this.articles = []; // Aquí almacenaremos los artículos para buscar
        this.init();
    }

    init() {
        if (this.searchToggle && this.searchBox) {
            this.setupEventListeners();
            this.loadArticlesData();
        }
    }

    // Cargar datos de los artículos para la búsqueda
    loadArticlesData() {
        // Obtener todos los artículos de la página
        const featuredArticles = document.querySelectorAll('.article');
        const sidebarArticles = document.querySelectorAll('.sidebar-article');
        const newsCards = document.querySelectorAll('.news-card');
        const carouselSlides = document.querySelectorAll('.carrusel-slide');

        // Procesar artículos destacados
        featuredArticles.forEach((article, index) => {
            const title = article.querySelector('h3 a')?.textContent || '';
            const category = article.querySelector('.article-category')?.textContent || '';
            const excerpt = article.querySelector('p')?.textContent || '';
            const link = article.querySelector('h3 a')?.getAttribute('href') || '#';
            
            if (title) {
                this.articles.push({
                    type: 'featured',
                    title,
                    category,
                    excerpt,
                    link,
                    element: article
                });
            }
        });

        // Procesar artículos del sidebar
        sidebarArticles.forEach((article, index) => {
            const title = article.querySelector('h3 a')?.textContent || '';
            const category = article.querySelector('.sidebar-category')?.textContent || '';
            const excerpt = article.querySelector('p')?.textContent || '';
            const link = article.querySelector('h3 a')?.getAttribute('href') || '#';
            
            if (title) {
                this.articles.push({
                    type: 'sidebar',
                    title,
                    category,
                    excerpt,
                    link,
                    element: article
                });
            }
        });

        // Procesar tarjetas de noticias
        newsCards.forEach((card, index) => {
            const title = card.querySelector('.card-title')?.textContent || '';
            const category = card.querySelector('.category')?.textContent || '';
            const excerpt = card.querySelector('.card-excerpt')?.textContent || '';
            
            if (title) {
                this.articles.push({
                    type: 'news-card',
                    title,
                    category,
                    excerpt,
                    link: '#', // Las tarjetas no tienen enlaces en el HTML proporcionado
                    element: card
                });
            }
        });

        // Procesar slides del carrusel
        carouselSlides.forEach((slide, index) => {
            const title = slide.querySelector('h2')?.textContent || '';
            const category = slide.querySelector('.slide-category')?.textContent || '';
            const excerpt = slide.querySelector('p')?.textContent || '';
            const link = slide.querySelector('.slide-link')?.getAttribute('href') || '#';
            
            if (title) {
                this.articles.push({
                    type: 'carousel',
                    title,
                    category,
                    excerpt,
                    link,
                    element: slide
                });
            }
        });
    }

    setupEventListeners() {
        // Toggle del buscador
        this.searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.searchBox.classList.toggle('active');
            if (this.searchBox.classList.contains('active')) {
                this.searchInput.focus();
                this.showSearchSuggestions();
            }
        });

        // Cerrar buscador al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.searchBox.contains(e.target) && e.target !== this.searchToggle) {
                this.searchBox.classList.remove('active');
                this.clearSearchResults();
            }
        });

        this.searchBox.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Envío del formulario de búsqueda
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch(this.searchInput.value.trim());
        });

        // Búsqueda en tiempo real
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                this.performSearch(query);
            } else {
                this.showSearchSuggestions();
            }
        });

        // Sugerencias de búsqueda rápida
        this.suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.performSearch(searchTerm);
            });
        });

        // Tecla ESC para cerrar resultados
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearchResults();
                this.searchBox.classList.remove('active');
            }
        });
    }

    performSearch(query) {
        if (!query) {
            this.showSearchSuggestions();
            return;
        }

        const results = this.searchArticles(query);
        this.displaySearchResults(results, query);
    }

    searchArticles(query) {
        const searchTerms = query.toLowerCase().split(' ');
        
        return this.articles.filter(article => {
            const searchableText = `
                ${article.title.toLowerCase()}
                ${article.category.toLowerCase()}
                ${article.excerpt.toLowerCase()}
            `;
            
            return searchTerms.some(term => 
                searchableText.includes(term)
            );
        });
    }

    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <h4>🔍 No se encontraron resultados</h4>
                    <p>No hay artículos que coincidan con "<strong>${query}</strong>"</p>
                    <div class="search-tips">
                        <p>💡 Sugerencias:</p>
                        <ul>
                            <li>Revisa la ortografía</li>
                            <li>Usa términos más generales</li>
                            <li>Prueba con otras palabras clave</li>
                        </ul>
                    </div>
                </div>
            `;
            return;
        }

        let resultsHTML = `
            <div class="search-results-header">
                <h4>🔍 Resultados de búsqueda</h4>
                <p>${results.length} artículo(s) encontrado(s) para "<strong>${query}</strong>"</p>
            </div>
            <div class="search-results-list">
        `;

        results.forEach(article => {
            const highlightedTitle = this.highlightText(article.title, query);
            const highlightedExcerpt = this.highlightText(
                article.excerpt.length > 150 ? 
                article.excerpt.substring(0, 150) + '...' : 
                article.excerpt, 
                query
            );

            resultsHTML += `
                <div class="search-result-item" data-type="${article.type}">
                    <span class="result-category">${article.category}</span>
                    <h5 class="result-title">
                        <a href="${article.link}" onclick="this.closest('.search-box').classList.remove('active')">
                            ${highlightedTitle}
                        </a>
                    </h5>
                    <p class="result-excerpt">${highlightedExcerpt}</p>
                    <div class="result-meta">
                        <span class="result-type">${this.getTypeLabel(article.type)}</span>
                        <a href="${article.link}" class="result-link" onclick="this.closest('.search-box').classList.remove('active')">
                            Leer más →
                        </a>
                    </div>
                </div>
            `;
        });

        resultsHTML += '</div>';
        this.searchResults.innerHTML = resultsHTML;

        // Añadir estilos para los resultados si no existen
        this.addSearchResultsStyles();
    }

    highlightText(text, query) {
        if (!query) return text;
        
        const terms = query.toLowerCase().split(' ');
        let highlightedText = text;
        
        terms.forEach(term => {
            if (term.length > 2) {
                const regex = new RegExp(`(${term})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
            }
        });
        
        return highlightedText;
    }

    getTypeLabel(type) {
        const labels = {
            'featured': '📰 Destacado',
            'sidebar': '📢 Reciente',
            'news-card': '📊 Noticia',
            'carousel': '🚀 Popular'
        };
        return labels[type] || '📄 Artículo';
    }

    showSearchSuggestions() {
        this.searchResults.innerHTML = `
            <div class="search-suggestions">
                <h4>🔍 Búsquedas rápidas:</h4>
                <div class="suggestion-tags">
                    <span class="suggestion-tag" data-search="tecnología">Tecnología</span>
                    <span class="suggestion-tag" data-search="videojuegos">Videojuegos</span>
                    <span class="suggestion-tag" data-search="inteligencia artificial">IA</span>
                    <span class="suggestion-tag" data-search="apple">Apple</span>
                    <span class="suggestion-tag" data-search="microsoft">Microsoft</span>
                    <span class="suggestion-tag" data-search="robot">Robótica</span>
                    <span class="suggestion-tag" data-search="seguridad">Ciberseguridad</span>
                </div>
                <div class="search-tips">
                    <p>💡 Escribe al menos 3 caracteres para buscar</p>
                </div>
            </div>
        `;

        // Re-asignar event listeners a las nuevas sugerencias
        this.searchResults.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.performSearch(searchTerm);
            });
        });
    }

    clearSearchResults() {
        this.searchResults.innerHTML = '';
        this.searchInput.value = '';
    }

    addSearchResultsStyles() {
        if (!document.getElementById('search-results-styles')) {
            const styles = `
                <style id="search-results-styles">
                    .search-results {
                        max-height: 400px;
                        overflow-y: auto;
                        margin-top: 15px;
                    }

                    .search-results-header {
                        padding: 10px 0;
                        border-bottom: 1px solid var(--border-color);
                        margin-bottom: 15px;
                    }

                    .search-results-header h4 {
                        margin: 0 0 5px 0;
                        color: var(--text-color);
                    }

                    .search-results-header p {
                        margin: 0;
                        font-size: 0.9rem;
                        opacity: 0.8;
                    }

                    .search-results-list {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .search-result-item {
                        padding: 15px;
                        background: var(--bg-color);
                        border-radius: 8px;
                        border: 1px solid var(--border-color);
                        transition: all 0.3s ease;
                    }

                    .search-result-item:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }

                    .result-category {
                        display: inline-block;
                        background: var(--button-bg);
                        color: white;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .result-title {
                        margin: 0 0 8px 0;
                        font-size: 1rem;
                    }

                    .result-title a {
                        color: var(--text-color);
                        text-decoration: none;
                    }

                    .result-title a:hover {
                        color: var(--accent-color);
                    }

                    .result-excerpt {
                        margin: 0 0 10px 0;
                        font-size: 0.9rem;
                        opacity: 0.8;
                        line-height: 1.4;
                    }

                    .result-meta {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.8rem;
                    }

                    .result-type {
                        opacity: 0.7;
                    }

                    .result-link {
                        color: var(--button-bg);
                        text-decoration: none;
                        font-weight: 500;
                    }

                    .result-link:hover {
                        color: var(--button-hover);
                    }

                    mark {
                        background: #ffeb3b;
                        color: #000;
                        padding: 1px 2px;
                        border-radius: 2px;
                    }

                    .no-results {
                        text-align: center;
                        padding: 20px;
                    }

                    .no-results h4 {
                        margin-bottom: 10px;
                        color: var(--text-color);
                    }

                    .search-tips {
                        margin-top: 15px;
                        padding: 15px;
                        background: var(--bg-color);
                        border-radius: 8px;
                        border: 1px solid var(--border-color);
                    }

                    .search-tips ul {
                        margin: 10px 0 0 20px;
                        text-align: left;
                    }

                    .search-tips li {
                        margin-bottom: 5px;
                    }

                    .suggestion-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin: 15px 0;
                    }

                    .suggestion-tag {
                        background: var(--button-bg);
                        color: white;
                        padding: 6px 12px;
                        border-radius: 16px;
                        font-size: 0.8rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .suggestion-tag:hover {
                        background: var(--button-hover);
                        transform: translateY(-2px);
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }
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
            new SearchManager(); // Ahora incluye funcionalidad completa de búsqueda
            
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

// Preload de imágenes críticas al cargar la página
document.addEventListener('DOMContentLoaded', preloadCriticalImages);