//1
//Observe: no return type, no type on parameters
function add(n1, n2) {
    if (typeof n1 === "number" && typeof n2 === "number") {
        return n1 + n2;
    }
    return "bad parameters";
}

var sub = function (n1, n2) {
    return n1 - n2;
};

var mul = function (n1, n2) {
    return n1 * n2;
};

var cb = function (n1, n2, callback) {
    if (typeof n1 !== "number") {
        throw new Error("parameter 1 bad");
    } else if (typeof n2 !== "number") {
        throw new Error("parameter 2 bad");
    } else if (typeof callback !== "function") {
        throw new Error("parameter 3 bad");
    } else {
        return "Result from the two numbers: " + n1 + "+" + n2 + "=" + callback(n1, n2);
    }
};
//2
console.log(add(1, 2)); // What will car print? - 3
console.log(add); // What will it print and what does add represent? - it prints the defined function. add is the function name
console.log(add(1, 2, 3)); // What will it print -  3, only takes two arguments
console.log(add(1)); // What will it print - it wil crash because it cant find n2
console.log(cb(3, 3, add)); // What will it print - result from the two numbers: 3+3=6
console.log(cb(4, 3, sub)); // What will it print - result frmo the two numbers: 4-3=1
//3 error handling:
try { // What will it print (and what was the problem) - crashes, the add is not a reference, so it thinks its a new function?
    console.log(cb(3, 3, add()));
} catch (e) {
    console.log(e);
}
// What will it print - 3hh, because of type cohesion. + exists for string, therefor the result is the same as a string + a string.
try {
    console.log(cb(3, "hh", add));
} catch (e) {
    console.log(e);
}
console.log(cb(5, 5, mul));

//Callbacks with map, filter and forEach
var names = ["Lars", "Jan", "Bo", "Frederik", "Peter"];
var namesUnder4 = names.filter(function (name) {
    return name.length < 4;
});
console.log(names);
console.log(namesUnder4);

var namesCaps = function (name) {
    return name.toUpperCase();
};
var allNamesInCaps = names.map(namesCaps);
console.log(allNamesInCaps);

//3
var cbList = function (name) {
    return "<li>" + name + "</li>";
};

var li = names.map(cbList);
var ul = "<ul>\n" + li.join("") + "</ul>";
console.log(ul);

//4
var cars = [{
    id: 1,
    year: 1997,
    make: "Ford",
    model: "E350",
    price: 3000
},
{
    id: 2,
    year: 1999,
    make: "Chevy",
    model: "Venture",
    price: 4900
},
{
    id: 3,
    year: 2000,
    make: "Chevy",
    model: "Venture",
    price: 5000
},
{
    id: 4,
    year: 1996,
    make: "Jeep",
    model: "Grand Cherokee",
    price: 4799,
},
{
    id: 5,
    year: 2005,
    make: "Volvo",
    model: "V70",
    price: 44799
}
];

var carFilter = function (array, filterType, filterValue) {
    switch (filterType) {
    case "make":
        return cars.filter(function (car) {
            return car.make === filterValue;
        });
    case "newerThan":
        return cars.filter(function (car) {
            return car.year > filterValue;
        });
    case "priceLessThan":
        return cars.filter(function (car) {
            return car.price < filterValue;
        });
    }
};
console.log(carFilter(cars, "make", "Jeep"));
console.log(carFilter(cars, "priceLessThan", 5000));


//4a
var carString = function (car) {
    return car.id + "," + car.year + "," + car.make + "," + car.model + "," + car.price;
};

var carSql = function (car) {
    var sql = "INSERT INTO cars (id,year,make,model,price) VALUES (" + carString(car) + ");";
    console.log(sql);
    return sql;
};
console.log("all cars in sql");
cars.forEach(carSql);



//Asynchronous callbacks
//1
// i expect the order of the letters to be:
//aaa
//ddd
//fff
//eee with 1 sec delay
//bbb with 1 sec delay more
//2
var msgPrinter = function (msg, delay) {
    setTimeout(function () {
        console.log(msg);
    }, delay);
};
console.log("aaaaaaaaaa");
msgPrinter("bbbbbbbbbb", 2000);
console.log("dddddddddd");
msgPrinter("eeeeeeeeee", 1000);
console.log("ffffffffff");

//i was right :)
//This and constructor funtions
//1 + 3
function Person(name) {
    this.name = name;
    //var self = this;
    console.log("Name: " + this.name);
    setTimeout(function () {
        console.log("Hi " + this.name); //Explain this - runs the code in the setTimeout function after the given delay in ms here 2 sec. 
        // this.name refers to inside this codeblock, therefore it is undefined.
    }.bind(this), 2000);
}
//call it like this (do it, even if you know it’s silly ;-)
var p = new Person("Kurt Wonnegut"); //This calls the function
//console.log("I'm global: " + name); //Explain this - the name set on person on the line above set the global variable name to the given string.
//2
//reference eror: name not defined. now we dont define the name in the global scope, but actually for the person object p.

//4
var greeter = function () {
    console.log(this.message);
};
var comp1 = {
    message: "Hello World"
};
var comp2 = {
    message: "Hi"
};

var g1 = greeter.bind(comp1); //We can store a reference, with a specific “this” to use
var g2 = greeter.bind(comp2); //And here another “this”
setTimeout(g1, 500);
setTimeout(g2, 1000);

//Javascript objects
//1
var myself = {
    name: "Kasper",
    lastName: "Breindal",
    age: 20,
    sex: "male"
};
for (value in myself) {
    console.log(value, myself[value]);
}
delete myself.lastName;

for (value in myself) {
    console.log(value, myself[value]);
}
myself.coolfactor = "toplevel";
for (value in myself) {
    console.log(value, myself[value]);
}
//2 
function person(first, last, age) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    //this.getInfo = funtion() {
    //   return "name: " + this.firstName + " " + this.lastName + "age: " + this.age;
    // }
}