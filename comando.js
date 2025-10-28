// Sistema de modo oscuro unificado
    document.addEventListener('DOMContentLoaded', function() {
      const themeToggle = document.getElementById('themeToggle');
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Verificar preferencia del sistema o tema guardado
      if (localStorage.getItem('theme') === 'dark' || 
          (localStorage.getItem('theme') === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Modo Claro';
      } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'Modo Oscuro';
      }
      
      // Alternar tema al hacer clic en el botón
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          themeToggle.textContent = 'Modo Claro';
          localStorage.setItem('theme', 'dark');
        } else {
          themeToggle.textContent = 'Modo Oscuro';
          localStorage.setItem('theme', 'light');
        }
      });
      
      // Escuchar cambios en la preferencia del sistema
      prefersDarkScheme.addEventListener('change', function(e) {
        if (localStorage.getItem('theme') === null) {
          if (e.matches) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = 'Modo Claro';
          } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = 'Modo Oscuro';
          }
        }
      });

      // Menu desplegable
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const fullscreenMenu = document.getElementById('fullscreenMenu');
      const closeBtn = document.getElementById('closeBtn');

      function openMenu() {
        fullscreenMenu.classList.add('active');
        hamburgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previene el scroll
      }

      function closeMenu() {
        fullscreenMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura el scroll
      }

      // Event listeners
      hamburgerBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);

      // Cerrar menú al hacer clic en un enlace
      document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // Cerrar menú con la tecla ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeMenu();
        }
      });

      // Cerrar menú al hacer clic fuera del contenido del menú
      fullscreenMenu.addEventListener('click', (e) => {
        if (e.target === fullscreenMenu) {
          closeMenu();
        }
      });

      // Buscador con lupa desplegable
      const searchToggle = document.getElementById('searchToggle');
      const searchBox = document.getElementById('searchBox');

      searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        searchBox.classList.toggle('active');
      });

      // Cerrar el buscador al hacer clic fuera
      document.addEventListener('click', function() {
        searchBox.classList.remove('active');
      });

      // Evitar que se cierre al hacer clic dentro del buscador
      searchBox.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });




    // carusel
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
                
                this.iniciar();
            }
            
            iniciar() {
                // Event listeners para botones
                this.btnPrev.addEventListener('click', () => this.slideAnterior());
                this.btnNext.addEventListener('click', () => this.slideSiguiente());
                
                // Event listeners para indicadores
                this.indicadores.forEach((indicador, index) => {
                    indicador.addEventListener('click', () => this.irASlide(index));
                });
                
                // Control de auto-play
                this.toggleBtn.addEventListener('click', () => this.toggleAutoPlay());
                
                // Auto-play
                this.iniciarAutoPlay();
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
                
                // Actualizar indicadores
                this.indicadores.forEach((indicador, index) => {
                    indicador.classList.toggle('activo', index === this.slideActual);
                });
            }
            
            iniciarAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.slideSiguiente();
                }, 5000); // Cambia cada 5 segundos
                this.isAutoPlaying = true;
                this.toggleBtn.textContent = 'Pausar';
            }
            
            detenerAutoPlay() {
                clearInterval(this.autoPlayInterval);
                this.isAutoPlaying = false;
                this.toggleBtn.textContent = 'Reanudar';
            }
            
            toggleAutoPlay() {
                if (this.isAutoPlaying) {
                    this.detenerAutoPlay();
                } else {
                    this.iniciarAutoPlay();
                }
            }
        }
        
        // Inicializar el carrusel
        document.addEventListener('DOMContentLoaded', () => {
            const carrusel = new Carrusel(document.querySelector('.carrusel'));
        });



        // bloque de noticias

      