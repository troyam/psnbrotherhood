Template.WishGame.helpers({
      isOwner:function(author){
          if (Meteor.user()){
             if(Meteor.user().username == author){
                 return true;
             };
          }
      },
  });