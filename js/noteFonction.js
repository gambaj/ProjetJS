// Définition de l'objet NoteFonction qui contient les fonctionnalités spécifiques aux notes.
function NoteFonction() {

}

NoteFonction.prototype = {

    initialiser:function () {
        this.generateImages();
        this.generateNotesCobra();
        this.generateOverview();
        this.generateNotesSupCobra();
        this.generateConnexion();
    },

    /**
     * Cette fonction telecharge l'image du diagramme de post-it.
     */
    generateImages:function() {
        $("#buttonImpression").click(function() {
            var imgData = monDiagramme.makeImageData({
                scale: 1
            });

            jQuery("#imgLink").attr('href', imgData);
            jQuery("#imgLink")[0].click();
        });
    },

    /**
     * Cette fonction envoie un message à Cobra contenant les valeurs de champs du formulaire et affiche la note.
     */
    generateNotesCobra:function() {
        $("#valider").click(function(){
            var action="ajoutOuModification";
            var title = $("#textInputTitle").val();
            var content = $("#textInputText").val();
            var user = $("#textInputSession").val();
            var date = $("#textInputDate").val();
            if(title && content && user ) {
                var message={action:action,title:title, content: content, user: user, date: date};
                cobra.sendMessage(message, "Testage", true);
                $("#textInputTitle").val("");
                $("#textInputText").val("");
                //$("#textInputSession").val("");
                $("#textInputDate").val("");
                $("#textInputTitle").focus();
            }
        });
    },

    generateNotesSupCobra:function() {
        $("#buttonSuppression").click(function(){
            var action="suppressionNote";
            var title = $("#textInputNote").val();
            if(title) {
                var message={action:action,title:title};
                cobra.sendMessage(message, "Testage", true);
                $("#textInputNote").val("");
            }
        }) ;
    },

    generateConnexion:function() {
        $("#buttonConnexion").click(function(){
            var user=$("#textInputSession").val();
            if(user){
                cobra.connect("http://cobra-framework.com:8080");
            }
            else{
                alert("Veuillez saisir votre nom pour ouvrir une session!");
            }
        }) ;
    },


    /**
     * Cette fonction permet d'afficher l'overview des notes.
     */
    generateOverview:function() {
        //$('#impression').append('<div id=\'myOverviewDiv\' class=\'col-xs-offset-1 col-xs-4\'></div>');
    }
};