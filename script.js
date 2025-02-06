const conversionFactors =
{
  length:
  {
    "m": 1, "km": 0.001, "cm": 100, "mm": 1000,
    "ft": 3.28084, "in": 39.3701
  },
  weight:
  {
    "kg": 1, "g": 1000, "lb": 2.20462, "oz": 35.274
  },
  temperature:
  [
    "°C", "°F", "°K"
  ],
  speed:
  {
    "m/s": 1, "mm/h": 3.6, "mph": 2.23694
  },
  time:
  {
    "s": 1, "min": 1 / 60, "h": 1 / 3600, "day": 1 / 86400
  }
};

// Activer la catégorie par défaut "Length" au lancement
document.addEventListener("DOMContentLoaded", () =>
{
  document.querySelector('.category-btn[data-category="length"]').classList.add("active");
  updateUnits("length");
});

// Gestion des boutons de catégories
document.querySelectorAll(".category-btn").forEach(button =>
{
  button.addEventListener("click", function()
  {
    document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    updateUnits(this.dataset.category);
	});
});

function updateUnits(category)
{
  let fromUnit = document.getElementById("fromUnit");
  let toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  if(category === "temperature")
  {
    conversionFactors.temperature.forEach(unit =>
    {
      fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
      toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
	  });
  }
  else
  {
    Object.keys(conversionFactors[category]).forEach(unit =>
    {
      fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
      toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
	  });
  }

  performConversion();
}

// Conversion en temps réel
document.getElementById("inputValue").addEventListener("input", performConversion);
document.getElementById("fromUnit").addEventListener("change", performConversion);
document.getElementById("toUnit").addEventListener("change", performConversion);

function performConversion()
{
  let category = document.querySelector(".category-btn.active").dataset.category;
  let inputValue = parseFloat(document.getElementById("inputValue").value);
  let fromUnit = document.getElementById("fromUnit").value;
  let toUnit = document.getElementById("toUnit").value;

  if(isNaN(inputValue))
  {
    document.getElementById("result").innerText = "--";
    return;
  }

  let result;
  result = (category === "temperature") ? convertTemperature(inputValue, fromUnit, toUnit) :
                                          inputValue * conversionFactors[category][toUnit] / conversionFactors[category][fromUnit];

  document.getElementById("result").innerText = formatNumber(result);
}

function convertTemperature(value, from, to)
{
  switch(from)
  {
    case "°C":
      return (to === "°F") ? value*(9/5) + 32 : value + 273.15;
    case "°F":
      return (to === "°C") ? (value-32)*(5/9) : (value-32)*(5/9) + 273.15;
    case "°K":
      return (to === "°C") ? value-273.15 : (value-273.15)*(9/5) + 32;
    default:
      return value;
  }
}

function formatNumber(num)
{
  if (Number.isInteger(num)) return num;
  let formatted = num.toFixed(3).replace(/\.?0+$/, "");
  return formatted;
}