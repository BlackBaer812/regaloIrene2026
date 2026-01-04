// Transición suave entre secciones
function swapSection(outSection, inSection) {
    outSection.classList.add('fade-transition');
    inSection.classList.add('fade-transition');
    // Fade out la sección actual
    outSection.classList.remove('fade-in');
    outSection.classList.add('fade-out');
    setTimeout(() => {
        outSection.classList.add('d-none');
        outSection.classList.remove('fade-out');
        // Preparar la nueva sección para fade-in
        inSection.classList.add('fade-transition', 'fade-out'); // opacidad 0
        inSection.classList.remove('d-none');
        // Forzar reflow para que el navegador aplique la opacidad 0 antes de pasar a 1
        void inSection.offsetWidth;
        inSection.classList.remove('fade-out'); // transiciona a opacidad 1
        inSection.classList.add('fade-in');
        setTimeout(() => {
            inSection.classList.remove('fade-in');
        }, 1000);
    }, 1000);
}

var meridaStatus = true;
var portugalStatus = true;

window.addEventListener('DOMContentLoaded', () => {

    //Imagen para pulsar
    const imgEntrada = document.getElementById('imgEntrada');

    //secciones
    const filaImagen = document.getElementById('filaImagen');
    const centroMerida = document.getElementById('centroMerida');
    const portugal = document.getElementById('portugal');
    const hoteles = document.getElementById('hoteles');

    //Carrusel de merida
    const carruselMerida = document.getElementById('carruselMerida');
    const imgsMerida = document.querySelectorAll('#carruselMerida .carousel-item img');

    //Carrusel de portugal
    const carruselPortugal = document.getElementById('carruselPortugal');
    const imgsPortugal = document.querySelectorAll('#carruselPortugal .carousel-item img');

    //Evento de click
    imgEntrada.addEventListener('click', () => {
        swapSection(filaImagen, centroMerida);
        portugalStatus = true;
        meridaStatus = true;
        portugal.classList.add('d-none');
        hoteles.classList.add('d-none');
    });

    //Evento de finalizar carrusel de Mérida
    if (carruselMerida) {
        carruselMerida.addEventListener('slid.bs.carousel', (event) => {
            setTimeout(() => {
                if(imgsMerida.length-1 === event.to){
                    if(meridaStatus){
                        meridaStatus = false;
                        swapSection(centroMerida, portugal);
                    }
                } 
            }, 1000);
        });
    }

    //Evento de finalizar carrusel de Portugal
    if (carruselPortugal) {
        carruselPortugal.addEventListener('slid.bs.carousel', (event) => {
            setTimeout(() => {
                if(imgsPortugal.length-1 === event.to){
                    if(portugalStatus){
                        portugalStatus = false;
                        swapSection(portugal, hoteles);
                    }
                }
            }, 1000);
        });
    }

    const mostrarTodoBtn = document.getElementById('mostrarTodoBtn');
    mostrarTodoBtn.addEventListener('click', () => mostrarTodo());
});

function mostrarTodo() {
    
    const filaImagen = document.getElementById('filaImagen');
    const centroMerida = document.getElementById('centroMerida');
    const portugal = document.getElementById('portugal');
    const hoteles = document.getElementById('hoteles');
    filaImagen.classList.remove('d-none');
    centroMerida.classList.remove('d-none');
    portugal.classList.remove('d-none');
    hoteles.classList.remove('d-none');
}