// Définition de l'objet Page qui va initialiser la page et le formulaire.
function Page() {
    this.hauteur = 0;
}

Page.prototype = {

    /**
     * Cette fonction initialise la taille de la page et le formulaire
     */
    initialiser:function() {

        var page = this;
        window.onload = function(){
            page.fixerTaille();
        };
        page.afficheFormulaire();
        page.timedate();

        var noteFonction = new NoteFonction();
        noteFonction.initialiser();
    },

    /**
     * Cette fonction calcule la taille verticale de l'ecran en pixel et la fixe à un bloc.
     * @param bloc le bloc dont on souhaite modifier la taille.
     */
    height:function height(bloc){

        if(typeof( window.innerWidth )=='number')
            this.hauteur = window.innerHeight;

        else if( document.documentElement && document.documentElement.clientHeight )
            this.hauteur = document.documentElement.clientHeight;

        document.getElementById(bloc).style.height = this.hauteur+"px";
    },

    /**
     * Cette fonction fixe la taille des deux blocs principaux à la taille de l'ecran.
     */
    fixerTaille:function () {

        this.height("divTableau");
        this.height("divMenu");
    },

    /**
     * Cette fonction cache, puis affiche le formulaire lorsque l'utilisateur se connecte.
     */
    afficheFormulaire:function() {

        $("#formulaire").hide();
        $("#impression").hide();
        $("#buttonConnexion").click(function() {
            if ($.trim($("#textInputSession").val()).length > 0) {
                $('#formulaire').show();
                $('#impression').show();
            }
        });
    },

    /**
     * Initialiser le format du champ "date".
     */
    timedate:function() {

        $('.datetime').datetimepicker({
            dateFormat: "dd/mm/yy",
            timeFormat:  "HH:mm",
            language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            startDate: '+0d'
        });
    }
};

var page = new Page();
page.initialiser();