Template.PsnAccount.onCreated(function(){
	this.showGamesList = new ReactiveVar(false);
});


Template.PsnAccount.helpers({
  showGamesList: function(){
		return Template.instance().showGamesList.get();
	},
	bothTrue:function(a, b){
		return a && b
	},
	orTrue:function(a, b){
		return a || b
	},
	isOwnerMain:function(author, main){
		if (Meteor.user()){
		if(Meteor.user().username == author && main){
				return true;
			};
		}
	},
	isOwner:function(author){
        if (Meteor.user()){
           if(Meteor.user().username == author){
			   return true;
		   };
        }
	},
	isPrimaryUser:function(user){
        if (Meteor.user()){
           if(Meteor.user().username == user){
			   return true;
		   };
        }
	},
	isSecondaryUser:function(user){
        if (Meteor.user()){
           if(Meteor.user().username == user){
			   return true;
		   };
        }
	},
	currentUser: function() {
		return Meteor.user().username;
	  }
});


Template.PsnAccount.events({
	'click .show-games': function (event, template) {
		event.preventDefault();
		template.showGamesList.set(!template.showGamesList.get());
	},
	'click .btn-apply-primary': function (event) {
		event.preventDefault();
		Meteor.call('applyForPrimary', this._id);
	},
	'click .btn-cancel-primary': function (event) {
		event.preventDefault();
		Meteor.call('cancelPrimary', this._id);
	},
	'click .btn-apply-secondary': function (event) {
		event.preventDefault();
		Meteor.call('applyForSecondary', this._id);
	},
	'click .btn-cancel-secondary': function (event) {
		event.preventDefault();
		Meteor.call('cancelSecondary', this._id);
	},
});
