/**
 * Created by salsabile on 30-09-15.
 */


var $$ = go.GraphObject.make;
var monDiagramme = $$(go.Diagram,"divTableau",
    {
        initialContentAlignment: go.Spot.Center, // Center Diagram contents
        "undoManager.isEnabled": true  //interaction ctrl z,y, ...
    }
);

//Définir un modéle de noeuds simple

    monDiagramme.nodeTemplate=
        $$(go.Node,"Vertical",
            {
                background: "lightyellow",
                minSize: new go.Size(150, 150)

            },
            $$(go.Panel,"Table",
                { defaultRowSeparatorStroke: "back" },
                    $$(go.TextBlock,
                        {
                            row: 0, margin: 3, alignment: go.Spot.Center,
                            font: "bold 12pt sans-serif",
                            isMultiline: false, editable: true,
                            name : "name"
                        },
                        new go.Binding("text","nodeTitle").makeTwoWay()),
                //$$(go.Panel,"Table",
                    $$(go.TextBlock, new go.Binding("text","nodeContenu").makeTwoWay(),
                        {
                            row: 1, margin: 3,
                            font: "bold 10pt sans-serif",
                            isMultiline: true, editable: true

                        }
                    )
                //)
            )

        );

//Ajout de l'overview
var myOverview = $$(go.Overview,"myOverviewDiv",{ observed: monDiagramme });






