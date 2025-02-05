const conversionFactors = {
    length: {
        "Meter": 1, "Kilometer": 0.001, "Centimeter": 100, "Millimeter": 1000,
        "Foot": 3.28084, "Inch": 39.3701
    },
    weight: {
        "Kilogram": 1, "Gram": 1000, "Pound": 2.20462, "Ounce": 35.274
    },
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    speed: {
        "M/s": 1, "Km/h": 3.6, "Mph": 2.23694
    },
    time: {
        "Second": 1, "Minute": 1/60, "Hour": 1/3600, "Day": 1/86400
    }
};

// Activer la catégorie par défaut "Length" au lancement
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.category-btn[data-category="length"]').classList.add("active");
    updateUnits("length");
});

// Gestion des boutons de catégories
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        updateUnits(this.dataset.category);
    });
});

function updateUnits(category) {
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

    performConversion();
}

// Conversion en temps réel
document.getElementById("inputValue").addEventListener("input", performConversion);
document.getElementById("fromUnit").addEventListener("change", performConversion);
document.getElementById("toUnit").addEventListener("change", performConversion);

function performConversion() {
    let category = document.querySelector(".category-btn.active").dataset.category;
    let inputValue = parseFloat(document.getElementById("inputValue").value);
    let fromUnit = document.getElementById("fromUnit").value;
    let toUnit = document.getElementById("toUnit").value;

    if (isNaN(inputValue)) {
        document.getElementById("result").innerText = "--";
        return;
    }

    let result;
    if (category === "temperature") {
        result = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
        result = inputValue * conversionFactors[category][toUnit] / conversionFactors[category][fromUnit];
    }

    document.getElementById("result").innerText = formatNumber(result);
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    if (from === "Celsius") return to === "Fahrenheit" ? value * 9/5 + 32 : value + 273.15;
    if (from === "Fahrenheit") return to === "Celsius" ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
    if (from === "Kelvin") return to === "Celsius" ? value - 273.15 : (value - 273.15) * 9/5 + 32;
}

function formatNumber(num) {
    if (Number.isInteger(num)) return num;
    let formatted = num.toFixed(3).replace(/\.?0+$/, "");
    return formatted;
}
