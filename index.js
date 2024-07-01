import express from "express";
import axios from "axios";

const app=express();
const port =3000;

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        title:"",
        image:null,
        ing:[],
        me:[],
        ing1:[],
        me1:[],
        ing2:[],
        me2:[]
    });
})

app.get("/getcocktail", async (req,res)=>{
    try{
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php",req.body);
        console.log(result.data.drinks[0].strDrink);
        console.log(JSON.stringify(result.data.drinks[0].strDrinkThumb));
        console.log([result.data.drinks[0].strMeasure1]);
        /*const ingredients=[];
        const measures=[];
        for(var i =0;i<15;i++){
            const ingredients=result.data.drinks[0].strIngredient[i];
            const measures=result.data.drinks[`strMeasure${i}`];
            if (ingredients) ingredients.push(ingredients);
            if(measures) measures.push(measures);
            
        }*/
        res.render("index.ejs",{
            title:JSON.stringify(result.data.drinks[0].strDrink),
            image:result.data.drinks[0].strDrinkThumb,
            ing:result.data.drinks[0].strIngredient1,
            me:result.data.drinks[0].strMeasure1,
            ing1:result.data.drinks[0].strIngredient2,
            me1:result.data.drinks[0].strMeasure2,
            ing2:result.data.drinks[0].strIngredient3,
            me2:result.data.drinks[0].strMeasure3
        });
    }
    catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
    }
})

app.listen(port,()=>{
    console.log(`server running on port ${port}.`);
})