//A
var boys = ["Peter", "lars", "Ole"];
var girls = ["Janne", "hanne", "Sanne"];
//B
var all = boys.concat(girls);
//C
var allComma = all.join(",");
console.log(allComma);
var allHyphen = all.join("-");
console.log(allHyphen);

//D
all.push("Lone", "Gitte");
console.log(all);
//E
all.unshift("Hans", "Kurt");
console.log(all);
//F
all.shift();
console.log(all);
//g
all.pop();
console.log(all);
//h
all.splice(2, 2);
console.log(all);
//i
all.reverse();
console.log(all);
//j
all.sort();
console.log(all);
//l
var upperCase = function (name) {
    return name[0].toUpperCase() + name.slice(1);
};
var upperCaseAll = all.map(upperCase);
console.log(upperCaseAll);
//m
var filterLetter = function (name) {
    if (name[0] === "l" || name[0] === "L") {
        return true;
    }
    return false;
};
var allWithL = all.filter(filterLetter);
console.log(allWithL);