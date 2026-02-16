//document es el pretotipo que contiene el DOM (Document Object Model)
//console.log(document);

const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

div_gwen.onclick = () => {
    div_gwen.innerHTML = "Gwen";
}