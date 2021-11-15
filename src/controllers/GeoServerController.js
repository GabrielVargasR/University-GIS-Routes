import axios from 'axios';

class GeoServerController {
    // objeto para configurar la llamada al backend
    config = {
        method: 'get',
        url: 'http://localhost:8080/geoserver/routes/wfs',
        params: {
            request: 'GetFeature',
            outputformat: 'application/json'
        }
    }

    // función para obtener un geojson con las carreteras
    // retorna un Promise
    getRoads = () => {
        // se agrega al config el nombre de la capa que se quiere consultar
        const qConfig = {...this.config, params: {...this.config.params, typeNames: 'routes:roads'}}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };

    // función para obtener un geojson con las paradas
    // retorna un Promise
    getStops = () => {
        // se agrega al config el nombre de la capa que se quiere consultar
        const qConfig = {...this.config, params: {...this.config.params, typeNames: 'routes:stops'}}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };

    // función para obtener un geojson con la ruta óptima
    // recibe el id de las paradas de partida y de destino
    // retorna un Promise
    getRoute = (source, target) => {
        // agrega al config el nombre de la capa y los id de las paradas
        const qConfig = {...this.config, params: {
            ...this.config.params, 
            typeNames: 'routes:calculated_route',
            viewParams: `source:${source};target:${target}`
        }}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    }
}


export default GeoServerController;