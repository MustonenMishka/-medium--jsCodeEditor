export type CellTypes = 'code' | 'text';

export interface Cell {
    id: string;
    cellType: CellTypes;
    content: string;
}