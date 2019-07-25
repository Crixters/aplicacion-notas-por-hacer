const descripcion = {
    demand: true,
    alias: 'd',
    type: 'string',
    description: "descripcion de la tarea"
};

const completado = {
    alias: 'c',
    default: true,
    type: 'boolean',
    description: "definir si una tarea esta completa o no"
}



const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizarestado', 'Actualiza el estado de una tarea', {
        descripcion,
        completado

    })
    .command('listar', 'Lista las tareas registradas', {
        todo: {
            alias: 't',
            type: 'boolean',
            description: "Listado todas las tareas"
        },
        sincompletar: {
            alias: 's',
            type: 'boolean',
            description: "Listado tareas sin completar"
        },
        completadas: {
            alias: 'c',
            type: 'boolean',
            description: "Listado tareas completadas"
        }
    })
    .command('borrarespecifico', 'Borra una tarea registrada', {
        descripcion
    })
    .command('borrarcompletadas', 'Borra todas las tareas completadas')
    .command('borrartodas', 'Borra todas las tareas registradas')
    .help()
    .argv;

module.exports = {
    argv
};