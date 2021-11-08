import axios from 'axios';

class GeoServerController {
    config = {
        method: 'get',
        url: 'http://localhost:8080/geoserver/routes/wfs',
        params: {
            request: 'GetFeature',
            outputformat: 'application/json'
        }
    }

    getRoads = () => {
        const qConfig = {...this.config, params: {...this.config.params, typeNames: 'routes:roads'}}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };

    getStops = () => {
        const qConfig = {...this.config, params: {...this.config.params, typeNames: 'routes:stops'}}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };
}


export default GeoServerController;