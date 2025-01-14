import { KeyValueStrType } from './types';

export const grados: KeyValueStrType = [
  { key: "1", value: "V" }, { key: "2", value: "V+" }, { key: "3", value: "6a" }, { key: "4", value: "6a+" },
  { key: "5", value: "6b" }, { key: "6", value: "6b+" }, { key: "7", value: "6c" }, { key: "8", value: "6c+" }
];

export const locations: KeyValueStrType = [
  { key: "1", value: "" },
  { key: "2", value: "Pedriza" },
  { key: "3", value: "Patones" }
];

export const optionsPerName: { key: "grado" | "location"; value: KeyValueStrType }[] = [
  { key: "grado", value: grados },
  { key: "location", value: locations }
];

export const headersForListGrid = ['Nombre', 'Grado', 'Escuela', 'Sector', 'Comentarios'];

export const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];