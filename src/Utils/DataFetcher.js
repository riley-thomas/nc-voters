import axios from 'axios';
import Config from '../Config.js';


const DataFetcher = (args) => { 
	return new Promise((resolve, reject) => {
		let url = null;
		let data_object = args.type;
		switch (args.type) {
			case 'custom':
				url = args.url;
				break;
			default:
				url = (typeof args.id !== 'undefined' ? Config[args.type+'_endpoint'](args) : Config[args.type+'_endpoint']) || false;
  		}
  		if(url) {	
  			axios.get(url).then((response) => {
  				let data = args.type === 'custom' ? response : response.data[data_object];
  				resolve(data);
			}).catch(error => reject(error));	
  		} else {
  			reject('No endpoint for this request');
  		}
	});
}
export default DataFetcher;