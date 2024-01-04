
/*$('#recipeCarousel').carousel({
    interval: 10000
  })
  
  $('.carousel .carousel-item').each(function(){
      var minPerSlide = 3;
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
              next = $(this).siblings(':first');
            }
          
          next.children(':first-child').clone().appendTo($(this));
        }
  }); */

  // script dos itens
  var titulo = "";

  function pegaTitulo(){
     titulo = document.getElementById("nome_tarefa").value
  }

  function registrarInput() {
    // Obter o valor do input
    var inputValue = document.getElementById("itens_tarefa").value;

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
}