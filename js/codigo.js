window.addEventListener("load", inicio);

//Variable global para guardar el local o la persona logueada (objeto)
let localLogueado = null;
let personaLogueada = null;

//OBJETOS
//Defino el id de locales en 1
let idLocal = 1;

//Defino el objeto Local
class Local {
  constructor(unNombre, unNombreUsuario, unaContrasenia, unTipoDeLocal, unaDireccion, unCupoMaximo, unCupoRestante, unaFoto, unEstado, unLogo) {
    this.id = idLocal;
    this.nombre = unNombre;
    this.nombreUsuario = unNombreUsuario;
    this.contrasenia = unaContrasenia;
    this.tipoDeLocal = unTipoDeLocal;
    this.direccion = unaDireccion;
    this.cupoMaximo = unCupoMaximo;
    this.cuposRestantes = unCupoRestante;
    this.foto = unaFoto;
    this.estado = unEstado;
    this.logo = unLogo;
    idLocal++;
  }
}

//Defino el id de personas en 1
let idPersona = 1;

//Defino el objeto Persona
class Persona {
  constructor(unNombre, unNombreUsuario, unaContrasenia) {
    this.id = idPersona;
    this.nombre = unNombre;
    this.nombreUsuario = unNombreUsuario;
    this.contrasenia = unaContrasenia;
    this.imagenUsuario = "../img/user.svg";
    idPersona++;
  }
}

//Defino el contador de reservas en 1
let contadorReservas = 1;

//Defino el objeto Reserva
class Reserva {
  constructor(unNombreCliente, unUsuarioCliente, unNombreLocal, unEstado, unaCantidadDeCuposAReservar,unaCalificacion) {
    this.contador = contadorReservas;
    this.nombreCliente = unNombreCliente;
    this.usuarioCliente = unUsuarioCliente;
    this.nombreLocal = unNombreLocal;
    this.estado = unEstado;
    this.cantidadDeCuposAReservar = unaCantidadDeCuposAReservar;
    this.calificacion=unaCalificacion;
    contadorReservas++;
  }
}

//Defino el objeto Local favorito como ayuda para calcular el local con más reservas del cliente
class LocalFavorito {
  constructor(unNombre, unaCantidadDeReservas) {
    this.nombre = unNombre;
    this.cantidadDeReservas = unaCantidadDeReservas;
  }
}


function inicio() {
  //Precargamos los datos (de los objetos)
  precargarDatos();

  //Ocultamos todos los divs
  ocultarTodo();

  //Mostramos la pantalla de inicio
  mostrarAlInicio();

  //Escuchamos botones (eventos de click)
  escucharBotones();
}

//Funcion que oculta todo
function ocultarTodo() {
  ocultarMenuLogIn();
  ocultarMenuLogOut();
  ocultarMenuLocales();
  ocultarMenuPersonas();
  ocultarMenusArriba();
  ocultarBuscador();
  ocultarDivInicioSesionLocales();
  ocultarDivRegistroPersonas();
  ocultarDivInicioSesionPersonas();
  ocultarDivEstadoLocal();
  ocultarDivCupoMaximoLocal();
  ocultarDivDisponibilidadLocal();
  ocultarDivEstadisticaLocalInformacion();
  ocultarDivEstadisticaLocalListadoDeLocales();
  ocultarDivReservasPersonasSolicitarReservas();
  ocultarDivReservasPersonasReservasPendientes();
  ocultarDivReservasPersonasReservasFinalizadas();
  ocultarDivEstadiscticaPersonasPorcentajeDeReservas();
  ocultarDivEstadiscticaPersonasLocalConMasReservas();
}

//Funcion que muestra la pantalla de inicio (Inicio Sesion - Locales)
function mostrarAlInicio() {
  mostrarMenuLogIn();
  mostrarDivInicioSesionLocales();
  //Añadimos la clase activo a locales para que quede seleccionado de entrada (con color celeste)
  document.querySelector("#locales").classList.add("activo");
}

//Funcion que escucha todos los botones
function escucharBotones() {
  //Inicio Sesion Locales
  mostrarInicioSesionLocales();
  //Registro Personas
  mostrarRegistroPersonas();
  //Inicio Sesion Personas
  mostrarInicioSesionPersonas();

  //LOCALES
  mostrarEstadoLocal();
  mostrarCupoMaximoLocal();
  mostrarDisponibilidadLocal();
  //Estadística Locales
  mostrarEstadisticaLocalInformacion();
  mostrarEstadisticaLocalListadoDeLocales();
  //PERSONAS
  //Reservas Personas
  mostrarReservasPersonasSolicitarReservas();
  mostrarReservasPersonasReservasPendientes();
  mostrarReservasPersonasReservasFinalizadas();
  //Estadística Personas
  mostrarEstadiscticaPersonasPorcentajeDeReservas();
  mostrarEstadisticaPersonasLocalConMasReservas();
}

//Funcion que cierra sesion
function logOut() {
  ocultarTodo();
  document.querySelector("#pErroresLoginLocales").innerHTML = "";
  document.querySelector("#pErroresRegistroPersonas").innerHTML = "";
  document.querySelector("#pErroresLoginPersonas").innerHTML = "";
  localLogueado = null;
  personaLogueada = null;
  mostrarAlInicio();
}

//-------- ESCUCHA DE CLICKS DE MOSTRAR Y SU CORRESPONDIENTE DIV --------

//Funcion que escucha los clicks para luego mostrar lo necesario en el inicio sesion de locales
function mostrarInicioSesionLocales() {
  document.querySelector("#locales").addEventListener("click", ocultarTodo);
  document.querySelector("#locales").addEventListener("click", mostrarMenuLogIn);
  document.querySelector("#locales").addEventListener("click", mostrarDivInicioSesionLocales);
  document.querySelector("#cerrarSesion").addEventListener("click", logOut);
  document.querySelector("#btnEntrarLocales").addEventListener("click", levantarDatosLoginLocales);
}

//Funcion que muestra el div inicio sesion de locales
function mostrarDivInicioSesionLocales() {
  //Muestro el div
  document.querySelector("#divInicioSesionLocales").style.display = "block";
  //Añadimos la clase activo a locales para que quede seleccionado de entrada (con color celeste)
  document.querySelector("#locales").classList.add("activo");
  //Y le quitamos (si es que tiene) la clase activo a personas
  document.querySelector("#personas").classList.remove("activo");
}

//Funcion que muestra el div menu de logueo (local o personas)
function mostrarMenuLogIn() {
  document.querySelector("#divMenuLogueoYRegistro").style.display = "block";
}

//Funcion que muestra el div menu de deslogueo (iconito para cerrar sesión)
function mostrarMenuLogOut() {
  document.querySelector("#divMenuCerrarSesion").style.display = "block";
}

//Funcion que escucha los clicks para luego mostrar lo necesario en el registro de personas
function mostrarRegistroPersonas() {
  document.querySelector("#personas").addEventListener("click", ocultarTodo);
  document.querySelector("#cuentaUsuarioRegistro").addEventListener("click", ocultarTodo);
  document.querySelector("#personas").addEventListener("click", mostrarMenuLogIn);
  document.querySelector("#cuentaUsuarioRegistro").addEventListener("click", mostrarMenuLogIn);
  document.querySelector("#personas").addEventListener("click", mostrarDivRegistroPersonas);
  document.querySelector("#cuentaUsuarioRegistro").addEventListener("click", mostrarDivRegistroPersonas);
  document.querySelector("#btnRegistrar").addEventListener("click", levantarDatosRegistroPersonas);
}

//Funcion que muestra el div registro de personas
function mostrarDivRegistroPersonas() {
  document.querySelector("#divRegistroPersonas").style.display = "block";
  //Le quitamos (si es que tiene) la clase activo a locales
  document.querySelector("#locales").classList.remove("activo");
  //Añadimos la clase activo a personas para que quede seleccionado de entrada (con color celeste)
  document.querySelector("#personas").classList.add("activo");
}

//Funcion que escucha los clicks para luego mostrar lo necesario en el inicio sesion de personas
function mostrarInicioSesionPersonas() {
  document.querySelector("#cuentaUsuarioInicioSesion").addEventListener("click", ocultarTodo);
  document.querySelector("#cuentaUsuarioInicioSesion").addEventListener("click", mostrarMenuLogIn);
  document.querySelector("#cuentaUsuarioInicioSesion").addEventListener("click", mostrarDivInicioSesionPersonas);
  document.querySelector("#btnEntrarPersonas").addEventListener("click", levantarDatosLoginPersonas);
}

//Funcion que muestra el div inicio de sesion de las personas
function mostrarDivInicioSesionPersonas() {
  document.querySelector("#divInicioSesionPersonas").style.display = "block";
  document.querySelector("#locales").classList.remove("activo");
  //Añadimos la clase activo a personas para que quede seleccionado de entrada (con color celeste)
  document.querySelector("#personas").classList.add("activo");
}

//Funcion que escucha los clicks para luego mostrar lo necesario en el estado del local
function mostrarEstadoLocal() {
  document.querySelector("#menuEstadoLocales").addEventListener("click", ocultarTodo);
  document.querySelector("#menuEstadoLocales").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#menuEstadoLocales").addEventListener("click", mostrarMenuLocales);
  document.querySelector("#menuEstadoLocales").addEventListener("click", mostrarBuscador);
  document.querySelector("#menuEstadoLocales").addEventListener("click", mostrarDivEstadoLocal);
  document.querySelector("#btnBuscar").addEventListener("click", buscarReserva);
}

//Funcion que muestra el div estado local
function mostrarDivEstadoLocal() {
  document.querySelector("#divEstadoLocal").style.display = "block";
  //Le quitamos (si es que tiene) la clase activo a todos los elementos del menu
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralLocales li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuEstadoLocales").classList.add("activo");  
  mostrarTablaEstadoLocal();
}

//Funcion que muestra el div menu de los locales
function mostrarMenuLocales() {
  document.querySelector(".sidebar").style.display = "block";
  document.querySelector("#menuLateralLocales").style.display = "block";
  document.querySelector("#logoLocal").innerHTML = `<img src="${localLogueado.logo}">`;
  document.querySelector("#nombreLocal").innerHTML = `¡Hola ${localLogueado.nombre}!`;
}

//Funcion que escucha los clicks para luego mostrar lo necesario en el cupo maximo del local
function mostrarCupoMaximoLocal() {
  document.querySelector("#menuCupoMaximoLocales").addEventListener("click", ocultarTodo);
  document.querySelector("#menuCupoMaximoLocales").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#menuCupoMaximoLocales").addEventListener("click", mostrarMenuLocales);
  document.querySelector("#menuCupoMaximoLocales").addEventListener("click", mostrarDivCupoMaximoLocal);
  document.querySelector("#btnModificar").addEventListener("click", cambiarCupoMaximo);
  //Le quitamos (si es que tiene) la clase activo a todos los elementos del menu
  // document.querySelector("#menuLateralLocales li").classList.remove("activo");
}

//Funcion que muestra el div de cupo maximo del local
function mostrarDivCupoMaximoLocal() {
  document.querySelector("#divCupoMaximoLocal").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralLocales li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuCupoMaximoLocales").classList.add("activo");

  mostrarFuncionalidadCupoMaximoLocal();
}

//Funcion que escucha los clicks para luego mostrar lo necesario en la disponibilidad del local
function mostrarDisponibilidadLocal() {
  document.querySelector("#menuDisponibilidadLocales").addEventListener("click", ocultarTodo);
  document.querySelector("#menuDisponibilidadLocales").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#menuDisponibilidadLocales").addEventListener("click", mostrarMenuLocales);
  document.querySelector("#menuDisponibilidadLocales").addEventListener("click", mostrarDivDisponibilidadLocal);
  document.querySelector("#btnHabilitar").addEventListener("click", habilitarDisponibilidad);
  document.querySelector("#btnDeshabilitar").addEventListener("click", deshabilitarDisponibilidad);
}

//Funcion que muestra el div disponibilidad del local
function mostrarDivDisponibilidadLocal() {
  document.querySelector("#divDisponibilidadLocal").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralLocales li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuDisponibilidadLocales").classList.add("activo");

  mostrarFuncionalidadDisponibilidad();
}

//Funcion que escucha los clicks para luego mostrar lo necesario en la estadistica del local informacion
function mostrarEstadisticaLocalInformacion() {
  document.querySelector("#menuEstadisticaLocales").addEventListener("click", ocultarTodo);
  document.querySelector("#informacion").addEventListener("click", ocultarTodo);
  document.querySelector("#menuEstadisticaLocales").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#informacion").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#menuEstadisticaLocales").addEventListener("click", mostrarMenuLocales);
  document.querySelector("#informacion").addEventListener("click", mostrarMenuLocales);
  document.querySelector("#menuEstadisticaLocales").addEventListener("click", mostrarDivEstadisticaLocalInformacion);
  document.querySelector("#informacion").addEventListener("click", mostrarDivEstadisticaLocalInformacion);
}

//Funcion que muestra el div estadistica del local informacion
function mostrarDivEstadisticaLocalInformacion() {
  document.querySelector("#menuArribaEstadisticaLocales").style.display = "block";
  document.querySelector("#informacionEstadisticaLocal").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralLocales li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuEstadisticaLocales").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaEstadisticaLocales li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#informacion").classList.add("activo2");

  mostrarTablaEstadisticaLocalesInformacion();
}

//Funcion que escucha los clicks para luego mostrar lo necesario en la estadistica del local listado de locales
function mostrarEstadisticaLocalListadoDeLocales() {
  document.querySelector("#listadoDeLocales").addEventListener("click", ocultarTodo);
  document.querySelector("#listadoDeLocales").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#listadoDeLocales").addEventListener("click", mostrarMenuLocales);
  document.querySelector("#listadoDeLocales").addEventListener("click", mostrarDivEstadisticaLocalListadoDeLocales);
  document.querySelector("#listadoDeLocales").addEventListener("click", mostrarDivEstadisticaLocalListadoDeLocales);
}

//Funcion que muestra el div estadistica del local listado de locales
function mostrarDivEstadisticaLocalListadoDeLocales() {
  document.querySelector("#menuArribaEstadisticaLocales").style.display = "block";
  document.querySelector("#listadoDeLocalesEstadisticaLocal").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralLocales li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuEstadisticaLocales").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaEstadisticaLocales li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#listadoDeLocales").classList.add("activo2");

  mostrarTablaEstadisticaLocalListadoDeLocales();
}

//RESERVAS PERSONAS
//Funcion que escucha los clicks para luego mostrar lo necesario en las reservas de personas solicitar reservas
function mostrarReservasPersonasSolicitarReservas() {
  document.querySelector("#menuReservaPersonas").addEventListener("click", ocultarTodo);
  document.querySelector("#solicitarReservas").addEventListener("click", ocultarTodo);
  document.querySelector("#menuReservaPersonas").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#solicitarReservas").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#menuReservaPersonas").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#solicitarReservas").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#menuReservaPersonas").addEventListener("click", mostrarDivReservasPersonasSolicitarReservas);
  document.querySelector("#solicitarReservas").addEventListener("click", mostrarDivReservasPersonasSolicitarReservas);
  document.querySelector("#btnSolicitarReserva").addEventListener("click", nuevaReserva);
}

//Funcion que muestra el div reservas personas solicitar reservas
function mostrarDivReservasPersonasSolicitarReservas() {
  document.querySelector("#menuArribaReservasPersonas").style.display = "block";
  document.querySelector("#solicitarReservasPersonas").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralPersonas li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuReservaPersonas").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaReservasPersonas li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#solicitarReservas").classList.add("activo2");
  
  cargarSelectSolicitarReservaPersonas();
}

//Funcion que escucha los clicks para luego mostrar lo necesario en las reservas de personas reservas pendientes
function mostrarReservasPersonasReservasPendientes() {
  document.querySelector("#reservasPendientes").addEventListener("click", ocultarTodo);
  document.querySelector("#reservasPendientes").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#reservasPendientes").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#reservasPendientes").addEventListener("click", mostrarDivReservasPersonasReservasPendientes);
}

//Funcion que muestra el div reservas personas reservas pendientes
function mostrarDivReservasPersonasReservasPendientes() {
  document.querySelector("#menuArribaReservasPersonas").style.display = "block";
  document.querySelector("#reservasPendientesPersonas").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralPersonas li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuReservaPersonas").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaReservasPersonas li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#reservasPendientes").classList.add("activo2");

  mostrarTablaReservasPendientesPersonas();
}

//Funcion que escucha los clicks para luego mostrar lo necesario en las reservas de personas reservas finalizadas
function mostrarReservasPersonasReservasFinalizadas() {
  document.querySelector("#reservasFinalizadas").addEventListener("click", ocultarTodo);
  document.querySelector("#reservasFinalizadas").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#reservasFinalizadas").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#reservasFinalizadas").addEventListener("click", mostrarDivReservasPersonasReservasFinalizadas);
}

//Funcion que muestra el div reservas personas reservas finalizadas
function mostrarDivReservasPersonasReservasFinalizadas() {
  document.querySelector("#menuArribaReservasPersonas").style.display = "block";
  document.querySelector("#reservasFinalizadasPersonas").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralPersonas li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuReservaPersonas").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaReservasPersonas li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#reservasFinalizadas").classList.add("activo2");

  mostrarTablaReservasFinalizadasPersonas();
}

//ESTADISTICA PERSONAS
//Funcion que escucha los clicks para luego mostrar lo necesario en las estadisticas de personas
//por porcentaje de reservas
function mostrarEstadiscticaPersonasPorcentajeDeReservas() {
  document.querySelector("#menuEstadisticaPersonas").addEventListener("click", ocultarTodo);
  document.querySelector("#porcentajeReservas").addEventListener("click", ocultarTodo);
  document.querySelector("#menuEstadisticaPersonas").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#porcentajeReservas").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#menuEstadisticaPersonas").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#porcentajeReservas").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#menuEstadisticaPersonas").addEventListener("click", mostrarDivEstadiscticaPersonasPorcentajeDeReservas);
  document.querySelector("#porcentajeReservas").addEventListener("click", mostrarDivEstadiscticaPersonasPorcentajeDeReservas);
}

//Funcion que muestra el div estadistica personas por porcentaje de reservas
function mostrarDivEstadiscticaPersonasPorcentajeDeReservas() {
  document.querySelector("#menuArribaEstadisticasPersonas").style.display = "block";
  document.querySelector("#porcentajeDeReservasPersonas").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralPersonas li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuEstadisticaPersonas").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaEstadisticasPersonas li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#porcentajeReservas").classList.add("activo2");

  mostrarTablaEstadisticaPersonasPorcentajeDeReservas();
}


//Funcion que escucha los clicks para luego mostrar lo necesario en las estadisticas de personas
//local con mas reservas
function mostrarEstadisticaPersonasLocalConMasReservas() {
  document.querySelector("#localConMasReservasCliente").addEventListener("click", ocultarTodo);
  document.querySelector("#localConMasReservasCliente").addEventListener("click", mostrarMenuLogOut);
  document.querySelector("#localConMasReservasCliente").addEventListener("click", mostrarMenuPersonas);
  document.querySelector("#localConMasReservasCliente").addEventListener("click", mostrarDivEstadisticaPersonasLocalConMasReservas);
}

//Funcion que muestra el div estadistica personas local con mas reservas
function mostrarDivEstadisticaPersonasLocalConMasReservas() {
  document.querySelector("#menuArribaEstadisticasPersonas").style.display = "block";
  document.querySelector("#localConMasReservasPersonas").style.display = "block";
  let arrayElementosMenuLateral = document.querySelectorAll("#menuLateralPersonas li");
  for (let elemento of arrayElementosMenuLateral) {
    elemento.classList.remove("activo");
  }
  document.querySelector("#menuEstadisticaPersonas").classList.add("activo");
  let arrayElementosMenuArriba = document.querySelectorAll("#menuArribaEstadisticasPersonas li");
  for (let elemento of arrayElementosMenuArriba) {
    elemento.classList.remove("activo2");
  }
  document.querySelector("#localConMasReservasCliente").classList.add("activo2");

  mostrarTablaEstadisticaPersonasLocalConMasReservasDelCliente();
}

//Funcion mostrar menu de personas
function mostrarMenuPersonas() {
  document.querySelector(".sidebar").style.display = "block";
  document.querySelector("#menuLateralPersonas").style.display = "block";
  document.querySelector("#logoPersona").innerHTML = `<img src="${personaLogueada.imagenUsuario}">`;
  document.querySelector("#nombrePersona").innerHTML = `¡Hola ${personaLogueada.nombre}!`;
}

//Funcion que muestra el div buscador
function mostrarBuscador() {
  document.querySelector("#buscador").style.display = "block";
}
//-------- HASTA ACA ESCUCHA LOS CLICKS DE MOSTRAR Y SU CORRESPONDIENTE DIV --------

//-------- OCULTA LOS DIVS = display:none --------

//Funcion que oculta el div menu de logueo (local o personas)
function ocultarMenuLogIn() {
  document.querySelector("#divMenuLogueoYRegistro").style.display = "none";
}

//Funcion que oculta el div menu de deslogueo (iconito para cerrar sesión)
function ocultarMenuLogOut() {
  document.querySelector("#divMenuCerrarSesion").style.display = "none";
}

//Funcion que oculta el div menu de los locales
function ocultarMenuLocales() {
  document.querySelector(".sidebar").style.display = "none";
  document.querySelector("#menuLateralLocales").style.display = "none";
}

//Funcion que oculta el div menu de las personas
function ocultarMenuPersonas() {
  document.querySelector(".sidebar").style.display = "none";
  document.querySelector("#menuLateralPersonas").style.display = "none";
}

//Funcion que oculta el div menu de arriba de ciertas secciones
function ocultarMenusArriba() {
  //Uso document.querySelectorAll porque me devuelve un array con TODOS los elementos con la clase .menuArriba
  //si usara document.querySelector solo me devolvería el primer objeto que encuentre con esa clase
  let arrayMenusArriba = document.querySelectorAll(".menuArriba");

  for (let menus of arrayMenusArriba) {
    menus.style.display = "none";
  }
}

//Funcion que oculta el div buscador
function ocultarBuscador() {
  document.querySelector("#buscador").style.display = "none";
}

//Funcion que oculta el div inicio sesion de locales
function ocultarDivInicioSesionLocales() {
  document.querySelector("#divInicioSesionLocales").style.display = "none";
}

//Funcion que oculta el div registro de personas
function ocultarDivRegistroPersonas() {
  document.querySelector("#divRegistroPersonas").style.display = "none";
}

//Funcion que oculta el div inicio de sesión de personas
function ocultarDivInicioSesionPersonas() {
  document.querySelector("#divInicioSesionPersonas").style.display = "none";
}

//Funcion que oculta el div estado local
function ocultarDivEstadoLocal() {
  document.querySelector("#divEstadoLocal").style.display = "none";
}

//Funcion que oculta el div cupo maximo del local
function ocultarDivCupoMaximoLocal() {
  document.querySelector("#divCupoMaximoLocal").style.display = "none";
}

//Funcion que oculta el div disponibilidad del local
function ocultarDivDisponibilidadLocal() {
  document.querySelector("#divDisponibilidadLocal").style.display = "none";
}

//Funcion que oculta el div estadistica del local
function ocultarDivEstadisticaLocalInformacion() {
  document.querySelector("#informacionEstadisticaLocal").style.display = "none";
}

//Funcion que oculta el div estadistica del local
function ocultarDivEstadisticaLocalListadoDeLocales() {
  document.querySelector("#listadoDeLocalesEstadisticaLocal").style.display = "none";
}

//Funcion que oculta el div reservas de las personas
function ocultarDivReservasPersonasSolicitarReservas() {
  document.querySelector("#solicitarReservasPersonas").style.display = "none";
}

//Funcion que oculta el div reservas de las personas
function ocultarDivReservasPersonasReservasPendientes() {
  document.querySelector("#reservasPendientesPersonas").style.display = "none";
}

//Funcion que oculta el div reservas de las personas
function ocultarDivReservasPersonasReservasFinalizadas() {
  document.querySelector("#reservasFinalizadasPersonas").style.display = "none";
}

function ocultarDivEstadiscticaPersonasPorcentajeDeReservas() {
  document.querySelector("#porcentajeDeReservasPersonas").style.display = "none";
}

function ocultarDivEstadiscticaPersonasLocalConMasReservas() {
  document.querySelector("#localConMasReservasPersonas").style.display = "none";
}
//-------- HASTA ACA OCULTA LOS DIVS --------

//------ FUNCION QUE PRECARGA LOS DATOS ------
function precargarDatos() {
  //LOCALES
  //Restaurantes
  agregarLocalPrecargado("McDonald's", "mcdonalds", "mc123", "Restaurante", "Av. Luis Alberto de Herrera 1534", 100, 100, "../imagenesObligatorio/foto6.jpg", "Habilitado", "../img/logoMcDonalds.svg");
  agregarLocalPrecargado("Burger King", "burgerking", "bk123", "Restaurante", "Plácido Ellauri 3494", 150, 150, "../imagenesObligatorio/foto5.jpg", "Habilitado", "../img/logoBurgerKing.svg");
  agregarLocalPrecargado("Subway", "subway", "subway123", "Restaurante", "Av. Luis Alberto de Herrera 1290", 70, 70, "../imagenesObligatorio/foto4.jpg", "Habilitado", "../img/logoSubway.svg");
  //Museos
  agregarLocalPrecargado("Museo Figari", "mfigari", "mfigari123", "Museo", "Juan Carlos Gómez 1427", 200, 200, "../imagenesObligatorio/foto2.jpg", "Habilitado", "../img/logoMuseoFigari.svg");
  agregarLocalPrecargado("Museo Zorrilla", "mzorrilla", "mzorrilla123", "Museo", "José Luis Zorrilla de San Martín 96", 250, 250, "../imagenesObligatorio/foto10.jpg", "Habilitado", "../img/logoMuseoZorrilla.svg");
  //Teatros
  agregarLocalPrecargado("Teatro Solís", "tsolis", "tsolis123", "Teatro", "Buenos Aires esq. Bartolomé Miter", 300, 300, "../imagenesObligatorio/foto1.jpg", "Habilitado", "../img/logoTeatroSolis.svg");
  agregarLocalPrecargado("Teatro Sodre", "tsodre", "tsodre123", "Teatro", "Andes esquina Mercedes", 250, 250, "../imagenesObligatorio/foto3.jpg", "Habilitado", "../img/logoTeatroSodre.png");

  //PERSONAS
  agregarPersonaPrecargada("Lola", "lola23", "Lola123");
  agregarPersonaPrecargada("Yordi", "yordi", "Yordi123");
  agregarPersonaPrecargada("Roberto", "rober", "Rober123");
  agregarPersonaPrecargada("Jorge", "jorgito", "Jorgito123");
  agregarPersonaPrecargada("Marta", "martita", "Martita123");
  agregarPersonaPrecargada("Julian", "julian1", "Julian123");
  agregarPersonaPrecargada("Lucas", "lukita", "Lukita123");
  agregarPersonaPrecargada("Pepito", "pepe", "Pepe123");

  //RESERVAS
  agregarReservaPrecargada("Lola","lola23", "McDonald's", "Pendiente", 30, 0);
  agregarReservaPrecargada("Roberto","rober", "McDonald's", "Pendiente", 4, 0);
  agregarReservaPrecargada("Lola","lola23", "Subway", "Finalizada", 10, 5);
  agregarReservaPrecargada("Lola","lola23", "Museo Figari", "Finalizada", 6, 2);
  agregarReservaPrecargada("Marta","martita", "Subway", "Finalizada", 2, 5);
  agregarReservaPrecargada("Lola","lola23", "Subway", "Finalizada", 5, 1);
  agregarReservaPrecargada("Roberto","rober", "Teatro Solís", "Pendiente", 35, 0);
  agregarReservaPrecargada("Roberto","rober", "Teatro Sodre", "Finalizada", 35, 4);
  agregarReservaPrecargada("Julian","julian1", "Burger King", "Pendiente", 1, 0);
  agregarReservaPrecargada("Lucas","lukita", "Museo Figari", "Pendiente", 7, 0);
  agregarReservaPrecargada("Pepito","pepe", "Museo Zorrilla", "Cancelada", 54, 0);
}

//ARRAYS
//Array de Locales
let listaLocales = new Array();

//Array de Personas
let listaPersonas = new Array();

//Array de Reservas
let listaReservas = new Array();

console.log(listaLocales)

// Funcion agregar locales precargados
function agregarLocalPrecargado(nombreLocal, nombreUsuarioLocal, contraseniaLocal, tipoDeLocal, direccionLocal, cupoMaximoLocal, cupoRestante, fotoLocal, estadoLocal, logoLocal) {
  let unLocal = new Local(nombreLocal, nombreUsuarioLocal, contraseniaLocal, tipoDeLocal, direccionLocal, cupoMaximoLocal, cupoRestante, fotoLocal, estadoLocal, logoLocal);
  // Agregamos el objeto local al Array de locales
  listaLocales.push(unLocal);
}

// Funcion agregar personas precargadas
function agregarPersonaPrecargada(nombrePersona, nombreUsuarioPersona, contraseniaPersona) {
  let unaPersona = new Persona(nombrePersona, nombreUsuarioPersona, contraseniaPersona);
  // Agregamos el objeto persona al Array de personas
  listaPersonas.push(unaPersona);
}

// Funcion agregar reservas precargadas
function agregarReservaPrecargada(nombrePersona, nombreUsuarioPersona, nombreLocal, estado, cantidadDeCuposAReservar, calificacion) {
  let unaReserva = new Reserva(nombrePersona, nombreUsuarioPersona, nombreLocal, estado, cantidadDeCuposAReservar, calificacion);
  // Agregamos el objeto reservas al Array de reservas
  listaReservas.push(unaReserva);
}

//LOGIN LOCAL
//Funcion que levanta los datos del login de locales
function levantarDatosLoginLocales() {
  //Levanto datos del formulario de Locales
  let usernameLocal = document.querySelector("#txtNombreUsuario").value;
  let passwordLocal = document.querySelector("#txtContrasenia").value;

  //Paso la contraseña a minúscula para que coincida siempre me la ingrese en mayus o no
  passwordLocal = passwordLocal.toLowerCase();

  //Voy a la funcion que valida los datos
  validarDatosLoginLocal(usernameLocal, passwordLocal);
}

function validarDatosLoginLocal(username, password) {
  //Para cada local del array de locales
  for (let locales of listaLocales) {
    if (username == locales.nombreUsuario && password == locales.contrasenia) {
      //Guardo el objeto local que se logueó
      localLogueado = locales;
      //Oculto todo y muestro la pantalla principal --> Estado Local
      ocultarTodo();
      mostrarMenuLogOut();
      mostrarMenuLocales();
      mostrarBuscador();
      mostrarDivEstadoLocal();
    } else {
      document.querySelector("#pErroresLoginLocales").innerHTML = "El usuario y/o contraseña es incorrecto";
    }
  }
}

//REGISTRO PERSONA
//Funcion que levanta los datos del registro de personas
function levantarDatosRegistroPersonas() {
  //Levanto datos del formulario de Registro Personas
  let namePersona = document.querySelector("#txtNombrePersona").value;
  let usernamePersona = document.querySelector("#txtNombreUsuarioPersonasRegistro").value;
  let passwordPersona = document.querySelector("#txtContraseniaPersonasRegistro").value;
  
  //Paso el usuario de la persona a minúsculas
  usernamePersona = usernamePersona.toLowerCase();

  let contraseniaNoEsValida = validarContraseniaPersona(passwordPersona);

  let datosPersonaCorrectos = validarDatosRegistroPersonas(usernamePersona, contraseniaNoEsValida, passwordPersona);

  if (datosPersonaCorrectos) {
    agregarNuevaPersona(namePersona, usernamePersona, passwordPersona);
  }
}

//Función validar datos de la persona
function validarDatosRegistroPersonas(usernamePersona, contraseniaNoEsValida, contraseniaPersona) {
  let datosCorrectos = false;
  let existe = false;
  
  //Para cada persona del array de Personas
  for (let personas of listaPersonas) {
    //Paso a minúscula y comparo para ver si existe
    if (personas.nombreUsuario.toLowerCase() == usernamePersona.toLowerCase()) {
      existe = true;
      document.querySelector("#pErroresRegistroPersonas").innerHTML = "Ya está registrado";
      //alert(existe);
    }
  }
  //Si no existe el usuario y la contraseña cumple con los requisitos, tira mensaje de registro correcto
  if (!existe && contraseniaNoEsValida == false) {
    limpiaColoresDeErrorContrasenia();
    document.querySelector("#pErroresRegistroPersonas").innerHTML = "Se registró correctamente";
    datosCorrectos = true;
    //Si existe el usuario y la contraseña no es válida, tira mensaje de error
  } else if (!existe && contraseniaNoEsValida) {
    mostrarErroresContrasenia(contraseniaPersona);
    document.querySelector("#pErroresRegistroPersonas").innerHTML = "La contraseña debe cumplir con los requisitos";
  }

  return datosCorrectos;
}

// Funcion que valida la contraseña ingresada
function validarContraseniaPersona(contrasenia) {
  if (tieneNumeros(contrasenia) == true && tieneMayuscula(contrasenia) == true && tieneMinuscula(contrasenia) == true && cantidadDeCaracteresOK(contrasenia) == true) {
    return false;
  } else {
    return true;
  }
}

//Busco en la tabla ASCII si tiene numeros
function tieneNumeros(contrasenia) {
  for (i = 0; i < contrasenia.length; i++) {
    if (contrasenia.charCodeAt(i) >= 48 && contrasenia.charCodeAt(i) <= 57) {
      return true;
    }
  }
  return false;
}

//Busco en la tabla ASCII si tiene mayusculas
function tieneMayuscula(contrasenia) {
  for (i = 0; i < contrasenia.length; i++) {
    if (contrasenia.charCodeAt(i) >= 65 && contrasenia.charCodeAt(i) <= 90) {
      return true;
    }
  }
  return false;
}

//Busco en la tabla ASCII si tiene minusculas
function tieneMinuscula(contrasenia) {
  for (i = 0; i < contrasenia.length; i++) {
    if (contrasenia.charCodeAt(i) >= 97 && contrasenia.charCodeAt(i) <= 122) {
      return true;
    }
  }
  return false;
}

//Ver si tiene 6 caracteres o más
function cantidadDeCaracteresOK(contrasenia) {
  if (contrasenia.length >= 6) {
    return true;
  }
  return false;
}

// Funcion agregar personas nuevas (con el registro)
function agregarNuevaPersona(nombrePersona, nombreUsuarioPersona, contraseniaPersona) {
  let unaPersona = new Persona(nombrePersona, nombreUsuarioPersona, contraseniaPersona);
  // Agregamos el objeto persona al Array de personas
  listaPersonas.push(unaPersona);

  limpiaColoresDeErrorContrasenia();
}

// Funcion que muestra los errores (si es que los tiene) de la contraseña
function mostrarErroresContrasenia(contrasenia) {
  limpiaColoresDeErrorContrasenia();

  //Muestra los errores en rojo
  if (tieneNumeros(contrasenia) == false) {
    document.querySelector("#liUnNumero").style.color = "#ff0000";
  }
  if (tieneMayuscula(contrasenia) == false) {
    document.querySelector("#liUnaMayus").style.color = "#ff0000";
  }
  if (tieneMinuscula(contrasenia) == false) {
    document.querySelector("#liUnaMinus").style.color = "#ff0000";
  }
  if (cantidadDeCaracteresOK(contrasenia) == false) {
    document.querySelector("#liSeisCaracteres").style.color = "#ff0000";
  }
}

// Funcion que vuelve los colores de los errores de la contraseña al color original
function limpiaColoresDeErrorContrasenia() {
  let lista = document.querySelector("#listaRequisitos");
  let colorListaOriginal = lista.style.color;

  //Le saco el atributo style para luego darles el color que tenian
  document.querySelector("#liSeisCaracteres").removeAttribute("style");
  document.querySelector("#liUnNumero").removeAttribute("style");
  document.querySelector("#liUnaMayus").removeAttribute("style");
  document.querySelector("#liUnaMinus").removeAttribute("style");
  //Devolver el color original a la lista (que no quede en rojo)
  document.querySelector("#liSeisCaracteres").style.color = colorListaOriginal;
  document.querySelector("#liUnNumero").style.color = colorListaOriginal;
  document.querySelector("#liUnaMayus").style.color = colorListaOriginal;
  document.querySelector("#liUnaMinus").style.color = colorListaOriginal;
}

function levantarDatosLoginPersonas() {
  //Levanto datos del formulario de Personas
  let usernamePersona = document.querySelector("#nombreUsuarioPersonas").value;
  let passwordPersona = document.querySelector("#contraseniaPersonas").value;

  //Paso el usuario de la persona a minúsculas
  usernamePersona = usernamePersona.toLowerCase();

  //Voy a la funcion que valida los datos
  validarDatosLoginPersonas(usernamePersona, passwordPersona);
}

function validarDatosLoginPersonas(username, password) {
  //Para cada persona del array de personas
  for (let personas of listaPersonas) {
    if (username == personas.nombreUsuario && password == personas.contrasenia) {
      personaLogueada = personas;
      //Oculto todo y muestro la pantalla principal --> Reservas Personas
      ocultarTodo();
      mostrarMenuLogOut();
      mostrarMenuPersonas();
      mostrarDivReservasPersonasSolicitarReservas();
    } else {
      document.querySelector("#pErroresLoginPersonas").innerHTML = "El usuario y/o contraseña es incorrecto";
    }
  }
}

//FUNCIONES DE LOCALES
//Estado del local
function mostrarTablaEstadoLocal() {
  let contadorReservasPorLocal = 0;
  //Cabezal de la tabla
  let miTabla = `<thead>
                  <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Estado de la reserva</th>
                  <th>Cambiar estado</th>
                  </tr>
                <thead>`;

    //Hago un for común para poder guardarme la posición              
    for (let pos=0; pos<listaReservas.length; pos++){
      let objReserva = listaReservas[pos];
      //si el local logueado es igual al nombre del local en la lista de locales, y el estado es pendiente
      //sumo 1 al contar de reservas por local
      if (localLogueado.nombre == objReserva.nombreLocal && objReserva.estado == "Pendiente") {
        contadorReservasPorLocal++;

        //armo el cuerpo de la tabla
        miTabla+=`<tbody>
                    <tr>
                    <td>${contadorReservasPorLocal}</td>
                    <td>${objReserva.nombreCliente}</td>
                    <td>${objReserva.estado}</td>
                    <td> <input type="button" value="Cambiar" class="redondear botonAccionCambiar" id="boton${pos}"> </td>
                    </tr>
                  </tbody>`
      }
      
    }
    //muestro la tabla            
    document.querySelector("#tablaEstadoLocal").innerHTML = miTabla;

    //TIRA EL ERROR SI NO HAY RESERVAS PENDIENTES
    if (contadorReservasPorLocal == 0) {
      document.querySelector("#tablaEstadoLocal").innerHTML = "";
      document.querySelector("#pMensajesEstadoLocal").innerHTML = "No hay reservas en estado pendiente para mostrar"; 
    }
            
    //ASIGNACIÓN DE EVENTOS A TODOS LOS BOTONES QUE TENGAN LA CLASE botonAccionCambiar
    let listaInputs = document.getElementsByClassName("botonAccionCambiar");
    
    //cambia a estado finalizada la reserva en la que hago click en el botón cambiar
    for (let unInput of listaInputs){
      unInput.addEventListener("click", accionBotonCambiarEstado);
    }
}

//Función para cambiar el estado de una reserva a finalizada
function accionBotonCambiarEstado(){
  let cualFueElIdDelBoton = this.id; //me guardo el id del boton clickeado
  let posicion = Number(cualFueElIdDelBoton.substring(5)); //me quedo solo con el numero del texto y lo paso a numero
  let objetoReserva = listaReservas[posicion]; //me traigo el objeto auto según posicion
  objetoReserva.estado="Finalizada";

  mostrarTablaEstadoLocal();
}

//FUNCION BUSCADOR DE RESERVAS - LOCAL
function buscarReserva(){
  // recojo el texto ingresado por el usuario
  let filtro=document.querySelector("#txtBuscador").value;
  
  // se limpia la tabla
  let miTabla="";

  // armo el cabezal de la tabla
  miTabla += `<thead>
                <th> # </th>
                <th> Cliente </th>
                <th> Estado de la reserva </th>
                <th> Cambiar estado </th>
              </thead>`;
  // recorro la lista de reservas
  for (let reservas of listaReservas){
      // paso el filtro y el nombre del cliente en el objeto a minuscula
      let nombreClienteMinuscula= reservas.nombreCliente.toLowerCase();
      let filtroMinuscula= filtro.toLowerCase();
  
      //si dentro del filtro esta incluido el nombre del cliente y ademas la reserva esta en estado pendiente
      //y ademas la reserva esta hecha en el local logueado entonces genero la tabla con el cliente encontrado 
      if (nombreClienteMinuscula.includes(filtroMinuscula) && reservas.estado == "Pendiente" && reservas.nombreLocal == localLogueado.nombre){
        //limpio los mensajes y el input del buscador
        document.querySelector("#pMensajesEstadoLocal").innerHTML = "";
        document.querySelector("#txtBuscador").value = "";

        //cuerpo de la tabla
        miTabla+=  `<tbody>
                      <tr>
                      <td> ${reservas.contador}</td>
                      <td> ${reservas.nombreCliente}</td>
                      <td> ${reservas.estado}</td>
                      <td> <input type="button" value="Cambiar" class="redondear" onclick=cambiarEstado(${reservas.id})> </td>
                      </tr>
                    </tbody>`
                 
      } //si dejo el buscador vacio que me tire todas las reservas de vuelta
      else if (filtroMinuscula == "" && reservas.estado == "Pendiente" && reservas.nombreLocal == localLogueado.nombre) {
        document.querySelector("#pMensajesEstadoLocal").innerHTML = "";
        document.querySelector("#txtBuscador").value = "";

        miTabla+= `<tbody>
                    <tr>
                    <td> ${reservas.contador}</td>
                    <td> ${reservas.nombreCliente}</td>
                    <td> ${reservas.estado}</td>
                    <td> <input type="button" value="Cambiar" class="redondear" onclick=cambiarEstado(${reservas.id})> </td>
                    </tr>
                  </tbody>`

        //document.querySelector("#pMensajesEstadoLocal").innerHTML = "No hay reservas en estado pendiente para mostrar"; 
      }// y sino tiro un mensaje de error de que no se encontraron reservas pendientes con esa busqueda
      else {
        document.querySelector("#pMensajesEstadoLocal").innerHTML = "";
        document.querySelector("#txtBuscador").value = "";
        //document.querySelector("#pMensajesEstadoLocal").innerHTML = "No hay reservas en estado pendiente para mostrar"; 
      }
  
  } 
  
  // muestro la tabla
  document.querySelector("#tablaEstadoLocal").innerHTML=miTabla;
}

//FUNCION CAMBIAR ESTADO LOCAL 
function cambiarEstado(unID){ 
  //recorro la lista de reservas y guardo el id  
  for (let reservas of listaReservas){
      if (reservas.id == unID){
        //si el estado de la reserva es pendiente, lo cambio a finalizado
          if (reservas.estado =="Pendiente"){
            reservas.estado="Finalizado"
          } 
      }

  }
  buscarReserva();
}

//FUNCION QUE MUESTRA EL PARRAFO CUPO LOCAL
//Cupo Maximo local
function mostrarFuncionalidadCupoMaximoLocal() {
  //recorro el array de locales
  for (let locales of listaLocales) {
    //si el nombre del local logueado matchea con uno de la lista de locales, muestra su cupo máximo actual
    if (localLogueado.nombre == locales.nombre) {
      document.querySelector("#pCupoMaximo").innerHTML = `El cupo máximo del local actualmente es de: ${locales.cupoMaximo}`;
    }
  }
}

//FUNCION QUE CAMBIA EL CUPO MAXIMO LOCAL
function cambiarCupoMaximo() {
  //Capturo datos de formulario
  let cupoMaximoIngresado = document.querySelector("#txtCupoMaximo").value;
  let existenReservasPendientes = false;

  //recorro el array de reservas
  for (let reservas of listaReservas) {
    //encuentra el nombre del local logueado en el array de reservas y busca si tiene reservas pendientes
    if (reservas.nombreLocal == localLogueado.nombre && reservas.estado == "Pendiente") {
      existenReservasPendientes = true;
    }
  }

  //recorro array de locales, si no existen reservas pendientes es posible modificar el 
  //cupo maximo por el valor ingresado por el usuario
  for (let locales of listaLocales) {
    if (!existenReservasPendientes) {
      if (localLogueado.nombre == locales.nombre) {
        locales.cupoMaximo = cupoMaximoIngresado;
        document.querySelector("#pCupoMaximo").innerHTML = `El cupo máximo del local actualmente es de: ${locales.cupoMaximo}`;
      }
      // si el local tiene reservas pendientes no puede modificarlo y muestra un aviso
    } else {
      document.querySelector("#pCupoMaximo").innerHTML = `No se puede modificar porque hay reservas pendientes`;
    }
    
  }
}

//FUNCION QUE MUESTRA EL PARRAFO DE DISPONIBILIDAD DEL LOCAL
//Disponibilidad de locales
function mostrarFuncionalidadDisponibilidad() {
  for (let locales of listaLocales) {
    if (locales.id == localLogueado.id) {
      document.querySelector("#pDisponibilidad").innerHTML = `La disponibilidad de reserva del local está: ${locales.estado}`;
    }
  }
}

//FUNCION QUE DESHABILITA LA DISPONIBILIDAD DEL LOCAL
function deshabilitarDisponibilidad() {
  let disponibilidad = "Deshabilitado";
  for (let locales of listaLocales) {
    if (locales.id == localLogueado.id) {
      locales.estado = disponibilidad;
      document.querySelector("#pDisponibilidad").innerHTML = `La disponibilidad de reserva del local está: ${locales.estado}`;
    }
  }
}

//FUNCION QUE HABILITA LA DISPONIBILIDAD DEL LOCAL
function habilitarDisponibilidad() {
  let disponibilidad = "Habilitado";
  for (let locales of listaLocales) {
    if (locales.id == localLogueado.id) {
      locales.estado = disponibilidad;
      document.querySelector("#pDisponibilidad").innerHTML = `La disponibilidad de reserva del local está: ${locales.estado}`;
    }
  }
}

// TABLA ESTADISTICA LOCALES - INFORMACION
function mostrarTablaEstadisticaLocalesInformacion() {
  let miTabla = "";

  //armo el cabezal
  miTabla += `<thead>
                <th>Reservas pendientes</th>
                <th>Reservas finalizadas</th>
                <th>Total de reservas</th>
                <th>Porcentaje de ocupación</th>
              </thead>`;
  
  //defino contadores para las reservas pendientes, reservas finalizadas, y el total de reservas (para hacer el porcentaje)
  let reservasPendientes = 0;
  let reservasFinalizadas = 0;
  let totalReservas = 0;
  let porcentajeDeOcupacion = 0;

  //recorremos las reservas
  for (let reservas of listaReservas) {
    //si la reserva esta en estado pendiente y ademas es del local logueado
    if(reservas.estado == "Pendiente" && reservas.nombreLocal == localLogueado.nombre ){
      //sumamos una al contador de reservas pendientes
      reservasPendientes++
    }
    //si la reserva esta en estado finalizada y ademas es del local logueado
    if(reservas.estado == "Finalizada" && reservas.nombreLocal == localLogueado.nombre ){
      //sumamos una al contador de reservas finalizadas
      reservasFinalizadas++
    }
    //sumamos las pendientes y las finalizadas para obtener el total de reservas
    totalReservas = reservasFinalizadas + reservasPendientes; 

    //sacamos el porcentaje de ocupacion del local en base al total de reservas
    porcentajeDeOcupacion = Math.round((100*reservasPendientes)/localLogueado.cupoMaximo);
  }

  //armo el cuerpo de la tabla
  miTabla += `<tbody>
                <tr>
                <td>${reservasPendientes}</td>
                <td>${reservasFinalizadas}</td>
                <td>${totalReservas}</td>
                <td>${porcentajeDeOcupacion}%</td>
                </tr>
              <tbody>`

  //muestro la tabla           
  document.querySelector("#tablaInformacionEstadisticaLocal").innerHTML = miTabla;
}

// TABLA ESTADISTICA LOCALES - LISTADO DE LOCALES
function mostrarTablaEstadisticaLocalListadoDeLocales() {
  let miTabla = "";
  
  //armo el cabezal
  miTabla += `<thead>
                <th>Nombre</th>
                <th>Promedio de calificaciones</th>
              </thead>`;

  //armo el cuerpo de la tabla
  //recorro array de locales 
  for (let locales of listaLocales) {
    /* defino contador para la cantidad de calificaciones, una variable para calcular la calificacion promedio,
    y la calificacion total (para hacer el promedio) */
    let calificacionTotal = 0;
    let cantCalificaciones = 0;
    let calificacionPromedio = 0;

    /* dentro del for que recorre los locales recorro array de reservas
    para que por cada local vaya recorriendo todas las reservas */
    for (let reservas of listaReservas) {
      /* si el nombre del local guardado en reservas coincide con el local siendo recorrido y ademas la reserva
      esta en estado finalizado */
      
      // si el nombre del local coincide con el nombre de un local reservado y el estado es finalizada
      //guardo la calificacion y sumo 1 al contador de cantidad de calificaciones 
      if (reservas.nombreLocal == locales.nombre && reservas.estado == "Finalizada") {
        console.log(reservas.estado)
        // la calificacion total es igual a la calificacion total + la calificacion de la reserva
        calificacionTotal = calificacionTotal+reservas.calificacion;
        //sumo 1 al contador de calificaciones
        cantCalificaciones++;
      }
    }
    //si la cantidad de calificaciones es mayor a 0 y ademas la calificacion total es distinta de 0
    if (cantCalificaciones>0 && calificacionTotal!=0 ){
      //si la cantidad de calificaciones es >0 y la sumatoria de calificaciones no es cero
      //calculo el promedio y lo redondeo 

      /* calculo el promedio haciendo la calificacion total, dividido la cantidad de calificaciones
      ademas le dejo un numero despues de la coma */
      calificacionPromedio = (calificacionTotal/cantCalificaciones).toFixed(1);
    }    

    //armo el cuerpo de la tabla con el nombre del local y el promedio de calificación
    miTabla += `<tbody>
                  <td>${locales.nombre}</td>           
                  <td>${calificacionPromedio}</td>
                </tbody>`
    }
  
    //muestro la tabla
    document.querySelector("#tablaListadoDeLocales").innerHTML = miTabla;
}

//Funcion que checkea si el local ya existe en el array auxiliar, y si no existe lo agrega
function estaEnAux (local,arrayAux){
  for (let loc of arrayAux){
    if (loc == local){
      return true
    }
  }
  arrayAux.push(local)
  return false
}

//Función para contar la cantidad de reservas que tiene el usuario logueado en un local
function contarReservasDeUsarioLocal(unLocal){
  let contador = 0;
  for (let reservas of listaReservas){
    if(reservas.nombreLocal == unLocal && reservas.usuarioCliente == personaLogueada.nombreUsuario){
      contador++
    }
  }
  return contador
}

//Función para contar el total de reservas que tiene un local
function contadorTotalResrevasEnUnLocal(unLocal){
  let contador = 0;
  for (let reservas of listaReservas){
    if(reservas.nombreLocal == unLocal){
      contador++
    }
  }
  return contador
}

//Función agregar nueva reserva("nombre","nombre de usuario", "nombre del local", "estado", cupo);
function nuevaReserva() {
  //Asignamos el valor del select (el id de los locales) a la variable localId
  let localId = document.querySelector("#slcSolicitarReservaPersonas").value;
  //Tomamos la cantidad de cupos ingresada por el usuario
  let cupos = document.querySelector("#cuposAReservarPersonas").value;
  let calificacion = 0;

  //Recorro la lista de locales para ver encontrar el local seleccionado
  let localAReservar;
  for (let locales of listaLocales){
    if (locales.id == localId){
      localAReservar = locales;
    }
  }

  //Se verifica si existen reservas pendientes de la persona logueada en ese local
  let existenReservas = false;
  for (let reservas of listaReservas){
    if (reservas.estado == "Pendiente" && reservas.nombreLocal == localAReservar.nombre && reservas.nombreCliente == personaLogueada.nombre){
      console.log(reservas.estado)
      console.log(reservas.nombreLocal)
      console.log(localAReservar.nombre)
      existenReservas = true;
    }
  }
  
  //Se verifica si es posible reservar la cantidad de cupos que el usuario ingresó
  let hayCuposDisponibles = true;
  if (localAReservar.cuposRestantes < cupos){
    hayCuposDisponibles = false;
  }

  //Se verifica si el local está habilitado a recibir reservas
  let localHabilitado = true;
  if (localAReservar.estado == "Deshabilitado") {
    localHabilitado = false;
  }

  // Se verifica que no se deje vacío el campo de cupos
  if (cupos == ""){
    document.querySelector("#pErroresReservasPersonas").innerHTML = "Falta ingresar datos";
    cupos = parseInt(cupos);
    
   //Se avisa a la persona si tiene reservas pendientes  
  } else if (existenReservas == true){
    document.querySelector("#pErroresReservasPersonas").innerHTML = "Ya hay reservas pendientes en ese local";
   
   //Se avisa si no hay cupos disponibles 
  } else if (hayCuposDisponibles == false){
    document.querySelector("#pErroresReservasPersonas").innerHTML = "No hay cupos disponibles en ese local";
    
   //Se avisa si el local está deshabilitado 
  } else if (localHabilitado == false) {
    document.querySelector("#pErroresReservasPersonas").innerHTML = "El local está deshabilitado";
    
  //Si está todo bien, se crea reserva y se restan los cupos solicitados por el usuario de los cupos disponibles del local
  } else {
    localAReservar.cuposRestantes = localAReservar.cuposRestantes - cupos;
    //crear reserva
    let unaReserva = new Reserva(personaLogueada.nombre, personaLogueada.nombreUsuario, localAReservar.nombre, "Pendiente", cupos, calificacion);
    //pushear, agregar la reserva al array
    listaReservas.push(unaReserva);
    document.querySelector("#pErroresReservasPersonas").innerHTML = "La reserva se ingresó correctamente";
    if (localAReservar.cuposRestantes == 0){
      localAReservar.estado = "Deshabilitado";
    }
  }

  console.log(listaReservas);
  
}

// Funcion agregar reservas
function agregarReserva(nombrePersona, nombreUsuarioPersona, nombreLocal, estado, cantidadDeCuposAReservar, calificacion) {
  //Creo la variable para que me muestre true si puedo agregar la reserva y false si no puedo
  let agregoReserva;
  //Llamamos a la funcion que checkea si el usuario ya tiene una reserva pendiente en ese local
  let yaExisteReserva = existeReserva(nombreUsuarioPersona, nombreLocal);
  if (yaExisteReserva) {
    agregoReserva = false; // No la puedo agregar porque ya existe
    document.querySelector("#pErroresReservasPersonas").innerHTML = "Ya tiene una reserva pendiente en este local."
  }
  else {
    console.log("tercero: "+nombreUsuarioPersona);
    let unaReserva = new Reserva(nombrePersona, nombreUsuarioPersona, nombreLocal, estado, cantidadDeCuposAReservar, calificacion);
    // Agregamos la reserva al array de reservas
    listaReservas.push(unaReserva);
    //Se avisa que se ingresó correctamente la reserva
    document.querySelector("#pErroresReservasPersonas").innerHTML = `Se agregó la reserva correctamente en el local ${nombreLocal} con ${cantidadDeCuposAReservar} cupos`

    agregoReserva = true;
  }
 
  return agregoReserva;
}

// Funcion que checkea si el usuario ya tiene una reserva pendiente en ese local
function existeReserva(nombreUsuarioPersona, nombreDelLocal) {
  let existe = false;
  for (let i = 0; i < listaReservas.length && !existe; i++) {
    let objReserva = listaReservas[i];
    if (objReserva.usuarioCliente.toLowerCase() == nombreUsuarioPersona.toLowerCase() && objReserva.nombreLocal.toLowerCase() == nombreDelLocal.toLowerCase()) {
      existe = true;
    }
  }
  return existe;
}

// TABLA ESTADISTICA PERSONAS - LOCAL CON MÁS RESERVAS DEL CLIENTE
function mostrarTablaEstadisticaPersonasLocalConMasReservasDelCliente() {
  let miTabla = "";

  //armo el cabezal
  miTabla = `<thead>
              <th>Local</th>
              <th>Total de reservas</th>
            </thead>`;

  //armo el cuerpo de la tabla
  let localFavorito = new Array();
  let nombreLocalCalculado = new Array();
  let misReservas = 0;

  //Recorro la lista de reservas y la lista de locales
  for (let reservas of listaReservas) {
    let localYaCalculado = false;
    for (let calculados of nombreLocalCalculado) {
      if (calculados.nombre == reservas.nombreLocal) {
        localYaCalculado = true;
      }
    }

    if (localYaCalculado == false) {
      
      for (let i=0;i<listaReservas.length;i++) {
        if (reservas.nombreLocal == listaReservas[i].nombreLocal && reservas.usuarioCliente == personaLogueada.nombreUsuario && listaReservas[i].usuarioCliente == personaLogueada.nombreUsuario) {
          misReservas++;
        }
      }
      let datos = new LocalFavorito(reservas.nombreLocal,misReservas);
      nombreLocalCalculado.push(datos);
      misReservas = 0;
    }
  }

  for (let calculados of nombreLocalCalculado) {

    if (localFavorito.length == 0) {
      let datos2 = new LocalFavorito (calculados.nombre,calculados.cantidadDeReservas);
      localFavorito.push(datos2);

    } else if (calculados.cantidadDeReservas == localFavorito[0].cantidadDeReservas) {
      let datos2 = new LocalFavorito (calculados.nombre,calculados.cantidadDeReservas);
      localFavorito.push(datos2);

    } else if (calculados.cantidadDeReservas > localFavorito[0].cantidadDeReservas) {

      while (localFavorito.length) {
        localFavorito.pop();
      }

      let datos2 = new LocalFavorito (calculados.nombre,calculados.cantidadDeReservas);
      localFavorito.push(datos2);
        
    }

  }
  
  while (nombreLocalCalculado.length) {
    nombreLocalCalculado.pop();
  }

  console.log("-----------------------------");
  console.log(localFavorito);
  console.log("-----------------------------");

  document.querySelector("#tablaLocalConMasReservasPersonas").innerHTML = miTabla;


    for(let favoritos of localFavorito){

      document.querySelector("#tablaLocalConMasReservasPersonas").innerHTML += `<tr><td>${favoritos.nombre}</td><td>${favoritos.cantidadDeReservas}</td></tr>`

    }

} 

//SELECT SOLICITAR RESERVA PERSONAS
function cargarSelectSolicitarReservaPersonas() {
  let combo = document.querySelector("#slcSolicitarReservaPersonas");
  combo.innerHTML="";
  for (let locales of listaLocales) {
    combo.innerHTML += `<option value=${locales.id}>
                          ${locales.id} ${locales.nombre} 
                        </option>`

  }
}

//TABLA RESERVAS PENDIENTES PERSONAS
function mostrarTablaReservasPendientesPersonas() {
  //armo el cabezal
  let miTabla = `<thead>
                  <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Cupos Reservados</th>
                  <th>Foto</th>
                  <th>Estado</th>
                  <th>Cancelar reserva</th>
                  </tr>
                </thead>`;

  //armo el cuerpo de la tabla
  //Recorro el la lista de reservas y me guardo la posición
  for (let i = 0; i < listaReservas.length; i++) {
    let objetoReserva = listaReservas[i];
    //Recorro el array de lcoales
    for (let locales of listaLocales) {
      //Guardo la ruta de la foto del local
      if (locales.nombre == objetoReserva.nombreLocal) {
        let rutaFoto = locales.foto;
        //Si la reserva en la posición i es de la persona logueada y está en estado pendiente o cancelada, la muestro en la tabla junto con la info del local
        if (objetoReserva.usuarioCliente == personaLogueada.nombreUsuario && (objetoReserva.estado == "Pendiente" || objetoReserva.estado == "Cancelada")) {
         miTabla += `<tbody>
                      <tr>
                      <td>${objetoReserva.contador}</td>
                      <td>${objetoReserva.nombreLocal}</td>
                      <td>${objetoReserva.cantidadDeCuposAReservar}</td>
                      <td><img class="imgLocales" src="${rutaFoto}"</td>
                      <td>${objetoReserva.estado}</td>
                      <td><input type ="button" value ="Cancelar" class="botonAccionCancelar redondear" id="boton${i}"></td>
                      </tr>
                    </tbody>`
        }
      }      

    }
    
  }
  document.querySelector("#tablaReservasPendientesPersonas").innerHTML = miTabla;

  //ASIGNACIÓN DE EVENTOS A TODOS LOS BOTONES QUE TENGAN LA CLASE botonAccion
  let arrayBotones = document.getElementsByClassName("botonAccionCancelar"); //getElementsByClassName devuelve un array x eso lo guardo en una variable arrayBotones

  //Para cada boton del array de botones le asigno un evento de click que llama a la funcion accionBoton
  for (let unBoton of arrayBotones) {
    unBoton.addEventListener("click", accionBotonReservasPendientes);
  }
}

//Funcion acción boton que guarda el id del boton clickeado y cambia el estado de esa posición
function accionBotonReservasPendientes() {
  let cualFueElIdDelBoton = this.id; //me guardo el id del botón clickeado
  //let id = cualFueElBoton.id; //guardo el id del boton clickeado (boton0, boton1..)
  let posicion = Number(cualFueElIdDelBoton.substring(5)); //me quedo solo con el numero del texto y lo paso a numero
  let objetoReserva = listaReservas[posicion]; //me traigo el objeto según posicion
  if (objetoReserva.estado == "Pendiente") {
    objetoReserva.estado = "Cancelada";
    console.log(listaReservas);
  }
  mostrarTablaReservasPendientesPersonas();
}

//TABLA RESERVAS FINALIZADAS PERSONAS
function mostrarTablaReservasFinalizadasPersonas() {
  //armo el cabezal
  miTabla = `<thead>
              <tr>
              <th>#</th>
              <th>Nombre local</th>
              <th>Cliente</th>
              <th>Cupos reservados</th>
              <th>Estado reserva</th>
              <th>Calificación</th>
              <tr>
            </thead>`;

  //armo el cuerpo de la tabla
  //Recorro la lista de reservas y busco las reservas finalizadas de la persona logueada para mostrar en la tabla
  for (let unaReserva of listaReservas) {
    if (unaReserva.usuarioCliente == personaLogueada.nombreUsuario && unaReserva.estado == "Finalizada") {
      miTabla += `<tbody>
                    <tr>
                      <td>${unaReserva.contador}</td>
                      <td>${unaReserva.nombreLocal}</td>
                      <td>${unaReserva.usuarioCliente}</td>
                      <td>${unaReserva.cantidadDeCuposAReservar}</td>
                      <td>${unaReserva.estado}</td>              
                      <td><select id="slcCalificacion${unaReserva.id}">
                            <option value=1>Elija calificación</option>
                            <option value=1>1</option>
                            <option value=2>2</option>
                            <option value=3>3</option>
                            <option value=4>4</option>
                            <option value=5>5</option>
                          </select>
                      </td>
                      <td><input type="button" class="redondear" value="Calificar" onClick=calificarReserva(${unaReserva.id})></td>
                    </tr>
                  </tbody>`;
    }
  }

  document.querySelector("#tablaReservasFinalizadasPersonas").innerHTML = miTabla;
}

//Funcion para calificar
function calificarReserva(unaReservaID) {
  //Tomo el valor de la calificación seleccionado por la persona
  let calificacion = parseInt(document.querySelector(`#slcCalificacion${unaReservaID}`).value);

  //Se toma el valor de la calificación si la reserva está finalizada
  for (let reserva of listaReservas) {
    if (reserva.id == unaReservaID && reserva.estado == "Finalizada") {
      reserva.calificacion = calificacion;
      //Se avisa que se ingresó correctamente la calificación
      document.querySelector("#pErrorCalificacion").innerHTML = "La calificación se ingresó correctamente";
    }
    
    
  }
  console.log(listaReservas);
}


// TABLA ESTADISTICA PERSONAS - PORCENTAJE DE RESERVAS
//Defino un array auxiliar 
let arrayAuxMostrado= new Array()
function mostrarTablaEstadisticaPersonasPorcentajeDeReservas() {
  //Miestras el array tenga elementos, elimine uno por uno
  while(arrayAuxMostrado.length){
    arrayAuxMostrado.pop();
    }
  let miTabla = "";
  //armo el cabezal
  miTabla += `<th>Local</th>
              <th>Cantidad de reservas completadas del cliente</th>
              <th>Total de reservas del local</th>
              <th>Porcentaje de reservas del cliente</th>
              `;

  //armo el cuerpo de la tabla
  let local = "";
  let promedio = 0;
  console.log(arrayAuxMostrado);
  /* Recorro el array de reservas si la reserva está finalizada y es del usuario logueado, 
  guardo en una variale el nombre del local en el que la reserva está finalizada */
  for (let unaReserva of listaReservas) {      
    console.log(unaReserva)
    if (unaReserva.estado == "Finalizada" && unaReserva.usuarioCliente == personaLogueada.nombreUsuario){    
      local = unaReserva.nombreLocal 
      //Con la función estaEnAux, compruebo si el local no está en el array auxiliar, 
      //para contar la cantidad de reservas que tiene el usuario logueado
      if (!estaEnAux(local,arrayAuxMostrado)){
        console.log("Entro bien x2")
        let misResevas= contarReservasDeUsarioLocal(local)
        let totalReservas = contadorTotalResrevasEnUnLocal(local)
        //Si el total de reservas es mayor a cero, calculo el promedio, y lo redondeo
        if (totalReservas >0){
          console.log("Entro bien x3")
          promedio = Math.round((misResevas / totalReservas) * 100) 
          miTabla += `<tr>
                      <td>${local}</td>
                      <td>${misResevas}</td>
                      <td>${totalReservas}</td>
                      <td>${promedio}%</td>
                      </tr>`
        }   
        
      }     
      
    }   
    
  }  
  //Muestro la tabla
  document.querySelector("#tablaPorcentajeReservasPersonas").innerHTML = miTabla;
}

