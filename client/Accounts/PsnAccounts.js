Template.PsnAccounts.events({
	/* 'click .new-account': () => {
		Session.set('newPsnAccount', true);
	}, */
	/* 'click .del-account':function(){
       		Meteor.call('removePsnAccount', this._id);
	} */
	'click .del-account':function(event){
		const id = this._id;
		console.log(id);
		
        Meteor.call('askRemovePsnAccount', id, function(err, res){
            if (!res){
		//alert('Can only delete your own ones...');
		swal('Can only delete your own ones...', 'error');
            } else {
		swal({
			title: 'Are you sure?',
			text: 'You will not be able to recover this imaginary file!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
		if (result.value) {
			swal(
			'Deleted!',
			'Your imaginary file has been deleted.',
			'success'
			)
			Meteor.call('removePsnAccount', id);
		// result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
		} else if (result.dismiss === 'cancel') {
			swal(
			'Cancelled',
			'Your imaginary file is safe :)',
			'error'
			)
		}
		})
	    }
        });
	}
	
});

Template.PsnAccounts.onCreated(function(){
	var self = this;
	self.autorun(function() {
		self.subscribe('psnaccounts');
	});
});

Template.PsnAccounts.helpers({
	psnaccounts: ()=> {
		return PsnAccountsCollection.find({});
	},
	currentUser: function() {
		return Meteor.user().username;
	  }
});

