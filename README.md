# Mixin Descriptors

This library is an enhance version of  another library called  [merge-descriptors](https://github.com/component/merge-descriptors). It merges objects property descriptors(fields & methods). This enhanced version enables, 

- The merge of specific property fields or methods 
- The merge of  property fields only or property methods only
- The redifinition of properties fields or methods based on a boolean value (similar to merge-descriptors)

##  Description

The library has only one function called **`mixin`**, it takes the following as arguments, 

```javascript

mixin( destination ,source ,redefine=true ,settings={} ,selectedDescriptors=[] )

```

- **`dest`** : The object to which the **`source`** properties will be added or merged.

  

- **`source`** : The object from which the properties will be cloned

  

- **`redefine`**: A boolean value, which determines whether we want to redefine the **`destination`** properties  who have similar names with the **`source`** properties

  - Set it to **`true`** to redefine the properties  of **`destination`** and to **`false`** to  keep the **`original`** properties.
  - By default, **`redefine`** is set to **`true`**.

  

- **`setting`**: Its an object enables us to choose whether we want to merge only property fields or methods or both. It has two properties: **`fields`** and **`methods`**

  - **`fields`** if set to **`true`**,   the property fields of the **`source`** will be added to that of **`destination`**, and if **`false`**  the property fields of the **`source`** will be excluded.
  - **`methods`**: if set to **`true`**, the property methods of the **`source`** will be added to that of **`destination`**, and if **`false`**  the property methods of the **`source`** will be excluded.
  - By default, **`fields`** and **`methods`** are set to **`true`**
  - setting must have at least one property either `fields` or `methods`  or both.
  - The **`mixin`**  function throws an error if the other names are used instead of `fields`and **`methods`** 

  

- **`selectedDescriptors`**: An array of  string with the **`names`** of the  specific`source`‘s properties’ we want to add to the **`destination`**. 

  - **<u>Note</u>** : Only the **`properties`**  of  **`source`** with the `names`  given in **`selectedDescriptors`** array  will be added, all the other `source` properties will be excluded
  - The merge of  **`names`** will depend on the parameters of **`settings`**
  - The **`mixin`** function will throw a ReferenceError if the **`names`** being passed aren’t present in the **`source`**'s properties.

  

## Usage

### 1 .  **mixin(destination,source)**

- example 1:  

```javascript
const mixin = require("mixin");

let person1 = {
	fullname: "john Doe",
	email:"john@gmail.com",
	getfullName (){
		return this.fullname;
	}
}

let let person2 = {
    setfullName(fullname){
        this.fullname = fullname;
    },
    sayHello(){
        return `hello, I am ${this.fullname}`
    }
}

mixin(person1,person2)  // merges properties of person 2 to person 1

person1.setfullName("Dcrativ");
console.log(person1.getfullName); // Dcrativ
console.log(person1.sayHello()) // hello, I am Dcrativ

```



- example 2:

```javascript
const mixin = require("mixin");

class Person{
	constructor(personInfo){
        mixin(this,personInfo);
    }
    dummy(){
        return "Dummy method";
    }
}

let person1 = {
    name:"Dcrativ",
    surnmae:"Dev",
    sayHello(){
        return `Hello I am ${this.name} ${this.surname}`;
    }
}

const newPerson1 = new Person(person1);

console.log(newPerson1.sayHello()); // Hello I am Dcrativ Dev
```



### 2 .  **mixin(destination,source,redefine)**

- example1

```javascript
let person1 = {
	name: "john Doe"
	email:"john@gmail.com"
	isDone: false,
    isMarried: false
}

let let person2 = {
    name:"Jake smith",
    email:"jk@gmail.com",
    passord:"jibberish-hash",
    sayHi(){
        return "Hi"
    }
}

//redefine : true
mixin(person1,person2,true) //  mixin(person1,person2), redefines person1, since redefine is true by default

console.log(person1.name, person1.email); // Jake smith, jk@gmail.com
console.log(person1.sayHi()) // Hi


//
mixin(person1,person2,false) 
console.log(person1.name, person1.email); // John Doe, john@gmail.com
console.log(person1.sayHi()) // Hi
```



- example 2:

```javascript
const mixin = require("mixin");

class ObjA {
	constructor (param) {
		this.name = "default";
		mixin(this, param, false);
	}
	getHello () {
		return "hello";
	}

}

let objB = {
	name: "hello Dummy Name",
	get dummyName () {
		return this.name;
	},
	set dummyName (name) {
		this.name = name;
	},
};

const test = new ObjA(objB);

console.log(test.name); // "default"
console.log(test.dummyName); // "hello Dummy Name"
```



### 3 .  mixin(destination, source, redefine, setting)

- example1

```javascript
const mixin = require("mixin");

let person1 = {
	fullname: "john Doe",
	email:"john@gmail.com",	
}

 let person2 = {
    get fullName (){
		return this.fullname;
	}
    set fullName(fullname){
        this.fullname = fullname;
    },
    sayHello(){
        return `hello, I am ${this.fullname}`
    }
}
console.log(person1.fullName); //undefined
mixin(person1,person2,false,{methods: true}) /* is equivalient to 
mxin(person1,person2, false, {fields:false, methods:true})*/

person1.fullName
console.log(person1.fullName); // John Doe
```



- example 2:

```javascript

const mixin = require("mixin");

const mixin = require("./index");

let person1 = {
	get fullName () {
		return this.fullname;
	},
	set fullName (fullname) {
		this.fullname = fullname;
	},
}

let person2 = {
	fullname: "john Doe",
	email: "john@gmail.com",
	sayHello () {
		return `hello, I am ${this.fullname}`
	}
}
console.log(person1.fullName); //undefined
mixin(person1, person2, false, { fields: true }); /* is equivalient to 
mxin(person1,person2, false, {fields:true, methods:false}) */

console.log(person1.fullName) // John Doe
console.log(person1.sayHello()) // TypeError, person1.sayHello is not a function...
```



### 4 .  **mixin(destination, source, redefine , setting , selectedDescriptors )**



```javascript
const mixin = require("./index");
const methods = ["m1", "m2", "m3", "m4", "m5"];

function Person () {

	fullName = function () {
		return this.fullname;
	}
	methods.forEach((name) => {
		this[name] = function () {
			return `Dynamically created - ${name} - method  called`;
		}
	});
}

let person1 = {
	fullname: "john Doe",
	email: "john@gmail.com",
	sayHello () {
		return `hello, I am ${this.fullname}`
	}
} 

mixin(person1, new Person(), false, { methods: true }, ["m3", "m4"]);
console.log(person1.m3());  // Dynamically created - m3 - method called
console.log(person1.m4());  // Dynamically created - m4 - method called

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)



