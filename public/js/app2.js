
/*script do texto automático */
var texto_saida = document.getElementById('texto_saida')
var texto_entrada =document.getElementById('texto_entrada').value//"BEM VINDO AO TASK DAY!"
texto_automatico(texto_entrada,texto_saida)
function texto_automatico(texto,saida){

const velocidade = 70; // Velocidade da digitação em milissegundos
let index = 0;
const textContainer = saida

function typeWriter() {
  textContainer.innerHTML += texto.charAt(index);
  index++;

  if (index < texto.length) {
    setTimeout(typeWriter, velocidade);
  }
}

// Iniciar o efeito de digitação quando a página carregar
window.onload = function () {
  typeWriter();
};
}
//===========================

/* script dos cards
let currentIndex = 0;
    const cardContainer = document.getElementById('cardContainer');
    const cards = document.querySelectorAll('.cardC');

    function showCard(index) {
        const newPosition = -index * (cards[0].offsetWidth + 10);
        cardContainer.style.transform = `translateX(${newPosition}px)`;
    }

    setInterval(nextCard, 3500); */// Auto avanço a cada 3 segundos

//=======================================

  //script dos itens
  var titulo = "";

  function pegaTitulo(){
     titulo = document.getElementById("nome_tarefa").value

     if(titulo==undefined || titulo==null || titulo==""){
      document.getElementById("aviso-div").style="display:block";
      titulo = "Sem Titulo Definido"
     
     }else{
      document.getElementById("aviso-div").style="display:none";
     }
  }

  /*function registrarInput() {
    // Obter o valor do input
    var inputValue = document.getElementById("itens_tarefa").value;

    if(inputValue == undefined || inputValue == null || inputValue ==""){
      document.getElementById("aviso-itens").style="display:block";
      return false
    }
    document.getElementById("aviso-itens").style="display:none";

    // Criar um novo elemento de lista
    var newItem = document.createElement("option");

    // Definir o texto do novo item com o valor do input
    newItem.appendChild(document.createTextNode(inputValue));

    // Adicionar o novo item à lista
    document.getElementById("divp").style="display:block"
    document.getElementById("tituloTarefa").value = titulo ;
    document.getElementById("itensadicionado").appendChild(newItem);
    

    // Limpar o input
    document.getElementById("itens_tarefa").value = "";
  }*/

function registrarInput() {
  //Obter o valor do input
  const inputValue = document.getElementById('itens_tarefa').value;
  //var inputValue = document.getElementById("itens_tarefa").value;

  if(inputValue == undefined || inputValue == null || inputValue ==""){
    document.getElementById("aviso-itens").style="display:block";
    return false
  }
  document.getElementById("aviso-itens").style="display:none";

  // Verificar se o item já está no select
  const selectItems = document.getElementById('itensadicionado');
  const options = selectItems.options;
  let i = 0
  
  for (; i < options.length; i++) {
      if (options[i].value === inputValue) {
          alert('Este item já foi adicionado!');
          return;
      }
  }

  
  
  // Adicionar o novo item ao select e selecioná-lo
  document.getElementById("divp").style="display:block"
  document.getElementById("tituloTarefa").value = titulo;
  const newOption = document.createElement('option');
  newOption.value = inputValue;
  newOption.text = inputValue;
  selectItems.add(newOption);
  newOption.selected = true;

  if(options.length<= 1){
    document.getElementById("menosItem").style="display:block"
    document.getElementById('itens_tarefa').value = '';
    return false;
  }else{
    document.getElementById("menosItem").style="display:none"
  }
  // Limpar o campo de texto
  document.getElementById('itens_tarefa').value = '';
}
//========================================================
// multieSelect
var select2 = new MSFmultiSelect(
  document.querySelector('#multiselect'),
  {
    theme: 'theme2',
    selectAll: true,
    searchBox: true,
    width: '250px',
    height: '45px',
    // readOnly: true,
    onChange:function(checked, value, instance) {
      const selectItems = document.getElementById('itensadicionado');
      const options = selectItems.options;

      if(options.length <=1){
        document.getElementById("menosItem").style="display:block"

      }
      document.getElementById("menosItem").style="display:none"
      console.log(checked, value, instance);
    },
    // appendTo: '#myselect',
    //readOnly:true,
    //autoHide: false
  }
);
//================