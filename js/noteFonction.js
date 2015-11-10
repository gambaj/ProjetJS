// Définition de l'objet NoteFonction qui contient les fonctionnalités spécifiques aux notes.
function NoteFonction() {

}

NoteFonction.prototype = {

    /**
     * Cette fonction initialise toutes les fonctionnalités de note du projet.
     */
    initialiser:function () {
        this.genererImage();
        this.connecterCobra();
        this.envoyerNoteCobra();
        this.supprimerNoteCobra();
        this.afficherOverview();
    },

    /**
     * Cette fonction telecharge l'image du diagramme de post-it.
     */
    genererImage:function() {
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
    envoyerNoteCobra:function() {
        $("#valider").click(function(){
            var action="ajoutOuModification";
            var title = $("#textInputTitle").val();
            var content = $("#textInputText").val();
            var user = $("#textInputSession").val();
            var date = $("#textInputDate").val();
            if(title && content && user ) {
                var message={action:action,title:title, content: content, user: user, date: date};
                cobra.sendMessage(message, "noteSCJ", true);
                $("#textInputTitle").val("");
                $("#textInputText").val("");
                $("#textInputDate").val("");
                $("#textInputTitle").focus();
            }
        });
    },

    /**
     * Cette fonction envoie un message à cobra permettant de supprimer une note.
     */
    supprimerNoteCobra:function() {
        $("#buttonSuppression").click(function(){
            var action="suppressionNote";
            var title = $("#textInputNote").val();
            var user = $("#textInputSession").val();
            if(title) {
                var message={action:action,title:title, user:user};
                cobra.sendMessage(message, "noteSCJ", true);
                $("#textInputNote").val("");
            }
        }) ;
    },

    /**
     * Cette foncton connecte l'utilisateur à Cobra lorsqu'il se connecte avec un pseudo.
     */
    connecterCobra:function() {
        $("#buttonConnexion").click(function(){
            var action="connexion";
            var user=$("#textInputSession").val();
            if(user){
                var message={action:action, user:user};
                cobra.connect("http://cobra-framework.com:8080");
                setTimeout(function(){ cobra.sendMessage(message, "noteSCJ", true); }, 1000);
            }
        }) ;
    },

    /**
     * Cette fonction notifie tous les utilisateurs, lorsqu'on se connecte.
     * @param user le nom de l'utilisateur
     */
    notifierConnexion:function(user) {
        $.notify(user + ' vient de se connecter.', {
            className: 'info',
            position: "bottom left"
        });
    },

    /**
     * Cette fonction permet d'afficher l'overview des notes.
     */
    afficherOverview:function() {
        $('.overview').attr('id','myOverviewDiv');
    }
};