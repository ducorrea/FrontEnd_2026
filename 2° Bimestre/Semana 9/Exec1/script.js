function validarCPF() {

      let cpf = document.getElementById("cpf").value;
      const resultado = document.getElementById("resultado");
      let soma = 0;

      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
      }

      let digito1 = (soma * 10) % 11;

      if (digito1 === 10) {
        digito1 = 0;
      }

      soma = 0;

      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
      }

      let digito2 = (soma * 10) % 11;

      if (digito2 === 10) {
        digito2 = 0;
      }

      if (
        digito1 == cpf[9] &&
        digito2 == cpf[10]
      ) {
        resultado.innerHTML = "valido!";
        resultado.className = "valido";
      } else {
        resultado.innerHTML = "invalido!";
        resultado.className = "invalido";
      }
    }