// Définition de l'objet NoteFonction qui contient les fonctionnalités spécifiques aux notes.
function NoteFonction() {
}

NoteFonction.prototype = {

    //var cobraTest = this.cobraNote;
    cobraNote : null,

    initialiser:function () {
        this.generateImages();
        this.generateNotesCobra();
        this.generateOverview();
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
            var title = $("#textInputTitle").val();
            var content = $("#textInputText").val();
            var user = $("#textInputSession").val();
            var date = $("#textInputDate").val();
            if(title && content && user && date) {
                var message={title:title, content: content, user: user, date: date};
                cobra.sendMessage(message, "weCreateNote", true);
                $("#textInputTitle").val("");
                $("#textInputText").val("");
                $("#textInputDate").val("");
                $("#textInputTitle").focus();
            }
        });
    },

    /**
     * Cette fonction permet d'afficher l'overview des notes.
     */
    generateOverview:function() {
        //$('#impression').append('<div id=\'myOverviewDiv\' class=\'col-xs-offset-1 col-xs-4\'></div>');
    }
};