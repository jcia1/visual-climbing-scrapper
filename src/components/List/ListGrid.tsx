import React, { useEffect, useRef, useState } from "react";
import { GridComponentHandle } from "./Grid";

interface ListGridProps {
    header: React.ReactNode;
    grids: React.ReactElement<any>[]; 

}

const ListGrid = ({ header, grids }: ListGridProps) => {

    const [showComponent, setShowComponent] = useState(true);
    const typedGrids = useRef<(GridComponentHandle | null)[]>([]);

    useEffect(() => {

        const sizes = typedGrids.current.map(ref => ref?.getSize());
        const allSizesEqual = sizes.every(size => size === sizes[0]);

        if (!allSizesEqual) {
             setShowComponent(false);
        }
        
    },
    // Añadimos una dependencia para asegurarnos de que el efecto se ejecute despues de haber asignado las refs. 
    [grids]);


    if (!showComponent) {
        return null; 
    }

    // Clonamos los grids a un ref para poder hacer la validacion de campos.
    if (grids.length > 0) {
        const clonedElements = grids.map((grid, index) => {
            return React.cloneElement(grid, { ref: (el: GridComponentHandle) => typedGrids.current[index] = el });
        });

        return (
            <div style={{ marginTop: '20px', marginBottom: '20px', backgroundColor: '#e0e0e0' }}> 
                {header}
                {grids}
            </div>
        );
    }
};

export default ListGrid;
