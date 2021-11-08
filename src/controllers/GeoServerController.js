import axios from 'axios';

class GeoServerController {
    config = {
        method: 'get',
        url: 'http://localhost:8080/geoserver/routes/wfs',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            host: '104.236.174.88',
            port: 3128
        }
    }

    getRoads = () => {
        const qConfig = {...this.config, params: {
            request: 'GetFeature',
            typeNames: 'routes:roads',
            outputformat: 'application/json'
        }}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };

    getStops = () => {
        const qConfig = {...this.config, params: {
            request: 'GetFeature',
            typeNames: 'routes:stops',
            outputformat: 'application/json'
        }}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };
}


export default GeoServerController;