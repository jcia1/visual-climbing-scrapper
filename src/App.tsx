import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Button, Form, FormSelectInput, ZodValidableForm } from './components';
import { FormTextInput } from './components/Form/FormTextInput';
import Grid from './components/List/Grid';
import ListGrid from './components/List/ListGrid';
import Patones from './Patones.jpg';
import Pedriza from './Pedriza.jpg';
import SquarePanel from './components/Panel/SquarePanel';
import axios from 'axios';
import { grados, headersForListGrid, items, optionsPerName } from './data';
import { KeyValueStrType } from './types';
import Header from './components/Header/Header';

function App() {

  type Location = "" | "Pedriza" | "Patones"

  interface FieldIface {
    key: string,
    name: "grado" | "name" | "location" | "sector",
    type: "select" | "text",
    options?: KeyValueStrType;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
    disabled?: boolean
  }

  interface Sector {
    sectorId: string;
    sectorName: string;
    sectorSlug: string;
    totalZlaggables: number;
  }

  // Field Data. En funcion de los botones presionados para elegir los campos del formulario de filtrado.
  const [fieldData, setFieldData] = useState<FieldIface[]>([
    {
      key: "1",
      name: "grado",
      type: "select",
      options: grados
    }
  ])

  // Location, para mostrar unas u otras propiedades en el Square Panel, de descripciones y fotos.
  const [location, setLocation] = useState<Location>('')

  // Sectores disponibles para seleccionar. 
  const [sectors, setSectors] = useState<Sector[]>([])

  // Sectores disponibles para seleccionar. 
  const [handleLocationFilter, setHandleLocationFilter] = useState<boolean>(false)

  // Sign in modal.
  const [isSignInOpen,setSignInOpen] = useState(false)

  // Si se pulsa el boton de filtrado de Location.
  useEffect(() => {

    if (handleLocationFilter)

      handleLocationFilterFunction()

    setHandleLocationFilter(false)

  }, [handleLocationFilter])


  // Si se cambian los sectores, se incluye el filtro por sector.
  useEffect(() => {

    const includesSectors = fieldData.map(fieldData => fieldData.name).includes('sector')

    if (sectors.length === 0) {

      if (includesSectors)
        addFilter(undefined, 'sector', 'select', (e: ChangeEvent<HTMLSelectElement>) => { }, true);

    } else if (!includesSectors) {

      addFilter(undefined, 'sector', 'select', (e: ChangeEvent<HTMLSelectElement>) => { }, true);
    }
  }, [sectors]);

  /**
   * Si hay Location busco sectores, si no hay vacio sectores.
   * @param e 
   * @param location 
   */
  const handleLocationAndSectors = (location: Location) => {

    setLocation(location)

    if (location != '') {

      fetchDataFromCrag(location)
    }
    else {
      setSectors([])
    }
  }

  const handleLocationFilterFunction = () => {

    const includesLocation = fieldData.map(fieldData => fieldData.name).includes('location')

    if (includesLocation) {

      addFilter(undefined, 'location', 'select')
      handleLocationAndSectors('')
    } else {

      addFilter(undefined, 'location', 'select', (e: ChangeEvent<HTMLSelectElement>) => {

        handleLocationAndSectors(e.target.value as Location)
      })
    }
  }

  /**
   * Fetch data. 
   * @param location 
   * @returns 
   */
  const fetchDataFromCrag = async (location: Location) => {

    try {

      const locationFormatted = location.toLowerCase();
      const result = await axios.get(`http://localhost:3001/api/routes/${locationFormatted}`);

      if (result.data && result.data.sectors) {

        const sectors: Sector[] = result.data.sectors;
        console.log(sectors);

        // Eliminamos los que empiecen por 'a', la mayoria son fakes. 
        setSectors(sectors.filter(sector => !/^a/.test(sector.sectorName)))

      } else {

        console.log('No se encontraron sectores en los datos recibidos');
      }
    } catch (error) {

      console.error("Error fetching data:", error);
    }
    return [];
  };

  /**
   * Funcion que dependiendo del estado actual muestra o elimina un filtro por pantalla.
   * @param e 
   * @param name 
   * @param type 
   * @param onChange 
   * @param disabled 
   */
  const addFilter = (e: React.MouseEvent<HTMLButtonElement>, name: "name" | "location" | "sector", type: "select" | "text",
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void, disabled: boolean = false) => {

    // Evitamos el rerender
    if (e != undefined) {
      e.preventDefault()
    }

    // Añadimos el campo.
    if (!fieldData.map(fieldData => fieldData.name).includes(name)) {

      // Si son sectores utilizamos el estado sectores, si no utilizamos los valores estaticos de data.ts.
      let options: KeyValueStrType;
      if (name === 'sector')
        options = sectors.map(sector => ({ key: sector.sectorId, value: sector.sectorName }))
      else
        options = optionsPerName.find(record => record.key === name)?.value || [];

      const newField: FieldIface = {
        key: (fieldData.length + 1).toString(),
        name: name,
        type: type,
        options: options,
        onChange: onChange,
        disabled: disabled
      };

      setFieldData([...fieldData, newField]);

    } // Eliminamos el campo.
    else {

      setFieldData(fieldData.filter(field => field.name != name));
    }
  }

  // Opciones para el square panel.
  let panelText: string;
  let panelImage: string;

  if (location === 'Patones') {

    panelText = '"La mejor escuela de europa"';
    panelImage = Patones;
  } else if (location === 'Pedriza') {

    panelText = '"Paraiso con alejes"';
    panelImage = Pedriza;
  }

  return (
    <div>
 
      {/* -- Header-- */}
      <div>
        <Header signInForm={<ZodValidableForm/>} title = '8a.bro' refs = {[{modalTitle : 'Sign in', isModalOpen : isSignInOpen, setIsModalOpen : setSignInOpen}]}/>
      </div>

      <div style={{ display: 'flex' }}>

        {/* -- Form -- */}
        <div style={{ flex: 1 }} className='form-container'>

          <Form inputs={

            fieldData.map((field, index) => {

              if (field.type == "select") {

                return <FormSelectInput key={index}
                  selectOptions={field.options.map(((opt, index) => <option key={index} value={opt.value}>{opt.value} </option>))}
                  onChange={field.onChange} />

              } else {

                return <FormTextInput key={index} name={field.name} />
              }
            }
            )}
            button={
              <div>
                <div className="button-group">
                  <Button label="Name" parentMethod={(e) => addFilter(e, 'name', 'text')} />
                  <Button label="Location"
                    parentMethod={(e) => {

                      e.preventDefault()
                      setHandleLocationFilter(true)
                    }
                    } />
                </div>
                <div className="button-group">
                  <Button label="Buscar" disabled={sectors.length === 0} />
                </div>
              </div>
            }
          />
        </div>

        {/* -- Optional Square panel.-- */}
        <SquarePanel imageSrc={panelImage} text={panelText}></SquarePanel>

      </div>

      {/* -- List grid -- */}
      <div style={{ marginTop: '20px', marginBottom: '20px', backgroundColor: '#e0e0e0' }}>
        <ListGrid
          header={<Grid key={1} header={true} items={headersForListGrid} />}
          grids={[<Grid key={1} items={items} />, <Grid key={2} items={items} />]} />
      </div>
    </div>
  );
}

export default App;
