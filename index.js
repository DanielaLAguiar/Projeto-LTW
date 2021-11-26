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

classificacao.onclick=this.showClassificacao.bind(this);
instrucoes.onclick=this.showInstrucoes.bind(this);
iniciarJogo.onclick=this.IniciarJogo.bind(this);
desistir.onclick=this.terminarJogo.bind(this);

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
}

function login() {  
  const name=document.getElementById("autenticacao").elements["name"].value;  
  const password=document.getElementById("autenticacao").elements["password"].value;  
    if (name=="Daniela" && password=="123"){
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

function IniciarJogo() {
    const jogo = new Jogo(nCavidades.valueAsNumber, nSementes.valueAsNumber);
    jogo.setTabuleiro();
    comandos.style.display="none";
    configuracao.style.display="none";
    tabuleiro.style.display="flex";
    estado.style.display="block";
    terminar.style.display="none";
}

function terminarJogo() {
    terminar.style.display="block";
    comandos.style.display="block";
    configuracao.style.display="block";
    estado.style.display="none";
    tabuleiro.style.display="none";
  tabuleiro.innerHTML="";
}