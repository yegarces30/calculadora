/*
Se crea el objeto calculadora y de desarrolla bajo el patron Modular
*/
var calculadora = (function() {

    var operandos = [];
    var operaciones = [];
    var esOperacion = false;
    var usaPunto = false;
    var usaSigno = false;
    var esResultado = false


/*
La función obtenerNumero permite conocer el valor mostrado en pantalla
*/
    var obtenerNumero = function(){
        var campo = document.getElementById('display');
        return campo.innerHTML;
    };

/*
La función establecerNumero permite asignar un nuevo valor al campo mostrado en pantalla
*/
    var establecerNumero = function(texto){
      var campo = document.getElementById('display');
      campo.innerHTML = texto;
    };

/*
La función limpiarPantalla vuelve todas las variables en cero y limpia el campo mostrado en pantalla
mostrando el valor de 0
*/
    var limpiarPantalla = function() {
        operandos = [];
        operaciones = [];
        esOperacion = false;
        usaPunto = false;
        usaSigno = false;
        esResultado = false;
        establecerNumero("0");
    };

/*
La función mostrarNumero permite mostrar en pantalla el valor digitado haciendo clic en los botones numéricos
*/
    var mostrarNumero = function(numero) {
      var num = obtenerNumero();
      console.log("numero-------------: "+num);

        if(esResultado == true){
          establecerNumero("0");
          console.log("se metiooo");
        }
        var num = obtenerNumero();
        console.log("numero: "+num);
        esResultado = false;

        var num = obtenerNumero();
        console.log("numero: "+num);
        if (num.length <= 7){
          if(esOperacion == true || num == "0"){
              num = ""
          }
          num += numero;
          establecerNumero(num);
        }
        esOperacion = false;
    };

/*
la función guardarOperacion permite guardar la operación realizada teniendo en cuenta la suma, resta, multiplicación y división.
*/
    var guardarOperacion = function(operador) {
      esResultado = false;
      var numero =  obtenerNumero();

      numero = quitarPunto(numero);

      if(esOperacion == true){
        operaciones[operaciones.length-1] = operador;
      }else{
        console.log("validando número: "+numero);
        operandos.push(parseFloat(numero));
        operaciones.push(operador);
        esOperacion = true;
        console.log("Es operación");
      }
      usaPunto = false;
      usaSigno = false;
    };

/*
La función mostrarPunto permite ver en pantalla el punto decimal, siempre y cuando no lo tenga.
*/
     var mostrarPunto = function() {
       if(esResultado == true || esOperacion == true){
         establecerNumero("0");
         esResultado = false;
       }

       if(usaPunto == false){
          var numero = obtenerNumero();
          numero += ".";
         establecerNumero(numero);
         usaPunto = true;
         esOperacion = false;
       }

    };

/*La función mostrarSigno permite asignar el signo negativo a un valor o quitarlo*/
    var mostrarSigno = function(){
      if(esResultado == true){
        establecerNumero("0");
      }

      var numero = obtenerNumero();
      if(numero != "0"){
        if(usaSigno == true){
          var arreglo = numero.split("");
          arreglo.shift();
          numero = "";
          for (numero of arreglo) {
            numero += numero;
          }

          usaSigno = false;
        }else{
          if(numero.length < 7){
            numero = "-" + numero;
            usaSigno = true;
          }
        }
        establecerNumero(numero);
      }
    };

/*
la funcion operar realiza las operaciones aritmeticas y devuelve el resultado
*/

    var operar = function(valor1,valor2,operacion){
      var resultado = 0;
      console.log("recibe operación: " + operacion);
      console.log("n1: "+valor1);
      console.log("n2: "+valor2);
      switch (operacion) {
        case "mas":
          resultado = valor1+valor2;
          console.log("+");
          break;
        case "menos":
          resultado = valor1-valor2;
          console.log("-");
          break;
        case "por":
          resultado = valor1*valor2;
          console.log("*");
          break;
        case "dividido":
          if(valor2 == 0){
            resultado = "ERROR";
          }else{
            resultado = valor1/valor2;
            console.log("/");
          }
          break;
        default:
      }
      return resultado;
    };

/*
la funcion obtenerResultado permite realizar todas las operaciones guardadas.
Esta función se ejecuta al momento de hacer clic en el botón Igual
*/
    var obtenerResultado = function(){
      var numero = obtenerNumero();
      numero = quitarPunto(numero);
      operandos.push(parseFloat(numero));
      var resultado = 0;

      if(operandos.length > 1){
        var numero1 = operandos[0];
        var numero2 = operandos[1];

        resultado = operar(numero1,numero2,operaciones[0]);

        if(resultado != "ERROR"){
            var posOperacion = 1;
            for (var i = 2; i < operandos.length; i++) {
              resultado = operar(resultado,operandos[i],operaciones[posOperacion]);
              posOperacion++;
              if(resultado == "ERROR"){
                break;
              }
            }
        }

      }else{
        resultado = numero;
      }

      limpiarPantalla();
      establecerNumero(resultado.toString().substring(0, 8));
      esResultado = true;
    };

/*
la función quitarPunto remueve el punto decimal cuando este se encuentra al final del número y se desea realizas una operación
*/
    var quitarPunto = function(valor){
      if(usaPunto == true  && valor[valor.length-1] == "."){
        var arreglo = valor.split("");
        arreglo.pop();
        valor = "";
        for (numero of arreglo) {
          valor += numero;
        }
      }
      return valor;
    };

/*
la función obtenerRaizCuadrada permite hacer la operacion Math.sqrt al número mostrado en pantalla
*/
    var obtenerRaizCuadrada = function(){
      var numero = obtenerNumero();
      numero = quitarPunto(numero);
      var respuesta = Math.sqrt(parseFloat(numero));
      if(respuesta.toString() == "NaN"){
        respuesta = "ERROR";
      }
      establecerNumero(respuesta);
    };

/*
Permite asignar los eventos a todos los botones de la calculadora.
Esta función se ejecuta al cargar la página
*/
    var init = function(){

      var listId = [
      "0",
      "1", "2", "3",
      "4", "5", "6",
      "7", "8", "9"];

      for (let id of listId) {
        document.getElementById(id).addEventListener('click', function () {
          mostrarNumero(id);
        });
      }

      listId = ["mas","menos","por","dividido"];
      for (let id of listId) {
        document.getElementById(id).addEventListener('click', function () {
          guardarOperacion(id);
        });

      }

      document.getElementById("on").addEventListener('click', function () {
        limpiarPantalla();
      });

      document.getElementById("punto").addEventListener('click', function () {
        mostrarPunto();
      });

      document.getElementById("sign").addEventListener('click', function () {
        mostrarSigno();
      });

      document.getElementById("igual").addEventListener('click', function () {
        obtenerResultado();
      });

      document.getElementById("raiz").addEventListener('click', function () {
        obtenerRaizCuadrada();
      });


    };

    return {
        limpiarPantalla: limpiarPantalla,
        mostrarNumero: mostrarNumero,
        guardarOperacion: guardarOperacion,
        obtenerNumero : obtenerNumero,
        establecerNumero : establecerNumero,
        mostrarPunto : mostrarPunto,
        init : init,
        operar:operar,
        obtenerResultado:obtenerResultado,
        quitarPunto:quitarPunto,
        obtenerRaizCuadrada:obtenerRaizCuadrada

    };

})();
