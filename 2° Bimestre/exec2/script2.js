const celsius = document.getElementById("celsius");
    const fahrenheit = document.getElementById("fahrenheit");

    celsius.addEventListener("input", () => {

      if (celsius.value === "") {
        fahrenheit.value = "";
        return;
      }

      let f = (parseFloat(celsius.value) * 9/5) + 32;

      fahrenheit.value = f.toFixed(2);
    });

    fahrenheit.addEventListener("input", () => {

      if (fahrenheit.value === "") {
        celsius.value = "";
        return;
      }

      let c = (parseFloat(fahrenheit.value) - 32) * 5/9;

      celsius.value = c.toFixed(2);
    });