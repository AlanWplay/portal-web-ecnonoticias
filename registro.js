 document.querySelector('.btn-register').addEventListener('click', function() {
            alert('Redirigiendo al formulario de registro...');

        });
        
        document.querySelector('.login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if(email && password) {
                alert('Iniciando sesión...');
                // En una implementación real, aquí se enviarían los datos al servidor
            } else {
                alert('Por favor, completa todos los campos');
            }
        });