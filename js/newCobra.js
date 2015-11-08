
var cobra = new Cobra();
var room = "testProjetJS_Hakimi";
var url = null;
var socketId = null;
var apiUrl = 'http://cobra-framework.com:3000/api/events/' + room;
//cobra.connect("http://cobra-framework.com:8080");

cobra.connectionCallback = function(){
    cobra.joinRoom(room);
    console.log("connectionsuccess");
};

cobra.joinRoomCallback = function(){
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
                var note = new Note();
                note.creation(content.message.title, content.message.content, content.message.user, content.message.date);
            }

            // Pour envoyer un message dans toute la room
            //cobra.sendMessage({content : "test"}, room, true);

            // Pour envoyer un message dans toute la room excepté soi
            // cobra.sendMessage({content : "test"}, room, false);
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
            console.log("else");
            if (socketId == message.socketId) {
                var note = new Note();
                note.creation(message.message.title, message.message.content, message.message.user, message.message.date);
            }
            else {
                var note = new Note();
                note.creation(message.message.title, message.message.content, message.message.user, message.message.date);
            }
        }
        else{
            if (message.message.action == "suppressionNote"){
                console.log("else");
                if (socketId == message.socketId) {
                    var note = new Note();
                    note.suppressionNote(message.message.title);
                }
                else {
                    var note = new Note();
                    note.suppressionNote(message.message.title);
                }
            }
        }
    }
}

$(document).ready(function () {
    $("#valider").click(function(){
        sendMsg();
    }) ;

    var sendMsg = function(){
        var action="ajoutOuModification";
        var title = $("#textInputTitle").val();
        var content = $("#textInputText").val();
        var user = $("#textInputSession").val();
        var date = $("#textInputDate").val();
        if(title && content && user ) {
            var message={action:action,title:title, content: content, user: user, date: date};
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
            alert("Veuillez saisir votre nom pour ouvrir une session!");
        }
    }) ;

    $("#buttonSuppression").click(function(){
        sendMsgSup();
    }) ;

    var sendMsgSup = function(){
        var action="suppressionNote";
        var title = $("#textInputNote").val();
        if(title) {
            var message={action:action,title:title};
            cobra.sendMessage(message, room, true);
            $("#textInputNote").val("");
        }
    }

});