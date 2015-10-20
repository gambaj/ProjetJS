
        var cobra = new Cobra();
        var room = "weCreateNote";
        var url = null;
        var socketId = null;
	    var apiUrl = 'http://cobra-framework.com:3000/api/events/' + room;


        cobra.connectionCallback = function(){
            cobra.joinRoom(room);
        };

        cobra.joinRoomCallback = function (roomName) {
           // appel à l'API pour récupérer tous les messages de la room roomName
           $.ajax({
              type: 'GET',
              url: apiUrl,
              success: function () {
                  console.log("success");
              },

              error: function () {
                  console.log("error when retrieve events");
              },

              complete: function (result, status) {
                  console.log("complete");

                  for (var i = 0; i < result.responseJSON.Events.length; i++) {
                     var content = JSON.parse(result.responseJSON.Events[i].content);
                      creationNote(content.message.title, content.message.content, content.message.user, content.message.date);
                  }

                  // Pour envoyer un message dans toute la room
                  //cobra.sendMessage({content : "test"}, room, true);

                  // Pour envoyer un message dans toute la room excepté soi
                  // cobra.sendMessage({content : "test"}, room, false);
              }
          });
        }

        cobra.messageReceivedCallback = function(message){
            if(message.type == "infos"){
                socketId = message.socketId;
            }
            else{
                if (socketId == message.socketId) {
                    creationNote(message.message.title, message.message.content, message.message.user, message.message.date);
                }
                else {
                    creationNote(message.message.title, message.message.content, message.message.user, message.message.date);
                }
            }

        };

        $(document).ready(function () {
            $("#valider").click(function(){
                sendMsg();
            }) ;

            var sendMsg = function(){
                var title = $("#textInputTitle").val();
                var content = $("#textInputText").val();
                var user = $("#textInputSession").val();
                var date = $("#textInputDate").val();
                if(title && content && user && date) {
                    var message={title:title, content: content, user: user, date: date};
                    cobra.sendMessage(message, room, true);
                    $("#textInputTitle").val("");
                    $("#textInputText").val("");
                    //$("#textInputSession").val("");
                    $("#textInputDate").val("");
                    $("#textInputTitle").focus();
                }
            }

            $("#buttonConnexion").click(function(){
                var user=$("#textInputSession").val();
                if(user){
                    cobra.connect("http://cobra-framework.com:8080");
                }
                else{
                    alert("Veuillez saisir votre nom pour connecter!");
                }
            }) ;
        });

