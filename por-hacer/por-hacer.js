const fs = require('fs');;
const colors = require('colors');
const removeItems = require('remove-array-items');

let listadoPorHacer = [];

const crear = (descripcion) => {


    cargarDB();

    if (listadoPorHacer.find(obj => obj.descripcion === descripcion.toUpperCase().trim())) {
        console.log("Ya se encuentra registrada la tarea ingresada".red);
    } else {
        let porHacer = {
            descripcion: descripcion.toUpperCase().trim(),
            completado: false
        };

        listadoPorHacer.push(porHacer);

        guardarDB("confirmacion");


    }

}

const borrarCompletadas = () => {
    cargarDB();

    if (!listadoPorHacer.find(obj => obj.completado === true)) {
        console.log("No se encuentra ninguna tarea registrada completada, por tanto no es posible borrar completadas".red);
    } else {
        listadoPorHacer = listadoPorHacer.filter(obj => obj.completado === false);
        console.log("Todas las tareas completadas han sido borradas".green);
    }

    guardarDB(null);
};

const borrarTodas = () => {
    cargarDB();
    if (listadoPorHacer.length !== 0) {
        listadoPorHacer = [];
        console.log("Todas las tareas han sido borradas".green);
    } else {
        console.log("No se han registrado tareas, por tanto no es posible borrarlas".red);
    }
    guardarDB(null);

};

const borrarEspecifico = (descripcion) => {



    cargarDB();

    let posicion = listadoPorHacer.indexOf(listadoPorHacer.find(obj => obj.descripcion === descripcion.toUpperCase().trim()));

    if (posicion !== -1) {
        removeItems(listadoPorHacer, posicion, 1);
        console.log(`la tarea` + ` ${descripcion.toUpperCase().trim()}`.yellow + ` ha sido borrada`);

    } else {
        console.log(`No se encuentra registrada la tarea ${descripcion.toUpperCase().trim()}, por tanto no puede ser borrada`);
    }

    guardarDB(null);

};

const actualizarEstado = (descripcion, completado) => {


    let cont = 0;
    cargarDB();

    for (let objeto of listadoPorHacer) {

        if (objeto.descripcion === descripcion.toUpperCase().trim()) {
            objeto.completado = completado;
            cont = 1;
        }

    }

    if (cont === 0) {
        console.log(`No se ha encontrado la tarea` + ` ${descripcion.toUpperCase().trim()}`.yellow);
    } else {
        console.log(`Se ha actualizado el estado de la tarea` + ` ${descripcion.toUpperCase().trim()}`.yellow);
    }

    guardarDB(null);
};


const listarDB = () => {
    cargarDB();
    if (listadoPorHacer.length !== 0) {
        console.log("---------------------------------------------------------------".cyan);
        for (i = 0; i < listadoPorHacer.length; i++) {
            console.log(`Tarea: `.white + `${listadoPorHacer[i].descripcion}`.yellow);
            if (listadoPorHacer[i].completado) {
                console.log(`Estado: `.white + `Completado`.green);
            } else {
                console.log(`Estado: `.white + `No Completado`.red);
            }
            console.log("---------------------------------------------------------------".cyan);

        }
    } else {
        console.log("No existen tareas registradas para listar".red);
    }
}

const listarDBRestriccion = (NoSiCompletado) => {
    cargarDB();
    if (!listadoPorHacer.find(obj => obj.completado === NoSiCompletado)) {
        if (NoSiCompletado === true) console.log("No hay tareas completadas, no es posible mostrar listado".red);
        else console.log("No hay tareas sin completar, no es posible mostrar listado".red);
    } else {
        let tareas = listadoPorHacer.filter(obj => obj.completado === NoSiCompletado);
        console.log("---------------------------------------------------------------".cyan);
        for (i = 0; i < tareas.length; i++) {
            console.log(`Tarea: `.white + `${tareas[i].descripcion}`.yellow);
            if (NoSiCompletado === true) console.log(`Estado: `.white + `Completado`.green);
            else console.log(`Estado: `.white + `No Completado`.red);
            console.log("---------------------------------------------------------------".cyan);

        }
    }
};



const cargarDB = () => {

    listadoPorHacer = require('../db/data');

};

const guardarDB = (cont) => {

    let data = JSON.stringify(listadoPorHacer);

    ruta_archivo = 'db/data.json';

    fs.writeFile(ruta_archivo, data, (err) => {

        if (err) {
            throw "Error al guardar tarea en la base de datos", err;
        } else {
            if (cont) console.log("Tarea guardada con éxito".green);
        }


    });

};

module.exports = {
    crear,
    listarDB,
    actualizarEstado,
    borrarEspecifico,
    borrarTodas,
    borrarCompletadas,
    listarDBRestriccion
};