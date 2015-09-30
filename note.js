/**
 * Created by salsabile on 30-09-15.
 */

var $ = go.GraphObject.make;
var monDiagramme = $(go.Diagram,"divTableau",
    {
        initialContentAlignment: go.Spot.Center, // Center Diagram contents
        "undoManager.isEnabled": true  //interaction ctrl z,y, ...
    }
);
//Définir un modéle de noeuds simple

monDiagramme.nodeTemplate=
    $(go.Node,"Vertical",
        { background: "lightblue" },

        $(go.Panel,"Table",
            new go.Binding("itemArray","ClassNom"),
            { margin : 0,
                itemTemplate:
                    $(go.Panel,"TableRow",
                        $(go.TextBlock, new go.Binding("text","", function(v) {return v.TitreNote}),
                            { column: 0, margin: 0, font: "bold 10pt sans-serif" }
                        )
                    ),
            }),
        $(go.Panel,"Table",
            new go.Binding("itemArray","attribut"),
            { margin : 10,
                defaultAlignment : go.Spot.Left,
                itemTemplate:
                    $(go.Panel,"TableRow",
                        $(go.TextBlock, new go.Binding("text","", function(v) {return v.texteNote}),
                            { column: 0, margin: 0, font: "bold 10pt sans-serif" }
                        )
                    ),
            })
    );


// création du model
// monDiagramme.model =
// 	$(go.GraphLinksModel,
// 		{
var nodeDataArray = [
    { key : "classe1",
        ClassNom :
            [
                {TitreNote : "A faire"}
            ],
        attribut : [
            { texteNote:"Fonction generique pour la creation de note"}
        ],

    }
];
monDiagramme.model = new go.GraphLinksModel(nodeDataArray);

monDiagramme.initialContentAlignment = go.Spot.Center;
