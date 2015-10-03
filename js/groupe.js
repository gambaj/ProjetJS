/**
 * Created by salsabile on 30-09-15.
 */

myDiagram.groupTemplate =
    $$(go.Group, "Auto",
        {
            isSubGraphExpanded: false,
            selectionAdorned: true,
            layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
            locationSpot: go.Spot.TopLeft,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides
        },
        // Propriété du reprend la visibilité , la localisation ( la position) et le nom du projet auquel il est attaché
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("visible", "visible"),
        new go.Binding("layerName", "projetName"),
        $$(go.Shape, "Rectangle",
            { fill: "lightgray", stroke: "gray", strokeWidth: 2 }),
        $$(go.Panel, "Vertical",
            { defaultAlignment: go.Spot.Left, margin: 4 },
            $$(go.Panel, "Horizontal",
                { defaultAlignment: go.Spot.Top },
                // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                $$("SubGraphExpanderButton"),
                $$(go.TextBlock,
                    { font: "Bold 18px Sans-Serif", margin: 4 },
                    new go.Binding("text", "key"))
            ),
            // create a placeholder to represent the area where the contents of the group are
            $$(go.Placeholder,
                { padding: new go.Margin(0, 10) })
        )  // end Vertical Panel
    );  // end Group