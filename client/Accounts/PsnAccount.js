Template.PsnAccount.onCreated(function(){
	this.showGamesList = new ReactiveVar(false);
});


Template.PsnAccount.helpers({
  showGamesList: function(){
		return Template.instance().showGamesList.get();
	}
});


Template.PsnAccount.events({
	'click .show-games': function (event, template) {
		template.showGamesList.set(!template.showGamesList.get());
	}
});
