const botao = document.getElementById("calcular");

    botao.addEventListener("click", () => {

      const nome = document.getElementById("nome").value;

      const nota1 = Number(document.getElementById("nota1").value);
      const nota2 = Number(document.getElementById("nota2").value);
      const nota3 = Number(document.getElementById("nota3").value);

      const resultado = document.getElementById("resultado");

      const media = (nota1 + nota2 + nota3) / 3;

      if (media >= 7 && media <= 10) {

        resultado.innerHTML =
          `${nome} Aprovado!<br>Media: ${media.toFixed(2)}`;

        resultado.className = "aprovado";

      } else if (media >= 4 && media < 7) {

        const falta = 10 - media;

        resultado.innerHTML =
          `${nome} Exame!<br>
          Media: ${media.toFixed(2)}<br>
          Faltam ${falta.toFixed(2)} pontos para chegar em 10.`;

        resultado.className = "exame";

      } else {

        resultado.innerHTML =
          `${nome} reprovado!<br>Media: ${media.toFixed(2)}`;

        resultado.className = "reprovado";
      }

    });