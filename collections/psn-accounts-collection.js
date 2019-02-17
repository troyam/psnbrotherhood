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
	mainAccount: {
		type: Boolean,
		defaultValue: false,
		optional: true
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
	primaryAccess: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	primaryAvaliable: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoValue: function () {
			if(this.field("primaryAccess").value == false){
				return false;
			}
		},
	},
	primaryUser:{
		type: String,
		label: "Primary Access User",
		optional: true,
		defaultValue: "No Current User"
	},
	secondaryAccess: {
		type: Boolean,
		optional: true,
		autoValue: function () {
			if(this.field("mainAccount").value == true){
				return false;
			}
		},
	},
	secondaryAvaliable: {
		type: Boolean,
		optional: true,
		autoValue: function () {
			if(this.field("mainAccount").value === true){
				return false;
			} else if(this.field("secondaryAccess").value == false){
				return false;
			}
		},
	},
	secondaryUser:{
		type: String,
		label: "Secondary Access User",
		optional: true,
		defaultValue: "No Current User",
		autoValue: function () {
			if(this.field("mainAccount").value === true){
				return Meteor.user().username;
			}
		}
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
	},
	'applyForPrimary':function(id){
		if (!Meteor.user()){
            return;
        } else {
			var currentAccount = PsnAccountsCollection.findOne({_id:id});
			if (currentAccount.primaryUser == "No Current User"){
				PsnAccountsCollection.update(
					{ _id: id },
					{ $set:
					   {
						primaryAvaliable: false,
						primaryUser: Meteor.user().username,
					   }
					}
				 )
			   	return true; 
		   }
		}
	},
	'cancelPrimary':function(id){
		if (!Meteor.user()){
            return;
        } else {
			var currentAccount = PsnAccountsCollection.findOne({_id:id});
			if (currentAccount.primaryUser == Meteor.user().username){
				PsnAccountsCollection.update(
					{ _id: id },
					{ $set:
					   {
						primaryAvaliable: true,
						primaryUser: "No Current User",
					   }
					}
				 )
			   	return true; 
		   }
		}
	},
	'applyForSecondary':function(id){
		if (!Meteor.user()){
            return;
        } else {
			var currentAccount = PsnAccountsCollection.findOne({_id:id});
			if (currentAccount.secondaryUser == "No Current User"){
				PsnAccountsCollection.update(
					{ _id: id },
					{ $set:
					   {
						secondaryAvaliable: false,
						secondaryUser: Meteor.user().username,
					   }
					}
				 )
			   	return true; 
		   }
		}
	},
	'cancelSecondary':function(id){
		if (!Meteor.user()){
            return;
        } else {
			var currentAccount = PsnAccountsCollection.findOne({_id:id});
			if (currentAccount.secondaryUser == Meteor.user().username){
				PsnAccountsCollection.update(
					{ _id: id },
					{ $set:
					   {
						secondaryAvaliable: true,
						secondaryUser: "No Current User",
					   }
					}
				 )
			   	return true; 
		   }
		}
	}
});

PsnAccountsCollection.attachSchema(PsnAccountsCollectionSchema);


