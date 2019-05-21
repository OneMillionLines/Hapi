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
        handler:  (request,h)=>{
            
            
            const fruit=request.payload;
            var resp=''
            var contents=fs.readFileSync('fruits.json','utf-8');
            console.log(contents);
            const ParsedData=JSON.parse(contents);
            if(ParsedData.hasOwnProperty(fruit.name)){
                console.log("irukku");
                console.log(resp);
                return "Value already exists use put";
            }
            else{

                let fruitVal={"cost":fruit.cost,"history":[{[dateTime()]:{"method":"post","current_cost":[fruit.cost]}}]}
                ParsedData[fruit.name]=fruitVal;
            
           
                fs.writeFileSync('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                    if (err) throw err;
                    console.log("insert panten");
                });
                return fruit.name+" is inserted";
            }
            return resp;
        }
    },
    {
        method: 'GET',
        path:'/check',
        handler: (request,h)=>{
            const Nfruit=request.query;
            console.log(Nfruit.name);
            let contents=fs.readFileSync('fruits.json','utf-8');
            const ParsedData=JSON.parse(contents);
            console.log(ParsedData);
            if(ParsedData.hasOwnProperty(Nfruit.name)){
                const fruit=ParsedData[Nfruit.name];
                fruit.history.push({[dateTime()]:{"method":"get"}});
                ParsedData[Nfruit.name]=fruit;
                console.log(ParsedData);
                fs.writeFileSync('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                    if (err) throw err;
                });
                return fruit.cost+" is the cost";
            }
            else{
                console.log("bbb");
                return "Value does not exist use post";
            }
        }
    },
    {
        method: 'PUT',
        path:'/check',
        handler:  (request,h)=>{
            
            
            const Nfruit=request.payload;
            var resp=''
            var contents=fs.readFileSync('fruits.json','utf-8');
            console.log(contents);
            const ParsedData=JSON.parse(contents);
            if(ParsedData.hasOwnProperty(Nfruit.name)){
                const fruit=ParsedData[Nfruit.name];
                let OldCost=fruit.cost
                fruit.cost=Nfruit.cost;
                fruit.history.push({[dateTime()]:{"method":"PUT","current_cost":Nfruit.cost,"old_cost":OldCost}});
                ParsedData[Nfruit.name]=fruit;
                fs.writeFileSync('fruits.json', JSON.stringify(ParsedData),'utf-8');
                return Nfruit.name+" is updated";
            }
            else{
                return Nfruit.name+" does not exist use post";
            }
            return resp;
        }
    },
    {
        method: 'DELETE',
        path:'/check',
        handler:  (request,h)=>{
            
            
            const Nfruit=request.payload;
            var resp=''
            var contents=fs.readFileSync('fruits.json','utf-8');
            console.log(contents);
            const ParsedData=JSON.parse(contents);
            if(ParsedData.hasOwnProperty(Nfruit.name)){
                delete ParsedData[Nfruit.name];
                fs.writeFileSync('fruits.json', JSON.stringify(ParsedData),'utf-8');
                return Nfruit.name+" is deleted";
            }
            else{

                return Nfruit.name+" does not exist use post";
            }
            return resp;
        }
    },

]
module.exports=Path;