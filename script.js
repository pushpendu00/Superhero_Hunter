                    // ========== CODE HERE ========== //
// array initialize
var arr=[];

// DOM HTML ELEMENT
const inpt = document.getElementById("search-box");

const content=document.getElementById("content");

const favourite_list = document.getElementById("favourite-list");

const favourite_char=document.getElementById("favourite-char");

const favourite_btn=document.getElementById("favourite");

const cross_img = document.getElementById("cross-img");
// PRESS ENTER AND THEN FIND THE CHARACTER
inpt.addEventListener('keyup',(e)=>{
    if(inpt.value!=""){
        if(e.keyCode==13){
            fetchFun(inpt.value);
        }
    }else{
        alert("please enter character name");
        return;
    }
    
});

// FETCH FUCTION AND GET FINDING DATA
async function fetchFun(characterName)
{
    document.getElementById("video-container").style.display="none";
    content.innerHTML=`<h4 style="color: white">Wait for some time........ </h4>`;
    let url=`https://www.superheroapi.com/api.php/984533726062803/search/${characterName}`;
    let fetchData= await fetch(`${url}`)
    let results= await fetchData.json();

    if(results.response=="error"){
    document.getElementById("video-container").style.display = "block";
        // console.log("hello")
        // alert("data is not found please enter correct name");
        return;
    }
    showCharacter(results.results);
}




// DISPLAY FETCHING DATA
async function showCharacter(data)
{
    if(data.length<=0)
    {
        return;
    }
    content.innerHTML="";
    for(let i in data)
    {
        var new_div=document.createElement("div");
        new_div.innerHTML=`
        <div class="Superhero" id="${data[i].id}">
            <img src="${data[i].image.url}">
            <div>
                <h4 onclick="notFavDetailsFun(event)">
                    <span>${data[i].name}</span>
                </h4>
            </div>
            <button class="add-button" onclick="addFun(event)">Add To Favourite</button>
        </div>
        `;
        content.appendChild(new_div);
    }
}

// favourite List
var f=0;
function favouriteList()
{
    if(f==0)
    {
        favourite_btn.style.color="rgb(54, 195, 101";
        // display -> block favourite list
        favourite_list.style.display="block";
        // favourite_list.style.transition="width 2s linear 4s;";
        f=1;
    }
    else{
        favourite_btn.style.color="white";
        // display ->none favourite list
        favourite_list.style.display="none";
        f=0;
    }
}

// add to favourite list

async function addFun(event)
{
    var temp_id=event.target.parentNode.id;
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]==temp_id)
        {
            alert("this chracter already added your favourite list");
            return;
        }
    }
    arr.unshift(temp_id);
    let url = `https://www.superheroapi.com/api.php/984533726062803/${temp_id}`;
    let fetchData=await fetch(`${url}`);
    let results= await fetchData.json();
    console.log(results);
    var new_div=document.createElement("div");
        new_div.innerHTML=`
        <div class="Superhero" id="${temp_id+"c"}">
            <img src="${results.image.url}">
            <div>
                <h4 onclick="favDetailsFun(event)">
                <span>${results.name}</span>
                </h4>
            </div>
            <button class="remove-button" onclick="removeFun(event)">Remove To Favourite</button>
        </div>
        `;
    favourite_char.appendChild(new_div);
}

// REMOVE FROM FAVOURITE LIST
function removeFun(event)
{   
    var result=confirm("Are you sure you want to delete?");
    if(result)
    {
        var temp=event.target.parentNode;
        var temp_id=temp.id;
        temp_id=temp_id.substring(0,temp_id.length-1);
        var temp_arr=[];
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]!==temp_id)
            {
                temp_arr.push(arr[i]);
            }
        }
        arr=temp_arr;
        // alert("remove");
        temp.remove();
    }
}



// detailsFun(id);

// import {fun1} from "./super.js";

async function notFavDetailsFun(event){
    var temp_id=event.target.parentNode.parentNode.parentNode.id;
    console.log("id = ",temp_id);
    await localStorage.setItem("superheroId",temp_id);
    window.open("superhero.html");
}

async function favDetailsFun(event){
    var temp_id=event.target.parentNode.parentNode.parentNode.id;
    temp_id=temp_id.substring(0,temp_id.length-1);
    console.log("id = ",temp_id);
    await localStorage.setItem("superheroId",temp_id);
    window.open("superhero.html");
}



                    // ========== END ========== //
