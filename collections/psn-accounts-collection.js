PsnAccountsCollection = new Mongo.Collection('psnaccounts');

PsnAccountsCollection.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

PsnAccountsCollectionSchema = new SimpleSchema({
	accountName: {
        type: String,
        label: "Account Name",
        max: 200
	},
	onlineId: {
        type: String,
        label: "Online ID",
	},
	emailAddress: {
        type: String,
		label: "Email",
		regEx: SimpleSchema.RegEx.Email,
	},
	password: {
        type: String,
		label: "Account Password",
	},
	mainAccount: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	primaryAccess: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	secondaryAccess: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	games: {
		type: Array,
		optional: true,
		minCount: 1,
		maxCount: 10
	},
	'games.$': {
		type: String
	},
	authorID: {
		type: String,
		label: "AuthorID",
		autoValue: function () {
			return this.userId;
		},
		autoform: {
			type: "hidden"
		}
	},
	authorName: {
		type: String,
		label: "AuthorName",
		autoValue: function () {
			return Meteor.user().username;
		},
		autoform: {
			type: "hidden"
		}
	}
});





/* Meteor.methods({
     'removePsnAccount':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var currentAccount = PsnAccountsCollection.findOne({_id:id});
            if (currentAccount.authorName == Meteor.user().username){
				PsnAccountsCollection.remove({_id:id});
				return true;
            } else {
				alert("You can only delete owned accounts!");
				return false;
			}
        }
    } 
}); */


Meteor.methods({
	'showGameList': function(id, currentState){
		PsnAccountsCollection.update(id, {
			$set: {
				showGames: !currentState
			}
		});
	},
    'askRemovePsnAccount':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var currentAccount = PsnAccountsCollection.findOne({_id:id});
            if (currentAccount.authorName == Meteor.user().username){
				return true; 
            }
        }
    },
    'removePsnAccount':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var currentAccount = PsnAccountsCollection.findOne({_id:id});
            if (currentAccount.authorName == Meteor.user().username){
				 PsnAccountsCollection.remove({_id:id});
				return true; 
            }
        }
    }
});



PsnAccountsCollection.attachSchema(PsnAccountsCollectionSchema);