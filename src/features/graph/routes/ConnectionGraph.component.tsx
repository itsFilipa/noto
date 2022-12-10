import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";

export const ConnectionGraphPage = () => {
  // let graph = require("ngraph.graph")();
  // graph.addLink(1, 2);
  // let renderGraph = require("ngraph.pixel");
  // let renderer = renderGraph(graph);
  return (
    <IonPage>
      <GenericHeader backBtn="/notecards" />
      <IonContent>
        {/* {renderer} */}
      </IonContent>
    </IonPage>
  );
};


// import * as React from "react";
// import * as ngraph from "ngraph.graph";

// export const ConnectionGraphPage = () => {
//   // Use the useEffect hook to create and render the graph when the component is mounted
//   React.useEffect(() => {
//     // Create a new graph
//     const graph = require("ngraph.graph")();

//     // Add some nodes and edges to the graph
//     graph.addNode("Node 1");
//     graph.addNode("Node 2");
//     graph.addNode("Node 3");
//     graph.addLink("Node 1", "Node 2");
//     graph.addLink("Node 2", "Node 3");

//     // Create a renderer for the graph using the SVG renderer
//     // const renderer = ngraph.svg();
//     const renderGraph = require("ngraph.pixel");
//     const renderer = renderGraph(graph);

//     // Set the container option on the renderer to specify the DOM element where the graph should be rendered
//     renderer.container = document.getElementById("graph-container");

//     // Render the graph
//     // ngraph.render(graph, renderer);
//   }, []); // The empty array ensures that the effect is only run when the component is mounted

//   // Return the DOM element where the graph will be rendered
//   return <div id="graph-container" />;
// };
