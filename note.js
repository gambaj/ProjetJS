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
            {
                background: "lightyellow",
                desiredSize: new go.Size(150, 150)

            },

            $(go.Panel,"Table",
                { defaultRowSeparatorStroke: "back" },
                //new go.Binding("itemArray","ClassNom"),
                    $(go.TextBlock,
                        {
                            row: 0, margin: 3, alignment: go.Spot.Center,
                            font: "bold 12pt sans-serif",
                            isMultiline: false, editable: true,
                            name : "name"
                        },
                        new go.Binding("text","nodeTitle").makeTwoWay())
                         //{ column: 0, margin: 0, font: "bold 10pt sans-serif"
            ),
            $(go.Panel,"Table",
                $(go.TextBlock, new go.Binding("text","nodeContenu").makeTwoWay(),
                    { column: 0, margin: 0, font: "bold 10pt sans-serif" }
                )
            )
        );





