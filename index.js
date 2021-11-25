const comandos=document.getElementById("comandos");
const configuracao=document.getElementById("configuracao");
const autenticacao=document.getElementById("autenticacao");
const terminar=document.getElementById("terminar");

function validateForm() {  
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

function IniciarJogo() {
    const tabuleiro = document.getElementById("tabuleiro");
    const jogar = document.getElementById("jogar");
    if (tabuleiro.style.display === "") {
        tabuleiro.style.display = "flex";
        jogar.style.background = "bisque";
    }
    else if (tabuleiro.style.display === "flex") {
        tabuleiro.style.display = "";
        jogar.style.background = "linen";
    }
}

function getVal() {
    const inputCavidades = document.getElementById("cavidades");
    let nCavidades;
    nCavidades = inputCavidades.valueAsNumber;
  
    let text = "<div class=cavidades id=armazem1></div>";
    for (let i=0; i<nCavidades*2; i++) {
      text+="<div class=cavidades> </div>";
    }
    text += "<div class=cavidades id=armazem1></div>";
  
    document.getElementById("tabuleiro").innerHTML = text;
}