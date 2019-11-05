//BARI Ayoub / GHOUDAN Ayoub / B21

var tempScore, SCORE_MAX=100, activeP, start;
var tab = [0,0];
var newe = document.querySelector(".btn-new");
var lance = document.querySelector(".btn-lancer");
var pass = document.querySelector(".btn-passe");
var dee=document.querySelector(".de");
var scorej0=document.getElementById("score-0");
var scorej1=document.getElementById("score-1");
var nomj0=document.getElementById('nom-0');
var nomj1= document.getElementById('nom-1');


function init() {
    tempScore = 0;
    activeP = 0;
    start = true;
    tab = [0,0];


    scorej0.textContent = "0";
    scorej1.textContent = "0";
    document.getElementById('courent-0').textContent = "0";
    document.getElementById('courent-1').textContent = "0";
    nomj0.textContent = "joueur 1";
    nomj1.textContent = "joueur 2";
    document.querySelector('.panel-joueur-0').classList.remove('vainqueur');
    document.querySelector('.panel-joueur-1').classList.remove('vainqueur');
    document.querySelector('.panel-joueur-0').classList.remove('actif');
    document.querySelector('.panel-joueur-1').classList.remove('actif');
    document.querySelector('.panel-joueur-0').classList.add('actif');
    dee.style.display='none';

}

function lancer(){
    
    if (start) {
        var de1 = Math.floor((Math.random() * 6)+1);
        dee.style.display = 'block';
        dee.src = 'de-' + de1 + '.png';

        if (de1 !== 1 ) {
            tempScore += de1;
            console.log(de1);
            document.getElementById('courent-'+activeP).textContent = tempScore;
            tab[activeP] += parseInt(tempScore);
            console.log(" loll : "+activeP+" tet : "+tab[activeP]);
             if (tab[activeP] >= SCORE_MAX){
                document.querySelector('#nom-'+activeP).textContent = 'vainqueur';
                dee.style.display = 'none';
                
                document.querySelector('.panel-joueur-'+activeP).classList.add('vainqueur');
                document.querySelector('.panel-joueur-'+activeP).classList.remove('actif');
                document.getElementById('score-'+activeP).textContent  = "100";
                document.getElementById('courent-'+activeP).textContent = "0";
                lance.style.display='none';
                pass.style.display='none';
                game = false;
            
            }
        } else {

            document.getElementById('score-'+activeP).textContent  = tab[activeP];
            joueurSuivant();
            tempScore=0;
        }

}}

function joueurSuivant(){
    
    document.getElementById('score-'+activeP).textContent  = tab[activeP];
    activeP === 0 ? activeP = 1 : activeP = 0;

    document.getElementById('courent-0').textContent = '0';
    document.getElementById('courent-1').textContent = '0';
    document.querySelector('.panel-joueur-0').classList.toggle('actif');
    document.querySelector('.panel-joueur-1').classList.toggle('actif');
    dee.style.display = 'none';
}

newe.addEventListener("click",init);
lance.addEventListener("click",lancer);
pass.addEventListener("click",joueurSuivant);