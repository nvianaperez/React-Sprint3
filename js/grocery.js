// Exercise 11
// Move this variable to a json file and load the data in this js
var products = [
    {
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
var cartList = [];
var cart = [];
var subtotal = {
    grocery: {
        value: 0,
        discount: 0
    },
    beauty: {
        value: 0,
        discount: 0
    },
    clothes: {
        value: 0,
        discount: 0
    },
};
var total = 0;


// Exercise 1
function addToCart(id) {
    // 1. Loop for to the array products to get the item to add to cartList
    for (let i = 0; i < products.length - 1; i++) {
        if (id === products.indexOf(products[i])) {
            cartList.push(products[i]); // 2. Add found product to the cartList array
        }
    }
    console.log(cartList);
}

// // Exercise 9
// function removeFromCart(id) {
//     for (let i = 0; i < cartList.length - 1; i++) {
//         if (products[id].name === cartList[i].name) {
//            cartList.splice(cartList.indexOf(cartList[i]),1);
//         }
//     }
//     console.log(cartList);
// }

// Exercise 2
function cleanCart() {
    cartList = [];
    console.log(cartList);
}

// Exercise 3 - SUBTOTALS IN $ - object subtotals
function calculateSubtotalsValue() {
    // 1. Create a for loop on the "cartList" array 
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes

    // limpiar el objeto subtotal, sin var (porque con var subtotal lo que hago es crear una segunda variable subtotal vacía y todo lo demas lo haría sobre esta vacía)
    subtotal = {
        grocery: {
            value: 0,
            discount: 0
        },
        beauty: {
            value: 0,
            discount: 0
        },
        clothes: {
            value: 0,
            discount: 0
        },
    };

    // llamar a la función que genera cart, a partir de cartList
    generateCart(cartList);

    // recorrer cart buscando el tipo de producto y rellenando el valor del objeto subtotal, en la categoría que le corresponda.
    for (let i = 0; i < cart.length; i++) {
        switch (cart[i].type) {
            case 'grocery':
                subtotal.grocery.value += cart[i].subtotal;
                break;
            case 'beauty':
                subtotal.beauty.value += cart[i].subtotal;
                break;
            case 'clothes':
                subtotal.clothes.value += cart[i].subtotal;
                break;
            default:
                console.log('Error: el producte no té categoria');
                break;
        }
    }
    console.log(subtotal);
}

// Exercise 4a - bucle for
// function calculateTotal() {
//     // Calculate total price of the cartList either using the "cartList" array
//     total = 0; // inicializo en 0 la variable global total
//     for (let i = 0; i < cartList.length; i++) {
//         total += cartList[i].price;
//     }
//     console.log(total);
// }
// Exercise 4 - forEach
// function calculateTotal() {
//     total = 0; // inicializo en 0 la variable global total
//     cartList.forEach(product => {
//         total += product.price
//     });
//     console.log(total);
// }

// **traer objeto subtotal rellenado de la función anterior, recorrerlo sumando los subtotales para dar la variable total.
function calculateTotal() {
    console.log(subtotal);
    for (type in subtotal) {
        total += subtotal[type].value;
    }
    console.log(total);

}

// function calculateTotal() {
//     for (let i = 0; i < cart.length; i++) {
//         total += cart[i].subtotal;
//     }
//     console.log(total);
// }


// // Exercise 5
// function applyPromotionsSubtotals() {
// // aquest exercicino hi és a l'enunciat de la tasca
// }

// Exercise 6
function generateCart(cartList) {
    // Using the "cartlist" array that contains all the items in the shopping cartList, 
    // generate the "cartList" array that does not contain repeated items, instead each item of this array "cartList" shows the quantity of product.
    cart = [];
    let i = 0;
    let j = 0;
    cartList.sort((a, b) => (a.name > b.name) ? -1 : 1); //ordena el cartList que recibo por orden alfabético de nombre
    // console.log(cartList);
    for (i = 0; i < cartList.length; i++) {
        cartList[i].quantity = 0;
        cartList[i].subtotal = cartList[i].quantity * cartList[i].price;
    }
    if (cart.length === 0) {
        cart.push(cartList[0]);
    }

    for (i = 0; i < cartList.length; i++) {
        for (j = cart.length - 1; j < cart.length; j++) {
            if (cartList[i].name === cart[j].name) {
                cart[j].quantity = cartList[i].quantity + 1;
                cartList[i].quantity = cart[j].quantity;
                cart[j].subtotal = cart[j].quantity * cart[j].price;
            } else {
                cart.push(cartList[i]);
                ++j;
                cart[j].quantity = 1; //=cart[j]['quantity'] = 1;
                cart[j].subtotal = cart[j].quantity * cart[j].price;
            }
        }
    }
    console.log(cart);
}

// Exercise 7
function applyPromotionsCart(cart) {
    // Apply promotions to each item in the array cart"
    let pricePromCookingOil;
    let pricePromCupcakeMixture;
    //añado propiedad subtotalWithDiscount a todos los elementos de cart
    for (let i = 0; i < cart.length; i++) {
        cart[i].subtotalWithDiscount = cart[i].subtotal;
    }
    //aplico promociones a propiedad subtotalWithDiscount
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === 'cooking oil' && cart[i].quantity >= 3) {
            pricePromCookingOil = 10;
            cart[i].subtotalWithDiscount = cart[i].quantity * pricePromCookingOil;
            console.log(`Subtotal with discount of Cooking oil promotion: ${cart[i].subtotalWithDiscount}`);
        } else if (cart[i].name === 'Instant cupcake mixture' && cart[i].quantity >= 10) {
            pricePromCupcakeMixture = Math.ceil(cart[i].price * (2 / 3));
            cart[i].subtotalWithDiscount = cart[i].quantity * pricePromCupcakeMixture;
            console.log(`Subtotal with discount of Instant cupcake mixture promotion: ${cart[i].subtotalWithDiscount}`);
        } else
            cart[i].subtotalWithDiscount = cart[i].subtotal;
    }
    //añado propiedad totalCart a todos los elementos de cart
    for (let i = 0; i < cart.length; i++) {
        cart[i].totalCart = cart[i].subtotalWithDiscount;
    }
    console.log(cart);
}

// Exercise 8 lo comento para simplificar el programa
// function addToCart(id) {
// 1. Loop for to the array products to get the item to add to=cartList
// 2. Add found product to the cartList array
// addToCartList(id); 
// }





// // Exercise 10
// function printCart() {
//     // Fill the shopping=cartList modal manipulating the shopping=cartList dom
// }


// ************** otros ejercicios **************
// Exercise 3a - SUBTOTALS IN $ - declare variables
// function calculateSubtotalsValue() {
//     // 1. Create a for loop on the "cartList" array 
//     // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
//     let subtotalBeautyValue = 0;
//     let subtotalGroceryValue = 0;
//     let subtotalClothesValue = 0;
//     for (let i = 0; i < cartList.length; i++) {
//         switch (cartList[i].type) {
//             case 'grocery':
//                 subtotalGroceryValue += cartList[i].price;
//                 break;
//             case 'beauty':
//                 subtotalBeautyValue += cartList[i].price;
//                 break;
//             case 'clothes':
//                 subtotalClothesValue += cartList[i].price;
//                 break;
//             default:
//                 console.log('Error: el producte no té categoria');
//                 break;
//         }
//     }
//     console.log(subtotalGroceryValue);
//     console.log(subtotalBeautyValue);
//     console.log(subtotalClothesValue);
// }

// Exercise 3b - SUBTOTALS IN UNITS
function calculateSubtotalsUnits() {
    // 1. Create a for loop on the "cartList" array 
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
    let subtotalGrocery = [];
    let subtotalBeauty = [];
    let subtotalClothes = [];
    for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].type === 'grocery') {
            subtotalGrocery.push(cartList[i]);
        } else if (cartList[i].type === 'beauty') {
            subtotalBeauty.push(cartList[i]);
        } else if (cartList[i].type === 'clothes')
            subtotalClothes.push(cartList[i]);
    }
    console.log(`Subtotal Grocery = ${subtotalGrocery.length}`);
    console.log(`Subtotal Beauty = ${subtotalBeauty.length}`);
    console.log(`Subtotal Clothes = ${subtotalClothes.length}`);
}
//let subtotalGrocery = cartList.filter (cartList[i].type => cartList[i].type === 'grocery');

// //trepitja totes les propietats anterior, no serveix si el que volem és afegir quantity
// for (let i = 0; i < cart.length; i++) {
//    cart[i] = {
//         quantity: 1
//     }
// }

//*************eliminar elementos repetidos de un array --> objeto Set
// const cartUnique = new Set(cartList);
// let result=[...cartUnique];
// console.log(result);
//*************eliminar elementos repetidos de un array --> método filter e indexOf
// let result = (cartList.filter((item,index)=>{
//   return cartList.indexOf(item) === index;
// })
// console.log(result);