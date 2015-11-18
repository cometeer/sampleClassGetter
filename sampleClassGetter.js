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

Owners = new Meteor.Collection( "owners" );

if ( Meteor.isClient ) {

  Template.animals.helpers({
    animals: () => Animals.find()
  });
}

if ( Meteor.isServer ) {
    if ( Animals.find().count() < 1 ) {

      var ownerId = Owners.insert({
        name: "Joe the farmer"
      }, ( err, docsInserted ) => {
        return docsInserted;
      });

      Animals.insert({
        name: "Cow",
        _owner: ownerId
      });

    }
}
