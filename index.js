const canvas = document.getElementById("leafBackground");
const ctx = canvas.getContext("2d");

let leaves = [];
let dpr = window.devicePixelRatio || 1;

/* ===== Obtener color desde CSS ===== */

function getLeafColor(){
    return getComputedStyle(document.documentElement)
        .getPropertyValue('--leaf-color')
        .trim();
}

/* ===== Ajustar canvas a retina ===== */

function resizeCanvas(){

    dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);

}

/* ===== Clase hoja ===== */

class Leaf{

    constructor(){
        this.reset();
    }

    reset(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
    }

    draw(){

        const leafColor = getLeafColor();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${leafColor},${this.opacity})`;

        ctx.ellipse(
            this.x,
            this.y,
            this.size,
            this.size * 2,
            Math.PI/4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    update(){

        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01);

        if(this.y > window.innerHeight){
            this.y = -10;
            this.x = Math.random() * window.innerWidth;
        }

        this.draw();
    }
}

/* ===== Inicializar hojas ===== */

function init(){

    leaves = [];

    const totalLeaves = window.innerWidth < 768 ? 40 : 80;

    for(let i = 0; i < totalLeaves; i++){
        leaves.push(new Leaf());
    }
}

/* ===== Animación ===== */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    leaves.forEach(leaf => leaf.update());

    requestAnimationFrame(animate);
}

/* ===== Navbar scroll seguro ===== */

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".hoja-navbar");
    if(!navbar) return;

    let currentScroll = window.scrollY;

    /* Shrink clásico */
    if(currentScroll > 60){
        navbar.classList.add("shrink");
    }else{
        navbar.classList.remove("shrink");
    }

    /* Navbar dinámico ocultar / mostrar */
    if(currentScroll > lastScroll && currentScroll > 120){
        navbar.classList.add("nav-hide");
    }else{
        navbar.classList.remove("nav-hide");
    }

    lastScroll = currentScroll;

});


/* ===== Resize optimizado ===== */

let resizeTimeout;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {

        resizeCanvas();
        init();

    }, 200);

});

/* ===== Inicio ===== */

resizeCanvas();
init();
animate();
/*=========FOOOTER======*/ 
/* ================= FOOTER ANIMACION ================= */

document.addEventListener("DOMContentLoaded", () => {

    const footer = document.querySelector(".footer-hoja");

    if(!footer) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                footer.classList.add("show");
            }

        });

    },{
        threshold: 0.2
    });

    observer.observe(footer);

});
/*===================INDEX SECCION============================ */

/* ================= HERO ================= */

const heroContent = document.querySelector(".hero-content");

if(heroContent){

    let ticking = false;

    function heroParallax(){

        const scroll = window.scrollY;
        heroContent.style.transform = `translateY(${scroll * 0.2}px)`;

        ticking = false;
    }

    window.addEventListener("scroll", () => {

        if(!ticking){
            window.requestAnimationFrame(heroParallax);
            ticking = true;
        }

    });

}

/* ================= ANIMACIONES SCROLL ================= */

const fadeElements = document.querySelectorAll(".fade-up");

if(fadeElements.length){

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                // deja de observar después de animar
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.2
    });

    fadeElements.forEach(el => observer.observe(el));

}
/* ================= SObre nosotros ================= */
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ANIMACION SCROLL (Fade Up)
    ========================================= */

    const fadeElements = document.querySelectorAll(".fade-up");

    if (fadeElements.length > 0) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }

            });

        }, { threshold: 0.2 });

        fadeElements.forEach(el => observer.observe(el));
    }



    /* =========================================
       EFECTO 3D CARDS SOLO DESKTOP
    ========================================= */

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isTouchDevice && !prefersReducedMotion) {

        const cards = document.querySelectorAll(".about-card");

        cards.forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = -(y - rect.height / 2) / 18;
                const rotateY = (x - rect.width / 2) / 18;

                card.style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "rotateX(0deg) rotateY(0deg) translateY(0)";

            });

        });
    }

});
/*====================Equipo==========================*/
// ================= EQUIPO =================

document.addEventListener("DOMContentLoaded", () => {

    /* ===== SCROLL ANIMATION ===== */

    const faders = document.querySelectorAll(".fade-up");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); // optimiza rendimiento
                }
            });

        }, { threshold: 0.2 });

        faders.forEach(el => observer.observe(el));

    } else {
        faders.forEach(el => el.classList.add("show"));
    }



    /* ===== MOVIMIENTO 3D TARJETAS ===== */

    // Desactivar en pantallas táctiles
    if (window.innerWidth > 768) {

        const cards = document.querySelectorAll(".team-card, .team-main-card");

        cards.forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = -(y - rect.height / 2) / 25;
                const rotateY = (x - rect.width / 2) / 25;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-12px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });

        });

    }

});
