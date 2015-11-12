
var cobra = new Cobra();
var room = "noteSCJ";
var url = null;
var socketId = null;
var apiUrl = 'http://cobra-framework.com:3000/api/events/' + room;

cobra.connectionCallback = function(){
    cobra.joinRoom(room);
    console.log("connection success to room " + room);
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
        if (message.message.action == "connexion") {
            console.log("Connexion.");
            if (socketId != message.socketId) {
                var fonction = new NoteFonction();
                fonction.notifierConnexion(message.message.user);
            }
        }
        else if (message.message.action == "ajoutOuModification"){
            console.log("Ajout de note.");
            if (socketId == message.socketId) {
                var note = new Note(message.message.title);
                note.creation(message.message.content, message.message.user, message.message.date);

                if (note.existant == true) {
                    note.notifierNoteExistante(message.message.title);
                } else {
                    note.notifier("ajout");
                }
            }
            else {
                var note = new Note(message.message.title);
                note.creation(message.message.content, message.message.user, message.message.date);

                if (note.existant == false) {
                    note.notifierUtilisateur(message.message.user, "ajout");
                }
            }
        }
        else if (message.message.action == "suppressionNote"){
            console.log("Suppression de note.");
            if (socketId == message.socketId) {
                var note = new Note(message.message.title);
                note.suppressionNote();
                note.notifier("suppression");
            }
            else {
                var note = new Note(message.message.title);
                note.suppressionNote();
                note.notifierUtilisateur(message.message.user, "suppression");
            }
        }
    }
};