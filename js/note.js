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
        this.ajoutDiagramme();
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
        monDiagramme.startTransaction('addNode');
        monDiagramme.model.addNodeData(this.node);
        monDiagramme.commitTransaction('addNode');
    },

    /**
     *
     */
    suppressionNote:function(){
        monDiagramme.startTransaction('removeNode');
        monDiagramme.model.removeNodeData(this.node);
        monDiagramme.commitTransaction('removeNode');
    }
};