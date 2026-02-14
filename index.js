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
