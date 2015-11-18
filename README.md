# sampleClassGetter
just a sample of ES6 class getters and meteor collections

By loading the related data through the getter reactivity does not get broken. It also makes it possible to be more specific in the moment of getting the extra data (button click, template rendering done, whatever) because the getter is turned into a function on the object prototype that doesn't get invoked until you explicitly call it.

Easy and fun :D

``` javascript
Animal = class Animal {
  constructor( data ) {
    this.name = data.name;
    this._owner = data._owner;
  }
  get owner() {
    return Owners.findOne({ _id: this._owner });
  }
};

Animals = new Meteor.Collection( "animals", {
  transform: ( doc ) => new Animal( doc )
});
```

Running at sampleClassGetter.meteor.com but to test it you will have to play with the console a bit.
