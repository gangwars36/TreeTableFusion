import { Component, AfterViewInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, "myDiagramDiv", {
      initialAutoScale: go.Diagram.Uniform,
      layout: $(go.TreeLayout, {
        angle: 90,
        layerSpacing: 40
      }),
      "undoManager.isEnabled": true
    });

    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",
          { fill: "#ffffff", stroke: "#d9d9d9", strokeWidth: 2 }
        ),
        $(go.TextBlock,
          { margin: 8, font: "bold 14px sans-serif" },
          new go.Binding("text", "name"))
      );

    myDiagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape),
        $(go.Shape, { toArrow: "Standard" })
      );

    // Updated model with 20+ nodes
    myDiagram.model = new go.TreeModel([
      { key: 1, name: "Company Owner" },
      { key: 2, parent: 1, name: "Chief Executive Officer (CEO)" },
      
      { key: 3, parent: 2, name: "Chief Technology Officer (CTO)" },
      { key: 4, parent: 2, name: "Chief Financial Officer (CFO)" },
      { key: 5, parent: 2, name: "Chief Operating Officer (COO)" },

      { key: 6, parent: 3, name: "Engineering Head" },
      { key: 7, parent: 3, name: "IT Infrastructure Head" },
      { key: 8, parent: 6, name: "Frontend Team Lead" },
      { key: 9, parent: 6, name: "Backend Team Lead" },
      { key: 10, parent: 8, name: "Frontend Developer" },
      { key: 11, parent: 9, name: "Backend Developer" },

      { key: 12, parent: 4, name: "Finance Manager" },
      { key: 13, parent: 12, name: "Accountant" },
      { key: 14, parent: 12, name: "Tax Specialist" },

      { key: 15, parent: 5, name: "Operations Manager" },
      { key: 16, parent: 5, name: "Logistics Manager" },
      { key: 17, parent: 16, name: "Warehouse Supervisor" },
      { key: 18, parent: 16, name: "Delivery Lead" },

      { key: 19, parent: 2, name: "Chief Marketing Officer (CMO)" },
      { key: 20, parent: 19, name: "Digital Marketing Head" },
      { key: 21, parent: 19, name: "Brand Manager" }
    ]);

    myDiagram.addDiagramListener('InitialLayoutCompleted', () => {
      const canvasEl = document.querySelector('#myDiagramDiv canvas') as HTMLCanvasElement;
      if (canvasEl) {
        canvasEl.style.top = '-75px';
        canvasEl.style.position = 'relative';
      }
    });
  }
}
