// Définition de l'objet Note.
function Note() {
    this.node = false;
}

Note.prototype = {

    /**
     * Cette fonction crée une note et l'ajoute au diagramme.
     */
    creation:function (titre, contenu, auteur, echeance) {
        this.initialiser(titre, contenu, auteur, echeance);
        this.ajoutDiagramme(titre);
    },

    /**
     * Cette fonction permet d'initialiser une note avec les valeurs du formulaire.
     */
    initialiser:function (titre, contenu, auteur, echeance) {
        this.node = {
            nodeTitre: titre,
            nodeContenu: contenu,
            nodeAuteurName: auteur,
            nodeDateFinal: echeance
        };
    },

    /**
     * Cette fonction permet d'ajouter la note au diagramme.
     */
    ajoutDiagramme: function() {
        var titre = $("#textInputTitle").val();
        var existant = true;
        monDiagramme.model.nodeDataArray.forEach(function(ll) {
            if(ll.nodeTitre == titre) {
                alert("Une note avec le même titre existe. Veuillez modifier le titre de votre note ou mettez à jour la note existante");
                existant=false;
            }
        });
        if(existant){
            monDiagramme.startTransaction('addNode');
            monDiagramme.model.addNodeData(this.node);
            monDiagramme.commitTransaction('addNode');
        }

    },

    /**
     *
     */
    suppressionNote:function(titre){
        monDiagramme.model.nodeDataArray.forEach(function(ll) {
            if(ll.nodeTitre == titre) {
                monDiagramme.startTransaction('removeNode');
                monDiagramme.model.removeNodeData(ll);
                monDiagramme.commitTransaction('removeNode');
            }
        });
    }
};