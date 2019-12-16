class SuperType {
  constructor() {}

  add() {}
}

class ChildType extends SuperType {}

console.log(ChildType.__proto__);

// ChildType.__proto__ === SuperType
