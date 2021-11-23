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