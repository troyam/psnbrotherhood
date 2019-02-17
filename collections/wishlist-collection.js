WishListCollection = new Mongo.Collection('wishlist');

WishListCollection.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

WishListCollectionSchema = new SimpleSchema({
    gameName: {
        type: String,
        label: "Game Name",
    },
    coverImage: {
        type: String,
        label: "Cover Image Link",
	},
	authorID: {
		type: String,
		label: "AuthorID",
		autoValue: function () {
			if (this.isInsert && (!this.isSet || this.value.length === 0)) {
				return this.userId;
			 }
		},
		autoform: {
			type: "hidden"
		}
	},
	authorName: {
		type: String,
		label: "AuthorName",
		autoValue: function () {
			if (this.isInsert && (!this.isSet || this.value.length === 0)) {
				return Meteor.user().username;
			 }
		},
		autoform: {
			type: "hidden"
		}
	}
});

Meteor.methods({
    'askRemoveWishGame':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var currentAccount = WishListCollection.findOne({_id:id});
            if (currentAccount.authorName == Meteor.user().username){
				return true; 
            }
        }
    },
    'removeWishGame':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var currentAccount = WishListCollection.findOne({_id:id});
            if (currentAccount.authorName == Meteor.user().username){
				WishListCollection.remove({_id:id});
				return true; 
            }
        }
	}
});

WishListCollection.attachSchema(WishListCollectionSchema);