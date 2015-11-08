
var cobra = new Cobra();
var room = "weCreateNote";
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
            var note = new Note();
            note.creation(message.message.title, message.message.content, message.message.user, message.message.date);
        }
        else {
            var note = new Note();
            note.creation(message.message.title, message.message.content, message.message.user, message.message.date);
        }
    }
}