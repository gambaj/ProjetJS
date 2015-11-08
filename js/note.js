// D�finition de l'objet Note.
function Note(titre) {
    this.node = false;
    this.titre = titre;
}

Note.prototype = {

    /**
     * Cette fonction cr�e une note et l'ajoute au diagramme.
     */
    creation:function (contenu, auteur, echeance) {
        this.initialiser(contenu, auteur, echeance);
        this.ajoutDiagramme();
    },

    /**
     * Cette fonction permet d'initialiser une note avec les valeurs du formulaire.
     */
    initialiser:function (contenu, auteur, echeance) {
        this.node = {
            nodeTitre: this.titre,
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
            if(ll.nodeTitre == this.titre) {
                alert("Une note avec le m�me titre existe. Veuillez modifier le titre de votre note ou mettez � jour la note existante");
                existant=false;
            }
        });
        if(!existant){
            monDiagramme.startTransaction('addNode');
            monDiagramme.model.addNodeData(this.node);
            monDiagramme.commitTransaction('addNode');
        }
    },

    /**
     * Cette fonciton permet de supprimer la note du diagramme.
     */
    suppressionNote:function(){
        var titre = this.titre;
        console.log("On rentre dans la fonction de suppression.");
        monDiagramme.model.nodeDataArray.forEach(function(ll) {
            console.log("On commence � chercher...");
            if(ll.nodeTitre == titre) {
                console.log("J'ai trouv� la note de nom : " + ll.nodeTitre);
                monDiagramme.startTransaction('removeNode');
                monDiagramme.model.removeNodeData(ll);
                monDiagramme.commitTransaction('removeNode');
            }
        });
    }
};