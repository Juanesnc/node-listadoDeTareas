const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
        
                value: '1',
                name: `${'1.'.magenta} Crear tarea` 

            },
            {

                value: '2',
                name: `${'2.'.magenta} Listar tareas`

            },
            {

                value: '3',
                name: `${'3.'.magenta} Listar tareas completadas` 

            },
            {

                value: '4',
                name: `${'4.'.magenta} Listar tareas pendientes` 

            },
            {

                value: '5',
                name: `${'5.'.magenta} Completar tarea(s)`

            },
            {

                value: '6',
                name: `${'6.'.magenta} Borrar tarea`

            },
            {

                value: '0',
                name: `${'0.'.magenta} Salir`

            }
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();

    console.log('=================================='.magenta)
    console.log('     Seleccione una opcion'.magenta)
    console.log('=================================='.magenta)

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

}


const pausa = async() => {

    
    const pregunta = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${ 'ENTER'.magenta } para continuar\n`
        }
    ]
    console.log('\n');
    await inquirer.prompt(pregunta);

}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const contador = `${i+1+'.'}`.magenta;

        return {
            value: tarea.id,
            name: `${contador} ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.magenta + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async( message ) => {
    
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const contador = `${i+1+'.'}`.magenta;

        return {
            value: tarea.id,
            name: `${contador} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}