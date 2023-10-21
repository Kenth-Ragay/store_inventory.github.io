class LIST{
    constructor(Name, unit1, unit2, unit3, increase){
        this.Name = Name,
        this.unit = unit1,
        this.unit2 = unit2,
        this.unit3 = unit3,
        this.increase = increase
    }
}

class newList{
    constructor(){
        this.productList = [];
    }

    addItem(){
        const newProduct = LIST(Name, unit1, unit2, unit3, increase);
        this.productList.push(newProduct);
    }

    display(){
        this.productList.forEach(() => {
            console.log(Name, unit1, unit2, unit3, increase);
        });       
    }

    input(){
        
    }
}