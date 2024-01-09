const fs = require('fs')
const axios = require('axios')

//========================================================================================//

const readFile = async (path) => {
    let response =  await fs.promises.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}`, err.message);
            process.exit(1);
        }
        return data;
    })
    return response
}

const cat = async ()=> {
    let response = await readFile(process.argv[2])
    console.log(response)
}

//========================================================================================//

const getWebData = async (url) => {
    let res = await axios.get(url)
    return res.data
}

const webCat = async ()=> {
    let response = await getWebData(process.argv[2])
    console.log(response)
}

//========================================================================================//


const catWrite = async (path, origin) => {

    let data = await readFile(origin)

    fs.writeFile(path, data, 'utf8', (err) =>{
        if (err) {
            console.error(`Error writing to ${path}`, err.message)
            process.exit(1);
        }
        console.log(`no output, but ${path} contains content of ${origin}`)
    })
}

const webCatWrite = async (path, url) => {

    let data = await getWebData(url)

    fs.writeFile(path, data, 'utf8', (err) =>{
        if (err) {
            console.error(`Error writing to ${path}`, err.message)
            process.exit(1);
        }
        console.log(`no output, but ${path} contains content of ${url}`)
    })
}


//========================================================================================//


if (process.argv[2] == '--out'){
    
    if (process.argv[4].startsWith('http://')){
        webCatWrite(process.argv[3], process.argv[4])
    } 
    
    else {
        catWrite(process.argv[3], process.argv[4])
    }

} else {
    
    if (process.argv[2].startsWith('http://')){
        webCat()
    } 
    
    else {
        cat()
    }
}
