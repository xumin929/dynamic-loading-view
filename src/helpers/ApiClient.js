import axios from 'axios';
import Api from 'jdcloudecc/apiClient/ApiClient';
import config from '../config';

export default class ApiClient extends Api {
    constructor(req,res,operating) {
        super(config,req,res, true);
    }
}
