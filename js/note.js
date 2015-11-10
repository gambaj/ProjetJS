// Définition de l'objet Note.
function Note(titre) {
    this.node = false;
    this.existant = false;
    this.titre = titre;
}

Note.prototype = {

    /**
     * Cette fonction crée une note et l'ajoute au diagramme.
     */
    creation:function (contenu, auteur, echeance) {
        if (contenu != undefined || contenu != null) {
            this.initialiser(contenu, auteur, echeance);
            this.ajoutDiagramme();
        }
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
        var titre = this.titre;
        var existant = this.existant;
        monDiagramme.model.nodeDataArray.forEach(function(ll) {
            if(ll.nodeTitre == titre) {
                console.log("Une note avec le même titre existe. Veuillez modifier le titre de votre note ou mettez à jour la note existante");
                existant = true;
            }
        });
        if(!existant){
            monDiagramme.startTransaction('addNode');
            monDiagramme.model.addNodeData(this.node);
            monDiagramme.commitTransaction('addNode');
        }
        this.existant = existant;
    },

    /**
     * Cette fonciton permet de supprimer la note du diagramme.
     */
    suppressionNote:function(){
        var titre = this.titre;
        monDiagramme.model.nodeDataArray.forEach(function(ll) {
            if(ll.nodeTitre == titre) {
                monDiagramme.startTransaction('removeNode');
                monDiagramme.model.removeNodeData(ll);
                monDiagramme.commitTransaction('removeNode');
            }
        });
    },

    notifier:function(action) {
        if (action == "ajout") {
            var texte = '"' + this.titre + '" vient d\'etre ajoute.';
        } else if (action == "suppression"){
            var texte = '"' + this.titre + '" vient d\'etre supprime.';
        }
        $.notify(texte, {
            className: 'success',
            position: "top left"
        });
    },

    notifierUtilisateur:function(nom, action) {
        if (action == "ajout") {
            var texte = nom + ' a ajoute la note : "' + this.titre + '".';
        } else if (action == "suppression"){
            var texte = nom + ' a supprime la note : "' + this.titre + '".';
        }
        $.notify(texte, {
            className: 'info',
            position: "bottom left"
        });
    },

    notifierNoteExistante:function(nom) {
        var texte = '"' + nom + '" existe deja.';
        $.notify(texte, {
            className: 'warning',
            position: "top left"
        });
    }
};