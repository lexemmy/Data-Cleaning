const https = require('https');
const fs = require("fs");


function clean(obj){
	for(prop in obj){
		if ((obj[prop] === "N\/A") || (obj[prop] === "-")|| (obj[prop] === "") ){
			if (Array.isArray(obj)) {
				for (var i = 0; i <= obj.length; i++) {
					if (obj[i] === "-"){
						obj.splice(i,1);
					}
				}	
		} else {
				delete obj[prop];
				}
			}	
			if (typeof obj[prop] === 'object') {
				clean(obj[prop])
		}
	}
}

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (response) => {
	let data = '';

	response.on('data', (chunk) =>{
		data += chunk;
	});

	response.on('end', () => {
		var obj = JSON.parse(data);
		clean(obj);
		var cleanData = JSON.stringify(obj);
		fs.writeFile('data.json', cleanData, error => {
						if (error) {
							console.log(error)
							process.exit(0);
						}
						console.log('your data has been cleaned and saved!');
						process.exit(0);
					});
	});
}).on("error", (err) => {
	console.log("Error: " + err.message);
});