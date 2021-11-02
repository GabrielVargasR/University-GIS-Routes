import axios from 'axios';

class DemoController {

    config = {
        method: 'get',
        url: 'http://localhost:5000/api/demo?'
    }

    listDemos = () => {
        return axios(this.config)
            .then(res=>{
                return res.data;
            })
            .catch (e => {
                console.log(e);
            })
        };

    queryDemo = (name) => {
        const qConfig = {...this.config, params: {isbn: name}}
        return axios(qConfig)
            .then(res=>{
                return res.data;
            })
            .catch (e=>console.log(e))
    };
}

export default DemoController;