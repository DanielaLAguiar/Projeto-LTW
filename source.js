const comandos=document.getElementById("comandos");
const configuracao=document.getElementById("configuracao");
const autenticacao=document.getElementById("autenticacao");
const terminar=document.getElementById("terminar");
const classificacao=document.getElementById("classificacao");
const instrucoes=document.getElementById("instrucoes");
const nCavidades=document.getElementById("cavidades");
const nSementes=document.getElementById("sementes");
const inicio=document.getElementById("inicio");
const iniciarJogo=document.getElementById("jogar");
const desistir=document.getElementById("desistir");
const tabuleiro=document.getElementById("tabuleiro");
const estado=document.getElementById("estado");
const pontos1=document.getElementById("pontos1");
const pontos2=document.getElementById("pontos2");
const msgVitoria=document.getElementById("vitoria");
const msgDerrota=document.getElementById("derrota");
const cavidadesJogo=document.getElementsByClassName("cavidades");
const feij=document.createElement('span');
const classificacaoText=document.getElementById("popClassificacao");
feij.className='peca';

const pvp=document.getElementById("pvp");
let nome, password;
let game, eventSrc, opponent, multiplayerStatus, leaveButton;
let users = [];

class User {
  constructor(username, pps) {
    this.username=username;
    this.pps=pps;
  }
}

let mancala;

classificacao.onclick=this.showClassificacao.bind(this);
instrucoes.onclick=this.showInstrucoes.bind(this);
iniciarJogo.onclick=this.IniciarJogo.bind(this);
desistir.onclick=this.terminarJogo.bind(this);



async function newUser() {
  nome=document.getElementById("autenticacao").elements["name"].value;  
  password=document.getElementById("autenticacao").elements["password"].value; 
  let req = register(nome,password);
  if (req.ok) {
		let data = await req.json();
		game = data.game;
	}

  let thisUser = new User(nome, password);
  users.push(thisUser);
  login();
}

function login() {  
  nome=document.getElementById("autenticacao").elements["name"].value;  
  password=document.getElementById("autenticacao").elements["password"].value; 
  for(let i=0; i<users.length; i++) {
    if (nome==users[i].username && password==users[i].pps){
      comandos.style.display="block";
      configuracao.style.display="block";
      autenticacao.style.display="none";
      const node = document.createTextNode("Bem vindx " + users[i].username + "! " + "\u2665");
      const logoutButton = document.getElementById("logout");
      logoutButton.parentNode.insertBefore(node,logoutButton);
      terminar.style.display="block";
      return;
    }
  }
    alert("Login invalido!");
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

var move_string=function(n, color) {
  let feijtemp=feij.cloneNode();
  feijtemp.style.backgroundColor=color;
  cavidadesJogo[n].appendChild(feijtemp);
}

var string_out=function(i, replay) {
  let n=cavidadesJogo[i].children.length;
  cavidadesJogo[i].innerHTML="";
  
  for(let j=1; j<=n; j++) {
    if(i+j*2==cavidadesJogo.length) {
      setTimeout(move_string, 250*j, cavidadesJogo.length-1);
      if(j==n) {
        replay=true;
      }
      j++;
      var temp=cavidadesJogo.length-3;
      while(temp>=1 && j<=n) {
        setTimeout(move_string, 250*j, temp);
        temp-=2;
        j++;
      }
      if(temp<1 && j<=n){
        n-=j;
        j=0;
        setTimeout(move_string, 250*j, 2);
      }
    }
    else {
      setTimeout(move_string, 250*j, i+j*2);
    }
    if(j==n) {
      if(cavidadesJogo[i+j*2].children.length==0) {
        let cj=cavidadesJogo[i+j*2-1].children.length;
        cavidadesJogo[i+j*2].innerHTML="";
        cavidadesJogo[i+j*2-1].innerHTML="";
        for(let h=0; h<=cj; h++) {
          setTimeout(move_string, 250*j*h, cavidadesJogo.length-1);
        }
        break;
      }
    }
  }
            
  const armazem2=document.getElementById("armazem2");
  let pontosJogador1=armazem2.children.length;
  pontos1.innerHTML="N??mero de sementes no armazem do Jogador 1: " + pontosJogador1.toString(10);
  const armazem1=document.getElementById("armazem1");
  let pontosJogador2=armazem1.children.length;
  pontos2.innerHTML="N??mero de sementes no armazem do Jogador 2: " + pontosJogador2.toString(10);
            
  for(let k=2; k<cavidadesJogo.length;k+=2) {
    if(cavidadesJogo[k].children.length!=0)
      break;
    if(k==cavidadesJogo.length-2 && Number(pontosJogador1)>Number(pontosJogador2)) {
      vitoria(pontosJogador1, pontosJogador2);
    }
  }
            
  if(replay==false) {
    setTimeout(jogadaIA, 2000);
  }
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
        let feijtemp=feij.cloneNode();
        if(i%2==0) {
          feijtemp.style.backgroundColor="darkred";
        }
        else {
          cav.id="meuLado";
        }
        cav.appendChild(feijtemp); 
      }
    }
    tabuleiro.appendChild(arm2);
  }
         
  play() {
      for(let i=2; i<cavidadesJogo.length; i+=2) {
         let replay=false; 
         cavidadesJogo[i].onclick=function() {
           setTimeout(string_out,150,i,replay);
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
    if(pvp.value=="Jogador") {
      setUpMultiplayer(nCavidades.valueAsNumber, nSementes.valueAsNumber);
    }
    else if(pvp.value=="Computador") {
      if(inicio.value=="Advers??rio") {
        setTimeout(jogadaIA(), 250);
      }
      jogo.play();
    } 
}

function vitoria(pontos1, pontos2) {
  tabuleiro.style.display="none";
  estado.style.display="none";
  msgVitoria.style.display="block";
  let text=document.createTextNode("VITORIA! Jogador 1: " + pontos1.toString(10) +" Jogador 2: " + pontos2.toString(10));
  classificacaoText.appendChild(text);
  msgVitoria.onclick=this.terminarJogo.bind(this);
  
}

function derrota(pontos1, pontos2) {
  tabuleiro.style.display="none";
  estado.style.display="none";
  msgDerrota.style.display="block";
  let text=document.createTextNode("DERROTA! Jogador 1: " + pontos1.toString(10) +" Jogador 2: " + pontos2.toString(10));
  classificacaoText.appendChild(text);
  msgDerrota.onclick=this.terminarJogo.bind(this);
}

function terminarJogo() {
    terminar.style.display="block";
    comandos.style.display="block";
    configuracao.style.display="block";
    estado.style.display="none";
    tabuleiro.style.display="none";
    tabuleiro.innerHTML="";
    msgVitoria.style.display="none";
    msgDerrota.style.display="none";
}

function jogadaIA() {
  let possiveis=new Array();
  for(let i=1; i<cavidadesJogo.length-1;i+=2) {
    if(cavidadesJogo[i].children.length!=0)
      possiveis.push(i);
  }
  
  const random=Math.floor(Math.random() * possiveis.length);
  const escolha=possiveis[random];
  let n=cavidadesJogo[escolha].children.length;
  cavidadesJogo[escolha].innerHTML="";
  let color="darkred";
  
  for(let j=1; j<=n; j++) {
   if(escolha-j*2<=0) {
      setTimeout(move_string, 250*j, 0, color);
      j++;
      var temp=2;
      while(temp<cavidadesJogo.length && j<=n) {
        setTimeout(move_string, 250*j, temp, color);
        temp+=2;
        j++;
      }
      if(temp>=cavidadesJogo.length && j<=n){
         n-=j;
         j=0;
         setTimeout(move_string, 250*j, cavidadesJogo.length-3, color);
      }
    }
    else {
      setTimeout(move_string, 250*j, escolha-j*2, color);
    }
    if(j==n) {
      if(cavidadesJogo[escolha-j*2].children.length==0) {
        cavidadesJogo[escolha-j*2].innerHTML="";
        let cj=cavidadesJogo[escolha-j*2+1].children.length;
        cavidadesJogo[escolha-j*2+1].innerHTML="";
        for(let h=0; h<=cj; h++) {
          setTimeout(move_string, 250*j, 0, color);
        }
        break;
      }
   }
  }
  
  const armazem2=document.getElementById("armazem2");
  let pontosJogador1=armazem2.children.length;
  pontos1.innerHTML="N??mero de sementes no armazem do Jogador 1: " + pontosJogador1.toString(10);
  const armazem1=document.getElementById("armazem1");
  let pontosJogador2=armazem1.children.length;
  pontos2.innerHTML="N??mero de sementes no armazem do Jogador 2: " + pontosJogador2.toString(10);
  
  for(let k=1; k<cavidadesJogo.length;k+=2) {
    if(cavidadesJogo[k].children.length!=0)
        break;
    if(k==cavidadesJogo.length-3 && Number(pontosJogador1)<=Number(pontosJogador2)) {
        derrota(pontosJogador1, pontosJogador2);
    }
  }
}

async function setUpMultiplayer(nCavidades, nSementes) {
	let req = await join(nome, password, nCavidades, nSementes);
	if (req.ok) {
		let data = await req.json();
		game = data.game;
		multiplayerStatus.textContent = "?? espera de advers??rio";
		eventSrc = await update(nome, game, serverUpdate, serverError);
	} else {
		alert("Ocorreu um erro ao criar o jogo");
	}
}

async function serverUpdate(e) {
	let data = JSON.parse(e.data);
	if (data.vencedor !== undefined) {
		if (data.vencedor === null) {
			if (data.tabuleiro !== undefined) empate();
			else setTimeout(() => alert("Interrompido"), 500);
		}
		else if (data.vencedor === nome)
			vitoria()
		else if (data.vencedor === opponent)
			derrota()
		multiplayerStatus.parentNode.removeChild(multiplayerStatus);
		leaveButton.parentNode.removeChild(leaveButton);
		multiplayerStatus = undefined;
		leaveButton = undefined;
		game = undefined;
		opponent = undefined;
		eventSrc.close();
		eventSrc = undefined;
	}
	else {
		//Jogar 
	}
}

async function serverError() {
	game = undefined;
	opponent = undefined;
	leftGame = false;
	eventSrc.close()
	eventSrc = undefined;
	alert("Something went wrong");
}

async function notifyServer(i) {
	let req = await notify(nome, password, game, i);
	if (!req.ok) {
		alert("Something went wrong");
	}
}