Template.NewPsnAccount.events({
	'click .new-psn-account-close': () => {
		Session.set('newPsnAccount', false);
	}
});

/* AutoForm.hooks({
	newPsnAccountForm: {
		onSuccess: function () {
			console.log("New Psn Account Added!");
			Session.set('newPsnAccount', false);
		  }
	}
}); */