import FixedDataTable from 'fixed-data-table-2';
import withStyles from 'isomorphic-style-loader/withStyles';
// eslint-disable-next-line import/no-unresolved, max-len, default-export
import * as tableStyle from 'fixed-data-table-2/dist/fixed-data-table.min.css';
// eslint-disable-next-line import/no-unresolved, default-export
import customTableStyle from './DataTable.css';


export const Table = withStyles(tableStyle, customTableStyle)(FixedDataTable.Table);
export const Column = FixedDataTable.Column;
export const Cell = FixedDataTable.Cell;

