/**
 * Created by salsabile on 30-09-15.
 */

function creationNote(titre,textenote){
    var node = false;
    if(!node) {
        node = {
            nodeTitle: titre,
            nodeContenu: textenote
        };

        // Transaction qui nous permet d'ajouter la classe au diagramme
        monDiagramme.startTransaction('addNode');
        monDiagramme.model.addNodeData(node);
        monDiagramme.commitTransaction('addNode');

    }
}