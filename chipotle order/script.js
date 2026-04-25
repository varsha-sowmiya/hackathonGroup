let order = {
  base: "",
  rice: "",
  protein: "",
  veggies: [],
  toppings: []
};

// helper to toggle active class
function setupSection(sectionId, isMulti = false) {
  const section = document.getElementById(sectionId);
  if(!section) return;
 
  const buttons = section.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      if (!isMulti) {
        // Multi Select
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        order[sectionId] = btn.innerText;
      } else {
        btn.classList.toggle("active");
      
        // Ensure array exists
        if(!Array.isArray(order[sectionId])) {
          order[sectionId] = [];
        }

        if (btn.classList.contains("active")){
          if (order.veggies.length>1){
            btn.classList.remove("active");
            return;
          }

        }else{
          order.veggies=order.veggies.filter(item => item !== btn.innerText);
          
        }

        if (btn.classList.contains("active")){
          if (order.toppings.length>1){
            btn.classList.remove("active");
            return;
          }

        }else{
          order.toppings=order.toppings.filter(item => item !== btn.innerText);
          
        }
        if (btn.classList.contains("active")) {
          order[sectionId].push(btn.innerText);
        } else {
          order[sectionId] = order[sectionId].filter(item => item !== btn.innerText);
        }
      }

    });
  });
}

// setup sections
setupSection("base");
setupSection("rice");
setupSection("protein");
setupSection("veggies",true);
setupSection("toppings",true);

// generate code like B-WR-CK-T3
function generateCode() {
  let baseMap = {
    "Bowl": "B",
    "Burrito": "BR",
    "Tacos": "T",
    "Salad": "S"
  };

  let riceMap = {
    "White": "W",
    "Brown": "BRW",
    "Both": "BW",
    "None": "N"
  };

  let proteinMap = {
    "Chicken": "CK",
    "Steak": "ST",
    "Carnitas": "CA",
    "Barbacoa": "BA",
    "Sofritas": "SO",
    "Salmon": "SA"
  };

  let veggieMap = {
    "Black Beans": "BB",
    "Pinto Beans": "PB",
    "Fajita Veggies": "FV",
    "Guacamole": "GU",
    "Lettuce": "L",
    "Tomato": "TO",
    "Corn": "C"
  }
  let baseCode = baseMap[order.base] || "X";
  let riceCode = riceMap[order.rice] || "X";
  let proteinCode = proteinMap[order.protein] || "X";
  
  let veggieCode =
      order.veggies.length > 0
        ? order.veggies.map(v => veggieMap[v] || "X").join("") :"X";

  let toppingsCode = 
    order.toppings.length > 0
    ? "T" + order.toppings.length : "TO";

  let finalCode = `${baseCode}-${riceCode}-${proteinCode}-${veggieCode}-${toppingsCode}`;

  document.getElementById("output").innerText = "Your Code: " + finalCode;
}

// reset
function clearOrder() {
  order = { base: "", rice: "", protein: "", veggies: [], toppings: [] };

  document.querySelectorAll("button").forEach(b => {
    b.classList.remove("active");
  });

  document.getElementById("output").innerText = "Your Code: ---";
}