if(Meteor.isClient){
	Accounts.onLogin(function(){
		console.log("Logged In");
		FlowRouter.go('accounts');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()) {
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/accounts', {
	name: 'accounts',
	action() {
		if(Meteor.userId()){
			FlowRouter.go('accounts');
		}
		BlazeLayout.render('MainLayout', {main: 'PsnAccounts'});
	}
});

FlowRouter.route('/wishlist', {
	name: 'wishlist',
	action() {
		BlazeLayout.render('MainLayout', {main: 'WishList'});
	}
});