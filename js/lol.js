//document es el pretotipo que contiene el DOM (Document Object Model)
//console.log(document);

const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

div_gwen.onclick = () => {
    console.log("click en gwen");
}