// ============================================
// 1. APERTURA DE LA CAJA DE REGALO
// ============================================
const giftBox = document.getElementById('giftBox');
const cuponContainer = document.getElementById('cuponContainer');
const instruccion = document.getElementById('instruccion');
const containerDiv = document.querySelector('.container');

let cajaAbierta = false;

giftBox.addEventListener('click', function() {
    if (cajaAbierta) return;
    cajaAbierta = true;

    // Desplazar todo hacia arriba cuando se abre la caja
    try { containerDiv.classList.add('shift-up'); } catch(e) {}

    // Animación de apertura
    this.classList.add('abierto');

    // Mostrar el cupón después de la animación
    setTimeout(() => {
        cuponContainer.classList.add('visible');
        instruccion.textContent = '¡FELIZ DÍA DEL PADRE!';
        instruccion.style.background = 'rgba(255,107,157,0.9)';
        instruccion.style.color = '#fff';
        instruccion.style.borderColor = '#ffd93d';
        
        // Lanzar confeti
        lanzarConfeti();
    }, 900);

    // Reproducir sonido (opcional)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRlwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAACAgICAoKCgoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD');
        audio.volume = 0.3;
        audio.play();
    } catch(e) {}
});

// ============================================
// 2. REVELAR CLÁUSULAS
// ============================================
const btnClausulas = document.getElementById('btnRevelarClausulas');
const clausulas = document.getElementById('clausulasRichard');

btnClausulas.addEventListener('click', function() {
    const estaAbierto = clausulas.classList.contains('abierto');
    
    if (estaAbierto) {
        clausulas.classList.remove('abierto');
        // Resetear estilos inline de los li
        document.querySelectorAll('#clausulasRichard ul li').forEach(li => {
            li.style.transform = 'translateX(-30px) scale(0.8)';
            li.style.opacity = '0';
        });
        this.innerHTML = `
            <span class="icono-boton">🍔</span>
            ¡REVELAR CLAÚSULAS!
            <span class="icono-boton">🛋️</span>
        `;
        this.style.background = 'linear-gradient(135deg, #ffd93d, #ff6b9d)';
        this.style.color = '#4a2c5e';
        this.style.borderColor = '#6bcbff';
    } else {
        clausulas.classList.add('abierto');
        // Aplicar estilos a los li con delay
        const lis = document.querySelectorAll('#clausulasRichard ul li');
        lis.forEach((li, index) => {
            setTimeout(() => {
                li.style.transform = 'translateX(0) scale(1)';
                li.style.opacity = '1';
            }, 100 + (index * 100));
        });
        this.innerHTML = `
            <span class="icono-boton">🛋️</span>
            ¡OCULTAR CLAÚSULAS!
            <span class="icono-boton">🍔</span>
        `;
        this.style.background = 'linear-gradient(135deg, #6bcbff, #4a8db7)';
        this.style.color = '#ffd93d';
        this.style.borderColor = '#ffd93d';
    }
});

// ============================================
// 3. CONFETI 🎊
// ============================================
function lanzarConfeti() {
    const container = document.getElementById('confetiContainer');
    const colores = ['#ff6b9d', '#ffd93d', '#6bcbff', '#4a2c5e', '#ff9ff3', '#feca57', '#48dbfb'];
    const formas = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 80; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti activo';
        
        const color = colores[Math.floor(Math.random() * colores.length)];
        const forma = formas[Math.floor(Math.random() * formas.length)];
        const size = 6 + Math.random() * 14;
        const duracion = 2 + Math.random() * 3;
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;

        confeti.style.cssText = `
            left: ${left}%;
            width: ${forma === 'circle' ? size : size * 0.6}px;
            height: ${forma === 'circle' ? size : size}px;
            background: ${color};
            border-radius: ${forma === 'circle' ? '50%' : forma === 'square' ? '2px' : '0'};
            clip-path: ${forma === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
            --duracion: ${duracion}s;
            animation-delay: ${delay}s;
            transform: rotate(${Math.random() * 360}deg);
        `;

        container.appendChild(confeti);

        // Eliminar después de la animación
        setTimeout(() => {
            confeti.remove();
        }, (duracion + delay) * 1000 + 500);
    }
}

// ============================================
// 4. MENSAJE EN CONSOLA
// ============================================
console.log('🎁 ¡Regalo listo para abrir!');
console.log('🐰 Recuerda: "¡Soy Richard, y lo merezco!"');