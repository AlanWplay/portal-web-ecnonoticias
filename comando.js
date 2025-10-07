
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('themeToggle');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Verificar preferencia del sistema o tema guardado
            if (localStorage.getItem('theme') === 'dark' || 
                (localStorage.getItem('theme') === null && prefersDarkScheme.matches)) {
                document.body.classList.add('dark-mode');
                themeToggle.textContent = 'Modo Oscuro';
            } else {
                document.body.classList.remove('dark-mode');
                themeToggle.textContent = 'Modo Oscuro';
            }
            
            // Alternar tema al hacer clic en el botón
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                if (document.body.classList.contains('dark-mode')) {
                    themeToggle.textContent = 'Modo Oscuro';
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeToggle.textContent = 'Modo Claro';
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
        });




        /* Función para cambiar entre modo claro y oscuro*/
function toggleDarkMode() {
  const body = document.body;
  const toggleButton = document.getElementById('darkModeToggle');
  
  /* Alternar la clase dark-mode en el body */
  body.classList.toggle('dark-mode');
  
  /* Guardar la preferencia en localStorage */
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Actualizar el texto del botón (opcional)
  if (isDarkMode) {
    toggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    toggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

// Verificar la preferencia guardada al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  const savedDarkMode = localStorage.getItem('darkMode');
  const body = document.body;
  const toggleButton = document.getElementById('darkModeToggle');
  
  if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    toggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    toggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
  
  // Agregar el evento de clic al botón
  toggleButton.addEventListener('click', toggleDarkMode);
});



