import axios from 'axios';
import Config from '../Config.js';

const SolrFetcher = (args) => { 
	let url;
	if(args.action === 'detail'){
		url = Config.solr_url_voters + '?start=0&rows=1&q=(ncid:'+args.ncid+')';
	} else if (args.action === 'history') {
		url = Config.solr_url_history + '?start=0&rows=50&q=(ncid:'+args.ncid+')';
	} else {
		let page = parseInt(args.page, 10);
		let rows = 50;
		let start = (page * rows) - rows;
		url = Config.solr_url_voters + '?start='+start+'&rows='+rows+'&q=(';
		let query_parts = [];
		let address = args.fields.res_street_address.replace(/[^A-z0-9* ]/gi,'').trim().split(' ');
		
		for(let i = 0;i<address.length;i++){
			if(address[i].trim().length > 0) query_parts.push('res_street_address:'+address[i].trim());
		}

		['first_name','middle_name','last_name','gender_code','race_code','birth_year','birth_state','county_id','res_city_desc','zip_code','party_cd'].forEach((el) => {
			if(args.fields[el]) {
				let parts = args.fields[el].replace(/[^A-z0-9* ]/gi,'').trim().split(' ');
				for(let i=0;i<parts.length;i++){
					if(parts[i].trim().length > 0) query_parts.push(el+':'+parts[i].trim());
				}
			}
		});

		if(args.fields.birth_age_min || args.fields.birth_age_max) {
			query_parts.push('birth_age:['+(args.fields.birth_age_min || '*') + ' TO ' + (args.fields.birth_age_max || '*') + ']');
		}

		if(args.fields.hispanic) query_parts.push('ethnic_code:HL');
		
		if(args.status_cd || args.fields.active_only) {
			query_parts.push('status_cd:'+(args.fields.status_cd || (args.fields.active_only ? 'A' : '*')));
		}

		if(query_parts.length > 0){
			for(let i=0;i<query_parts.length;i++){
				if(i>0) url+=' AND ';
				url += query_parts[i];
			}		
		} else {
			url += '*:*';
		}

		url	+=')';

	}

	return new Promise((resolve, reject) => {
		axios.get(url).then((response) => {
			resolve(response);
		}).catch(error => reject(error));	
	});
}
export default SolrFetcher;