const conversionFactors = {
  length: {
      "Mètre": 1, "Kilomètre": 0.001, "Centimètre": 100, "Millimètre": 1000,
      "Pied": 3.28084, "Pouce": 39.3701
  },
  weight: {
      "Kilogramme": 1, "Gramme": 1000, "Livre": 2.20462, "Once": 35.274
  },
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  speed: {
      "M/s": 1, "Km/h": 3.6, "Mph": 2.23694
  },
  time: {
      "Seconde": 1, "Minute": 1/60, "Heure": 1/3600, "Jour": 1/86400
  }
};

document.getElementById("category").addEventListener("change", updateUnits);
updateUnits();

function updateUnits() {
  let category = document.getElementById("category").value;
  let fromUnit = document.getElementById("fromUnit");
  let toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  if (category === "temperature") {
      conversionFactors.temperature.forEach(unit => {
          fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
          toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
      });
  } else {
      Object.keys(conversionFactors[category]).forEach(unit => {
          fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
          toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
      });
  }
}

function convert() {
  let category = document.getElementById("category").value;
  let inputValue = parseFloat(document.getElementById("inputValue").value);
  let fromUnit = document.getElementById("fromUnit").value;
  let toUnit = document.getElementById("toUnit").value;

  if (isNaN(inputValue)) {
      document.getElementById("result").innerText = "Veuillez entrer une valeur valide.";
      return;
  }

  let result;
  if (category === "temperature") {
      result = convertTemperature(inputValue, fromUnit, toUnit);
  } else {
      result = inputValue * conversionFactors[category][toUnit] / conversionFactors[category][fromUnit];
  }

  document.getElementById("result").innerText = `Résultat : ${formatNumber(result)}`;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === "Celsius") return to === "Fahrenheit" ? value * 9/5 + 32 : value + 273.15;
  if (from === "Fahrenheit") return to === "Celsius" ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
  if (from === "Kelvin") return to === "Celsius" ? value - 273.15 : (value - 273.15) * 9/5 + 32;
}

function formatNumber(num) {
  return Number.isInteger(num) ? num : num.toFixed(2).replace(/\.?0+$/, "");
}