import React, { forwardRef, useImperativeHandle, ReactNode, useState } from 'react';
import './Grid.css'
 
interface GridProps {
  header?: boolean
  items: string[];
}

export interface GridComponentHandle {
  getSize: () => number;
}

const Grid = forwardRef<GridComponentHandle, GridProps>(({ items, header = false }, ref) => {

  const numColumns = items.length - 1;

  const styles = {
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: `repeat(${numColumns}, 200px) 1fr`,
    }
  };

  useImperativeHandle(ref, () => ({
    getSize: () => items.length,
  }));

  return (
  <div style={styles.gridContainer}>

    { items.map((item, index) => {

        let className: string

        if(header) { 

          if(index == 0)
            className = 'gridHeaderItem gridHeaderLeftSide';
          else if(index == items.length - 1)
            className = 'gridHeaderItem gridHeaderRigthSide';
          else className = 'gridHeaderItem'

        } else className = 'gridItem';

        return (<div key={index}  className = {className}> {item} </div>)
      })
    }
  </div>
  );
});

export default Grid;