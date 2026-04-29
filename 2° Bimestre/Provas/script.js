function mostrarImagem() {
    var div = document.getElementById("resultado");

    var img = document.createElement("img");
    img.src = "Tabela_Jogos.png"; 
    img.width = 500;

    div.appendChild(img);
}
