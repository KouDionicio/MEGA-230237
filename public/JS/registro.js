document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const response = await fetch('/api/users/registe', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirmPassword })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Usuario registrado con éxito');
        window.location.href = '/inicio.pug'; // Redirigir al login
    } else {
        alert(data.message); 
    }
});

