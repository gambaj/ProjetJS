
        var cobra = new Cobra();
        var room = "chat";
        var url = null;
        var socketId = null;

        cobra.connect("http://cobra-framework.com:8080");

        cobra.connectionCallback = function(){
            cobra.joinRoom(room);
        };

        cobra.joinRoomCallback = function(){
            //cobra.sendMessage({type:"join", login:login},room);
        };

        cobra.messageReceivedCallback = function(message){
            console.log("message received callback");
            if(message.type == "infos"){
                console.log("infos");
                for(var i = 0; i < message.clients.length; i++)
                {
                    var client = message.clients[i];
                }
                socketId = message.socketId;
                console.log("infos1111");
            }
            else{
                console.log("else");
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
                    $("#textInputSession").val("");
                    $("#textInputDate").val("");
                    $("#textInputTitle").focus();
                }
            }
        });

