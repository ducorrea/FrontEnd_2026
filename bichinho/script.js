const cria = document.getElementById("b");
const btn = document.getElementById("btn");
const fundoDia = "bg_d.png";
const fundoNoite = "bg_noite.png";
const toggle = document.getElementById("toggleTema");
let horas = 0;

const estados = {
    normal:  "b_n.png",
    puto: "b_b.png",
    morto: "b_morto.png",
    comendo: "b_come.png",
    alimentado: "b_f.png",
}

let contador = 0; 
let intervalo = null;
let time_click = null;
let time_out = null;

function controlador (){
    if(intervalo) clearInterval(intervalo)
        
        intervalo = setInterval(() => {
            contador++;

            console.log("tempo:",contador);
            
            if (contador == 30){
                cria.src = estados.puto;
            }

            if(contador == 60){
                cria.src = estados.morto;
            }
        }, 1000);
}

function alimentar (){

    cria.src = estados.comendo
    contador = 0;
    console.log("comeu");

    if(time_click) clearInterval(time_click) 

    time_click = setTimeout( () => {
        cria.src = estados.alimentado;
        time_out = setTimeout (() => {
            cria.src = estados.normal;
        },2000);
    },1000);
}

function atualizarFundo() {
    if (horas) clearInterval(horas);

    horas = setInterval(() => {
    horas++;
    
    if (horas >= 12) {
        document.body.style.backgroundImage = `url('${fundoNoite}')`;
    } else {
        document.body.style.backgroundImage = `url('${fundoDia}')`;
    }
    if(horas >=24) horas =0;

    }, 2000);
}

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        horas = 12; 
    } else {
        horas = 0; 
    }
});

controlador();
atualizarFundo();