import { Demo } from '../schemas/demo'

class MongoController {
    public getDemos = () => Demo.find();

    public getDemo = (name : string) => Demo.find({'name' : name});
}

export default MongoController;