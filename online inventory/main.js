const newform = document.getElementById("form").value;
const itemName = document.querySelector('#Name');
const itemBags = document.querySelector('#unit1');
const itemPcs = document.querySelector('#unit2');
const itemKg = document.querySelector('#unit3');
const itemIncrease1 = document.querySelector('#increase1');
const itemIncrease2 = document.querySelector('#increase2');
const itemIncrease3 = document.querySelector('#increase3');
const send = document.querySelector('#submit');
const table = document.querySelector('#output');
const Delete = document.querySelector('#remove');
const toggle = document.querySelector('.toggle-button');
const Form = document.querySelector('.form');
const option = document.querySelector('.option');
const sideBar = document.querySelector('#input');

class ITEMSNAME{
    constructor(itemName,unitBag,unitPcs,unitKg,itemIncrease1,itemIncrease2,itemIncrease3){
        this.itemName = itemName;
        this.unitBag = unitBag;
        this.unitPcs = unitPcs;
        this.unitKg = unitKg;
        this.itemIncrease1 = itemIncrease1;
        this.itemIncrease2 = itemIncrease2;
        this.itemIncrease3 = itemIncrease3;
    }
}


class Items{

    constructor(){
        this.productList = [];   
    }

    

    addItem(itemName,unitBag,unitPcs,unitKg, itemIncrease1,itemIncrease2,itemIncrease3){
        const item = new ITEMSNAME(itemName,unitBag,unitPcs,unitKg, itemIncrease1,itemIncrease2,itemIncrease3);
        this.productList.push(item);
        this.display();
        localStorage.setItem('Products', JSON.stringify(this.productList))
    }
    
    removeProduct(index) {
        const data = JSON.parse(localStorage.getItem('Products'));
        if (index >= 0 && index < this.productList.length) {
          this.productList.splice(index, 1);
            data.splice(index, 1);
          console.log(index)
        }
        this.display();
        this.storeToLclStorage()
      }
    
    storeToLclStorage(){
        localStorage.setItem('Products', JSON.stringify(this.productList))
    }

    update(){
        const upData = JSON.parse(localStorage.getItem('Products'));
        if(upData !== null){
            for(let i=0; i< upData.length;i++){
                this.productList.push(upData[i])
            }
        }else{
            Form.classList.toggle('active');
        }
    }

    display(){
        const TH = `<tr>
        <th>Product</th>
        <th>Unit</th>
        <th>Quantity</th>
        <th>Capital</th>
        <th>Price</th>                  
        <th>Total Sale</th>
        <th>profit</th>
        <th>remove</th>
    </tr>`;
        output.innerHTML = TH;

        this.productList.forEach((item, row="") => {
            
            item.unitBag = Number(item.unitBag)
            item.unitKg = Number(item.unitKg)
            item.unitPcs = Number(item.unitPcs)
            item.itemIncrease1 = Number(item.itemIncrease1)
            item.itemIncrease2 = Number(item.itemIncrease2)
            item.itemIncrease3 = Number(item.itemIncrease3)

            let num1 = (item.unitBag + item.itemIncrease1);
            const list =     
          `<tr>
              <td id="product">${item.itemName}</td>
              <td>
                  <select id="unit${row}" oninput="compute(quantity.value,${row})" >
                      <option value="0" id="1">select</option>
                      <option value="${num1}"  id="bags">Bag</option>
                      <option value="${item.unitPcs}"  id="pcs">piece/s</option>
                      <option value="${item.unitKg}"  id="kg">kilo</option>
                  </select>
              </td>
              <td ><input min="0" id="quantity" type="number" oninput="compute(this.value,${row})" class="quantity" placeholder="Enter Quantity"></td>
              <td id="capital${row}"></td>
              <td id="price${row}"></td>
              <td id="total${row}"></td>
              <td id="profit${row}"></td>
              <td id="remove${row}"><span id="remove" onclick="remove(${row})" class="material-symbols-outlined">
              delete
              </span></td>
          </tr>`
      
          output.innerHTML += list;
        });

        
         
      } 
       
   
}

const list = new Items();

list.update();
list.display();
// this function is used to loop the item list


send.addEventListener('click', (e)=>{
    e.preventDefault();
    list.addItem(
        itemName.value,
        itemBags.value,
        itemPcs.value,
        itemKg.value,
        itemIncrease1.value,
        itemIncrease2.value,
        itemIncrease3.value
        )
    console.log(list.productList)
})

function compute(qntdOpt, row=""){
    let capOpt = document.getElementById('unit'+row).value;
    let prcdOpt,profdOpt,total;

    qntdOpt = Number(qntdOpt);
    total = Number(total);
    profdOpt = Number(profdOpt);
    capOpt = Number(capOpt);

    prcdOpt  = capOpt + 30;

    let sub = (prcdOpt - capOpt);
         profdOpt = qntdOpt * sub;
         total = qntdOpt * prcdOpt;
         console.log("qnt: "+qntdOpt)
         console.log("unit: "+capOpt)
    
    if(isNaN(qntdOpt)=== true){
        document.getElementById('profit'+row).innerText = " " ;
        document.getElementById('total'+row).innerText = " ";
    }else{
        
        document.getElementById('profit'+row).innerText = "P" + profdOpt;
        document.getElementById('total'+row).innerText = "P" + total;
    }

    document.getElementById('capital'+row).innerText = "P" + capOpt;
    document.getElementById('price'+row).innerText = "P" + prcdOpt;
 
}

remove = (index)=>{
    list.removeProduct(index)
    console.log(list.productList)
}

// toggles

toggle.addEventListener('click', ()=>{
    Form.classList.toggle('active');

})

sideBar.addEventListener('click', ()=>{
    option.classList.toggle('active');
})