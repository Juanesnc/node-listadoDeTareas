const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){
        
        if( this._listado[id] ){
            delete this._listado[id];
        }
        
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        
        console.log('\n');

        for(let i=1; i <= this.listadoArr.length; i++){
            console.log(`${`${i}.`.magenta} ${this.listadoArr[i-1].desc} :: ${(this.listadoArr[i-1].completadoEn===null)?'Pendiente'.red:'Completado'.magenta}`);
        }

    }

    listarPendientesCompletadas( completadas = true ){

        console.log('\n');
        let contador = 1;

        if(completadas === true){

            for(let i=1; i <= this.listadoArr.length; i++){

                if(this.listadoArr[i-1].completadoEn !== null){
                    console.log(`${`${contador}.`.magenta} ${this.listadoArr[i-1].desc} :: ${this.listadoArr[i-1].completadoEn.magenta}`);
                    contador++;
                }
                
            }

        }else{

            for(let i=1; i <= this.listadoArr.length; i++){
                
                if(this.listadoArr[i-1].completadoEn === null){
                    console.log(`${`${contador}.`.magenta} ${this.listadoArr[i-1].desc} :: ${'Pendiente'.red}`);
                    contador++;
                }

            }

        }

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}

module.exports = Tareas;