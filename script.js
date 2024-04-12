const tempo = document.getElementById('tempo');
const marcacao = document.getElementById('marcacoes');
let interval = 0;
let timer = 0;
let marks = [];

const formatarTempo = (time) => {
    const horas = Math.floor(time/360000);
    const minutos = Math.floor((time%360000)/6000);
    const segundos = Math.floor((time%6000)/100);
    const hundredths = time%100;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
    
}

const addMarkToList = (marcarIndex, marcarTempo) =>{
    marcacao.innerHTML += `<p>Marca ${marcarIndex}: ${formatarTempo(marcarTempo)}</p>`
}

const marcarTempo = () =>{
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

const CronometrarTempo = () => {
    const button = document.getElementById('play');
    const action = button.getAttribute('action');

    clearInterval(interval);

    if(action == "start" || action =="continue"){
        interval = setInterval(() => {
            timer += 1;
            setTimer(timer)
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if(action == 'pause'){
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const resetarTempo = () =>{
    clearInterval(interval);
    timer = 0;
    marks = 0;
    setTimer(timer);
    marcacao.innerHTML = '';
    const button = document.getElementById('play');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';

}

const setTimer = (time) => {
    tempo.innerText = formatarTempo(time);
}

document.getElementById('play').addEventListener('click', CronometrarTempo);
document.getElementById('mark').addEventListener('click', marcarTempo);
document.getElementById('reset').addEventListener('click', resetarTempo);