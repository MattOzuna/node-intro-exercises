const fs = require('fs')
const axios = require('axios')

const path = process.argv[2]

const cat = (path) => {
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}`, err.message);
            process.exit(1);
          }
    
          console.log(data);
    })
}

const webCat = (path) => {
    axios
        .get(path)
        .then(response => console.log(response.data))
        .catch(err => {
            console.log('Error: ', err.message)
            process.exit(1);
        })
}

if (path.startsWith('http://')){
    webCat(path)
} else {
    cat(path)
}


// if (path.slice(0, 4) === 'http') {
//     webCat(path);
//   } else {
//     cat(path);
//   }

