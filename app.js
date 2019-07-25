const { argv } = require('./config/yargs');
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        porHacer.crear(argv.descripcion);
        break;

    case 'listar':

        if (argv.todo) {
            porHacer.listarDB();
        } else if (!argv.completadas && !argv.sincompletar) {
            console.log(`Por favor inserte un FLAG válido para el comando listar para definir que elementos quiere observar en el listado. 
(utilice el FLAG --help en el comando listar para ver los flags existentes de dicho comando`.red);
        } else {
            if (argv.sincompletar) porHacer.listarDBRestriccion(false);
            if (argv.completadas) porHacer.listarDBRestriccion(true);
        }

        break;

    case 'actualizarestado':
        porHacer.actualizarEstado(argv.descripcion, argv.completado);
        break;

    case 'borrarespecifico':
        porHacer.borrarEspecifico(argv.descripcion);
        break;

    case 'borrarcompletadas':
        porHacer.borrarCompletadas();
        break;

    case 'borrartodas':
        porHacer.borrarTodas();
        break;

    default:
        console.log("comando no reconocido".red);

}