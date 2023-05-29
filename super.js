
var id=localStorage.getItem("superheroId");
fun();
async function fun(){
    let url = `https://www.superheroapi.com/api.php/984533726062803/${id}`;
    
    let fetchData = await fetch(`${url}`);
    let results = await fetchData.json();
    console.log(results);

    // poster
    document.getElementById("poster").src=results.image.url;
    // poster-Name
    document.getElementById("name").innerHTML=results.name;
    // Full-Name
    document.getElementById("fullName").innerHTML=results.biography['full-name'];

    document.getElementById("gender").innerHTML=results.appearance.gender;

    document.getElementById("eye-color").innerHTML=results.appearance['eye-color'];

    document.getElementById("hair-color").innerHTML=results.appearance['hair-color'];

    document.getElementById("weight").innerHTML=results.appearance.weight[1];

    document.getElementById("occupation").innerHTML=results.work.occupation;
    
    // var work="";

    // for(let i=0;i<Object.keys(results.powerstats).length;i++)
    // {
        
    //     work+=
    //     console.log(results.powerstats);
    // }
    document.getElementById("powerstats").innerHTML=Object.keys(results.powerstats);;
    // Object.keys(results.powerstats);
// console.log(work);
}