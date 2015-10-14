/**
 * Created by salsabile on 30-09-15.
 */

function creationNote(titre,textenote,autorName,echeance){
    var node = false;
    if(!node) {
        node = {
            nodeTitle: titre,
            nodeContenu: textenote,
            nodeAutorName:autorName,
            nodeDateFinal:echeance
        };

        // Transaction qui nous permet d'ajouter la classe au diagramme
        monDiagramme.startTransaction('addNode');
        monDiagramme.model.addNodeData(node);
        monDiagramme.commitTransaction('addNode');

    }
}