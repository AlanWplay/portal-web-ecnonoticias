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
