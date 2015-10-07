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

function height(bloc){

    var hauteur;
    if(typeof( window.innerWidth )=='number')
        hauteur = window.innerHeight;

    else if( document.documentElement && document.documentElement.clientHeight )
        hauteur = document.documentElement.clientHeight;

    document.getElementById(bloc).style.height = hauteur+"px";
}

window.onload = function(){ height("divTableau"); height("divMenu") }
$("#formulaire").hide();
$("#impression").hide();

function afficheFormulaire() {
    $('#textInputSession').prop('disabled', true);
    $('#formulaire').show();
    $('#impression').show();
}

function generateImages() {
    var imgData = monDiagramme.makeImageData({
        scale: 1
    });

    jQuery("#imgLink").attr('href', imgData);
    jQuery("#imgLink")[0].click();
}