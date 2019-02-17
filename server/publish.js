Meteor.publish('psnaccounts', function(){
	//return Recipes.find({authorID: this.userId});
	return PsnAccountsCollection.find({});
});

Meteor.publish('wishlist', function(){
	return WishListCollection.find({});
});

