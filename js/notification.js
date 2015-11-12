// Définition de l'objet Notification.
function Notification() {
    this.texte = "";
}

Notification.prototype = {

    notifier:function(action, titre) {
        if (action == "ajout") {
            this.texte = '"' + titre + '" vient d\'etre ajoute.';
        } else if (action == "suppression"){
            this.texte = '"' + titre + '" vient d\'etre supprime.';
        }
        $.notify(this.texte, {
            className: 'success',
            position: "top left"
        });
    },

    notifierUtilisateur:function(action, nom, titre) {
        if (action == "ajout") {
            this.texte = nom + ' a ajoute la note : "' + titre + '".';
        } else if (action == "suppression"){
            this.texte = nom + ' a supprime la note : "' + titre + '".';
        }
        $.notify(this.texte, {
            className: 'info',
            position: "bottom left"
        });
    },

    notifierNoteExistante:function(titre) {
        this.texte = '"' + titre + '" existe deja.';
        $.notify(texte, {
            className: 'warning',
            position: "top left"
        });
    },

    /**
     * Cette fonction notifie tous les utilisateurs, lorsqu'on se connecte.
     * @param nom le nom de l'utilisateur
     */
    notifierConnexion:function(nom) {
        $.notify(nom + ' vient de se connecter.', {
            className: 'info',
            position: "bottom left"
        });
    },
};