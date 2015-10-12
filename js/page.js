// Définition de l'objet Page qui va initialiser la page et le formulaire.
function Page() {
    this.hauteur = 0;
}

// Ce qui change pas est ici, ce qui change est là haut.
Page.prototype = {

    /**
     * Cette fonction initialise la taille de la page et le formulaire
     */
    initialiser:function() {

        var page = this;
        window.onload = function(){
            page.fixerTaille();
        }
        page.afficheFormulaire();
        page.timedate();
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
     * Cette fonction cache le formulaire.
     */
    afficheFormulaire:function() {

        $("#formulaire").hide();
        $("#impression").hide();
        $("#button").click(function() {
            $('#textInputSession').prop('disabled', true);
            $('#formulaire').show();
            $('#impression').show();
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
            showMeridian: 1
        });
    }
}

function generateImages() {
    var imgData = monDiagramme.makeImageData({
        scale: 1
    });

    jQuery("#imgLink").attr('href', imgData);
    jQuery("#imgLink")[0].click();
}
