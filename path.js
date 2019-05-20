const dateTime = require('date-time');
const fs       = require('fs')

var Path=[
    {
        method: 'GET',
        path: '/sample',
        handler: (request, h) => {
            return 'Hello World!';
        },
        options: {
            auth: {strategy: 'my-strategy', mode: 'required'},
        }
    },
    {
        method: 'POST',
        path:'/',
        handler: (request,h)=>{
            const fruit=request.payload;
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                console.log(ParsedData);
                if(ParsedData.hasOwnProperty(fruit.name)){
                    console.log("irukku");
                    return "Value already exists use put";
                }
                else{

                    let fruitVal={"cost":fruit.cost,"history":[{[dateTime()]:{"method":"post","current_cost":[fruit.cost]}}]}
                    ParsedData[fruit.name]=fruitVal;
                    console.log("illa");
                
               
                    fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                        if (err) throw err;
                        console.log("insert panten");
                        return " is inserted";
                    });
                }
                if(err) throw err;
            return "seems like an error";
        });
        }
    },
    {
        method: 'PUT',
        path:'/',
        handler: (request,h)=>{
            const Nfruit=request.payload;
            
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                console.log(ParsedData.banana);
                if(ParsedData.hasOwnProperty(Nfruit.name)){
                    console.log("aaa");
                    const fruit=ParsedData[Nfruit.name];
                    let OldCost=fruit.cost
                    fruit.cost=Nfruit.cost;
                    fruit.history.push({[dateTime()]:{"method":"PUT","current_cost":[Nfruit.cost],"old_cost":OldCost}});
                    ParsedData[Nfruit.name]=fruit;
                    console.log(ParsedData);
                    fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                        if (err) throw err;
                        return " is updated";
                    });
                }
                else{
                    console.log("bbb");
                    return "Value does not exist use post";
                }
                if(err) throw err;
            return "seems like an error";
        });
        }
    },
    {
        method: 'GET',
        path:'/',
        handler: (request,h)=>{
            const Nfruit=request.query;
            console.log(Nfruit);
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                if(ParsedData.hasOwnProperty(Nfruit.name)){
                    console.log("aaa");
                    const fruit=ParsedData[Nfruit.name];
                    fruit.history.push({[dateTime()]:{"method":"get"}});
                    ParsedData[Nfruit.name]=fruit;
                    console.log(ParsedData);
                    fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                        if (err) throw err;
                        return " is updated";
                    });
                }
                else{
                    console.log("bbb");
                    return "Value does not exist use post";
                }
                if(err) throw err;
            return "seems like an error";
        });
        }
    },
    {
        method: 'DELETE',
        path:'/',
        handler: (request,h)=>{
            const Nfruit=request.payload;
            
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                console.log(ParsedData.banana);
                if(ParsedData.hasOwnProperty(Nfruit.name)){
                    delete ParsedData[Nfruit.name];
                    fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                        if (err) throw err;
                        return " is deleted";
                    });
                }
                else{
                    return "Value does not exist use post";
                }
                if(err) throw err;
            return "seems like an error";
        });
        }
    },

]
module.exports=Path;