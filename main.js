let title = document.getElementById("input_title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let dicount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
//global variables
let mode = "create";
let updateIndx = 0;
// get total
function getTotal(){
    if(price.value != ""){
        let res = +price.value + +taxes.value + +ads.value - +dicount.value; // + before the variable is for convert it to number
        total.innerHTML = res;
        total.style.backgroundColor = "green";
    }
    else{
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}

//create product
let products = [];
// to load the old data to the array 
if(localStorage.products != null){
    products = JSON.parse(localStorage.products);
}
create.onclick = function(){
     let new_product = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),

     }
     if(title.value != "" && price.value != "" && count.value <= 50 && category.value != ""){
         if(mode == "create"){
        //count
        if(new_product.count > 1){
            for(let i = 0 ; i < new_product.count ; i++){
                products.push(new_product);
            }
         }
         else{
            products.push(new_product); // add data to array, but if user reload the page, then array will be empty. so we need localstorage
         }
    }
    else{
        products[updateIndx] = new_product;
        create.innerHTML = "Create";
        count.style.display = "block";
    }
    clearInputs();
     }
   
     //save localstorage
     localStorage.setItem("products", JSON.stringify(products)); // to save products data even if user reload the page
    
     showData();
}

//clear inputs
function clearInputs(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    dicount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

//read
function showData(){
    getTotal();
    let table = "";
    for(let i=0 ; i<products.length;i++){
        table += `
        <tr>
                  <td>${i}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].dicount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="updateData(${i})">Update</button></td>
                  <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>
            `
            
        }
        document.getElementById("tbody").innerHTML = table;
        if(products.length > 0){
            document.getElementById("dltbtn").style.display = "block";
            document.getElementById("dltbtn").innerHTML = `Delete All (${products.length})`
        }
        else{
            document.getElementById("dltbtn").style.display = "none";
        }
    
}
showData();

//delete specific element
function deleteData(index){
    products.splice(index,1); // delete the object of index = index and delete just 1 object (element)
    localStorage.setItem("products",JSON.stringify(products)); 
    showData();
}
//delete all data

function deleteAll(){
    products.splice(0);
    localStorage.clear();
    document.getElementById("dltbtn").style.display = "none";
    showData();
}
//update
function updateData(index){
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    getTotal();
    count.style.display = "none";
    category.value = products[index].category;
    create.innerHTML = "Update";
    mode = "Update";
    updateIndx = index;
    scroll({
        top:0,
        behavior:"smooth",
    });
}
//search
let search_mode = "title";
function search_func(stype){
    let search = document.getElementById("input_search");
    search.focus();
    if (stype == "title"){
        search_mode = "title";
        search.placeholder = "Search By Title";
    }
    else{
        search_mode = "category";
        search.placeholder = "Search By Category";
    }
    search.value = "";
    showData();

}

function searchData(value){
    let table = "";
    if(search_mode == "title"){
        for( let i=0 ; i< products.length; i++){
            if(products[i].title.includes(value.toLowerCase())){
                table += `
                  <tr>
                  <td>${i}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].dicount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="updateData(${i})">Update</button></td>
                  <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>
            `
            }
        }

    }
    else{
        for( let i=0 ; i< products.length; i++){
            if(products[i].category.includes(value.toLowerCase())){
                table += `
                  <tr>
                  <td>${i}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].dicount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="updateData(${i})">Update</button></td>
                  <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>
            `
            }
        }


    }
    document.getElementById("tbody").innerHTML = table;
    
}
