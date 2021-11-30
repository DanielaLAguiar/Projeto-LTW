const comandos=document.getElementById("comandos");
const configuracao=document.getElementById("configuracao");
const autenticacao=document.getElementById("autenticacao");
const terminar=document.getElementById("terminar");
const classificacao=document.getElementById("classificacao");
const instrucoes=document.getElementById("instrucoes");
const nCavidades=document.getElementById("cavidades");
const nSementes=document.getElementById("sementes");
const iniciarJogo=document.getElementById("jogar");
const desistir=document.getElementById("desistir");
const tabuleiro=document.getElementById("tabuleiro");
const estado=document.getElementById("estado");
const pontos1=document.getElementById("pontos1");
const pontos2=document.getElementById("pontos2");
const msgVitoria=document.getElementById("vitoria");
const cavidadesJogo=document.getElementsByClassName("cavidades");
const feij=document.createElement('span');
feij.className='peca';

classificacao.onclick=this.showClassificacao.bind(this);
instrucoes.onclick=this.showInstrucoes.bind(this);
iniciarJogo.onclick=this.IniciarJogo.bind(this);
desistir.onclick=this.terminarJogo.bind(this);


function login() {  
  const name=document.getElementById("autenticacao").elements["name"].value;  
  const password=document.getElementById("autenticacao").elements["password"].value;  
    if (name=="" && password==""){
        comandos.style.display="block";
        configuracao.style.display="block";
        autenticacao.style.display="none";
        const node = document.createTextNode("Bem vindx " + name + "! " + "\u2665");
        const logout = document.getElementById("logout");
        terminar.insertBefore(node,logout);
        terminar.style.display="block";
    }
    else {
      alert("Login invalido!");
    } 
}

function logout() {
    comandos.style.display="none";
    configuracao.style.display="none";
    autenticacao.style.display="block";
    terminar.style.display="none";
    terminar.innerHTML="<input type='button' id='logout' value='Logout' onclick='logout()'>";
    autenticacao.reset();
}

function showClassificacao() {
    const classificacaoText=document.getElementById("popClassificacao");
  if(classificacaoText.style.display=="inline")
    classificacaoText.style.display="none";
  else
    classificacaoText.style.display="inline"; 
}

function showInstrucoes() {
  const instrucoesText=document.getElementById("popInstrucoes");
  if(instrucoesText.style.display=="inline")
    instrucoesText.style.display="none";
  else
    instrucoesText.style.display="inline"; 
}

class Jogo {
  constructor(cavidades, sementes) {
    this.cavidades=cavidades;
    this.sementes=sementes;
  }
  
  setTabuleiro() {
    const arm1=document.createElement('div');
    const arm2=document.createElement('div');
    const feij=document.createElement('span');
    arm1.className='cavidades';
    arm2.className='cavidades';
    arm1.id="armazem1";
    arm2.id="armazem2";
    feij.className='peca';
    tabuleiro.appendChild(arm1);
    for(let i=0; i<Number(this.cavidades)*2; i++) {
      let cav=document.createElement('div');
      cav.className='cavidades';
      tabuleiro.appendChild(cav);
      for(let j=0; j<Number(this.sementes);j++) {
        cav.appendChild(feij.cloneNode());
      }
    }
    tabuleiro.appendChild(arm2);
  }
    play() {
      for(let i=2; i<cavidadesJogo.length; i+=2) {
         let replay=false;
          cavidadesJogo[i].onclick=function() {
            let n=cavidadesJogo[i].children.length;
            cavidadesJogo[i].innerHTML="";
            for(let j=1; j<=n; j++) {
              if(i+j*2==cavidadesJogo.length) {
                cavidadesJogo[cavidadesJogo.length-1].appendChild(feij.cloneNode());
                if(j==n) {
                  replay=true;
                }
                j++;
                var temp=cavidadesJogo.length-3;
                while(temp>=1 && j<=n) {
                  cavidadesJogo[temp].appendChild(feij.cloneNode());
                  temp-=2;
                  j++;
                }
                if(temp<1 && j<=n){
                  n-=j;
                  j=0;
                  cavidadesJogo[2].appendChild(feij.cloneNode());
                  }
                }
              else {
                cavidadesJogo[i+j*2].appendChild(feij.cloneNode());
              } 
              
              if(j==n) {
                if(cavidadesJogo[i+j*2].children.length==1) {
                  cavidadesJogo[i+j*2].innerHTML="";
                  let cj=cavidadesJogo[i+j*2-1].children.length;
                  cavidadesJogo[i+j*2-1].innerHTML="";
                  for(let h=0; h<=cj; h++) {
                    cavidadesJogo[cavidadesJogo.length-1].appendChild(feij.cloneNode());
                  }
                }
              }
            }
            
            const armazem2=document.getElementById("armazem2");
            const armazem1=document.getElementById("armazem1");
            let pontosJogador1=armazem2.children.length;
            let pontosJogador2=armazem1.children.length;
            pontos1.innerHTML="Número de sementes no armazem do Jogador 1: " + pontosJogador1.toString(10);
            pontos2.innerHTML="Número de sementes no armazem do Jogador 2: " + pontosJogador2.toString(10);
            
            for(let k=2; k<cavidadesJogo.length;k+=2) {
              if(cavidadesJogo[k].children.length!=0)
                break;
              if(k==cavidadesJogo.length-2 && Number(pontosJogador1)>Number(pontosJogador2)) {
                vitoria();
              }
            }
            
            if(replay==false) {
              console.log("my turn");
            }
        }
     }
  }
  
  showPontuacao() {
    const armazem2=document.getElementById("armazem2");
    let pontosJogador1=armazem2.children.length;
  }
}

function IniciarJogo() {
    const jogo = new Jogo(nCavidades.valueAsNumber, nSementes.valueAsNumber);
    jogo.setTabuleiro();
    comandos.style.display="none";
    configuracao.style.display="none";
    tabuleiro.style.display="flex";
    estado.style.display="block";
    terminar.style.display="none";
    jogo.play();
}

function vitoria() {
  tabuleiro.style.display="none";
  estado.style.display="none";
  msgVitoria.style.display="block";
  msgVitoria.onclick=this.terminarJogo.bind(this);
}

function terminarJogo() {
    terminar.style.display="block";
    comandos.style.display="block";
    configuracao.style.display="block";
    estado.style.display="none";
    tabuleiro.style.display="none";
    tabuleiro.innerHTML="";
    msgVitoria.style.display="none";
}