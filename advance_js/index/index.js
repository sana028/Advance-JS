// closure
const parent = () => {
  const obj = {
    a: 1,
    b: 2,
  };

  return child((this.name = "sana"));
};

const child = () => {
  console.log(this);
  let x = 5;
  const insertChild = () => {
    console.log(this, (x += 5));
    console.log("child method");
  };
  return insertChild;
};
console.log(parent());
const result = parent();
result();
result();

//FUNCTION Expressions (IIFE-Immendiately invoked function expressions)

const example = ((count) => {
  console.log("ds", count);
  return () => console.log("sana");
})(4);
example();

//__proto__
const music = {
  name: "Sana",
};
const lyrics = {
  song: "I love you",
};

music.lyrics = lyrics; //we need to fetch it from music.lyrics.song
console.log(music.lyrics.song, "music.lyrics.song");
music.__proto__ = lyrics;
console.log(music.song, "music proto");
console.log(music);

const section = {
  name: "John",
};
Object.setPrototypeOf(lyrics, section);
console.log(lyrics.name); // it doesn't show the name prop but it store the data as a proto in lyrics object

//? on what places we can use this proto types?

//rather than use __proto__ we can use object.setPrototypeof(music,lyrics)

const gitar = {
  count: 2,
  __proto__: lyrics,
};

console.log(gitar.count);
console.log(gitar.song);
console.log(gitar.name);
console.log(gitar);

//HOF (higher order functions)

const HOF = (funct) => {
  return (...args) => {
    console.log("calling args", args, funct);
    return funct(...args);
  };
};

const add = (a, b) => {
  return a + b;
};

const adding = HOF(add);
console.log(adding(8, 2));

//Curry

const currying = (func) => {
  return function (a) {
    return function (b) {
      return function (c) {
        return func(a, b, c);
      };
    };
  };
};

const addCurry = (a, b, c) => {return a + b + c};

const Example1 = currying(addCurry);
const Example2 = Example1(5)(4) (6);

console.log(Example2);

const generator=10
const yield1=(i)=>{
    return i;
}

const yield2=(i)=>{
    return i+10;
}

const yield3=(i)=>{
    return i+1+2
}

//Generators

function * generatorsList(i){
    yield i
    yield i+10
    yield i+1+2
}

const i=10
const gen=generatorsList(i)
console.log(yield1(i))
console.log(gen.next().value)
console.log(gen.next().value)

