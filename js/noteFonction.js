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
                cobra.sendMessage(message, "Testage", true);
                $("#textInputTitle").val("");
                $("#textInputText").val("");
                //$("#textInputSession").val("");
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
            if(title) {
                var message={action:action,title:title};
                cobra.sendMessage(message, "Testage", true);
                $("#textInputNote").val("");
            }
        }) ;
    },

    /**
     * Cette foncton connecte l'utilisateur à Cobra lorsqu'il se connecte avec un pseudo.
     */
    connecterCobra:function() {
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
    afficherOverview:function() {
        $('.overview').attr('id','myOverviewDiv');
    }
};