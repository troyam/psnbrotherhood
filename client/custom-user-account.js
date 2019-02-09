if (Meteor.isClient) {
    Template.signup.events({
      'submit form': function(event) {
        event.preventDefault();
        var userVar = event.target.signupUsername.value;
        var emailVar = event.target.signupEmail.value;
        var passwordVar = event.target.signupPassword.value;
        Accounts.createUser({
          username: userVar,
          email: emailVar,
          password: passwordVar
        });
      }
    });
    Template.login.events({
      'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
        //FlowRouter.go('accounts');
      }
    });

    Accounts.onLogin(function(){
      console.log("Logged In");
      FlowRouter.go('accounts');
    });
  
    Accounts.onLogout(function(){
      FlowRouter.go('home');
    });
  }
  
  if (Meteor.isServer) {
    Meteor.startup(function () {
      // code to run on server at startup
    });
  }