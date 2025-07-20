import { Component, OnInit } from '@angular/core';
import jsonData from '../../assets/data/data.json';

interface TableRecord {
  TreeRuleDisplayName1: string | null;
  TreeRuleDisplayName2: string | null;
  TreeRuleDisplayName3?: string | null;
  TreeRuleDisplayName4?: string | null;
  Row1Col1?: string;
  Row1Col2?: number;
  Row1Col3?: string;
  Row1Col4?: number;
  Row1Col5?: number;
  Row1Col6?: number;
  Row1Col7?: number;
  Row1Col8?: number;
  Row1Col9?: string;
  Row1Col10?: string;
}

interface TreeNode {
  level1: string | null;
  level2: string | null;
  rows: TableRecord[];
  expanded?: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {
  rawData: TableRecord[] = [];
  treeData: TreeNode[] = [];

  columnKeys: string[] = [
    'Row1Col1',
    'Row1Col2',
    'Row1Col3',
    'Row1Col4',
    'Row1Col5',
    'Row1Col6',
    'Row1Col7',
    'Row1Col8',
    'Row1Col9',
    'Row1Col10',
    'Row1Col11'
  ];

  columnHeaders: { [key: string]: string } = {
    Row1Col1: 'Ccy',
    Row1Col2: 'Quantity',
    Row1Col3: 'Description',
    Row1Col4: 'ESG Rating',
    Row1Col5: 'Cost Price Cost FX',
    Row1Col6: 'Curr. Price Curr. FX Price Date',
    Row1Col7: 'Valuation Accrued Int.',
    Row1Col8: 'Total in CHF Accrued Int.',
    Row1Col9: 'P/L Total P/L MKT P/L Ccy',
    Row1Col10: 'P/L YTD Total P/L YTD MKT P/L YTD Ccy',
    Row1Col11: 'Perc'
  };

  ngOnInit() {
    this.rawData = jsonData.Data.Table as unknown as TableRecord[];
    this.buildTreeData();
  }

  buildTreeData() {
    const level1Map = new Map<string, TreeNode>();

    this.rawData.forEach(item => {
      const level1Key = item.TreeRuleDisplayName1 || 'Unknown';
      const level2Key = item.TreeRuleDisplayName2 || 'Unknown';

      if (!level1Map.has(level1Key)) {
        level1Map.set(level1Key, {
          level1: level1Key,
          level2: null,
          rows: [],
          expanded: false,
          children: []
        });
      }

      const level1Node = level1Map.get(level1Key)!;

      let level2Node = level1Node.children!.find(child => child.level2 === level2Key);
      if (!level2Node) {
        level2Node = {
          level1: level1Key,
          level2: level2Key,
          rows: [],
          expanded: false
        };
        level1Node.children!.push(level2Node);
      }

      level2Node.rows.push(item);
    });

    this.treeData = Array.from(level1Map.values());
  }

  toggleLevel1(group: TreeNode) {
    group.expanded = !group.expanded;
  }

  toggleLevel2(subgroup: TreeNode, event: Event) {
    event.stopPropagation();
    subgroup.expanded = !subgroup.expanded;
  }

  getCellValue(row: TableRecord, key: string): string {
    const value = row[key as keyof TableRecord];
    return value != null ? String(value) : '';
  }

  getLevel2Sum(subgroup: TreeNode): number {
  return subgroup.rows.reduce((sum, row) => sum + (row.Row1Col8 || 0), 0);
}

}
