var cobra = new Cobra();
var room = "Testage";
var url = null;
var socketId = null;
var apiUrl = 'http://cobra-framework.com:3000/api/events/' + room;
//cobra.connect("http://cobra-framework.com:8080");

cobra.connectionCallback = function(){
    cobra.joinRoom(room);
    console.log("connectionSuccess");
};

cobra.joinRoomCallback = function(){
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
                var note = new Note(content.message.title);
                note.creation(content.message.content, content.message.user, content.message.date);
                if (content.message.action == "suppressionNote") {
                    note.suppressionNote();
                }
            }
        }
    });
};

cobra.messageReceivedCallback = function(message){
    if(message.type == "infos"){
        console.log("infos");
        for(var i = 0; i < message.clients.length; i++)
        {
            var client = message.clients[i];
        }
        socketId = message.socketId;
        console.log("infos1111");
    }
    else {
        if (message.message.action == "ajoutOuModification"){
            console.log("Ajout de note.");
            if (socketId == message.socketId) {
                var note = new Note(message.message.title);
                console.log("La note est créé : " + message.message.title);
                note.creation(message.message.content, message.message.user, message.message.date);
            }
            else {
                var note = new Note(message.message.title);
                note.creation(message.message.content, message.message.user, message.message.date);
            }
        }
        else{
            if (message.message.action == "suppressionNote"){
                console.log("suppressionNote");
                if (socketId == message.socketId) {
                    var note = new Note(message.message.title);
                    console.log('On va supprimer la note : ' + message.message.title);
                    note.suppressionNote();
                    console.log('Bonne suppression de : ' + message.message.title);
                }
                else {
                    var note = new Note(message.message.title);
                    note.suppressionNote();
                }
            }
        }
    }
};