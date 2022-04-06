import React,{useState,useEffect} from 'react'
import {CircularProgressbar,buildStyles}  from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

function ControlPresupuesto({gastos,presupuesto,setGastos, setPresupuesto,setIsValidPresupuesto}) {


  const [procentaje,setPorcentaje]= useState(0)
  const [disponible, setDisponible]= useState(0)
  const [gastado, setGastado]= useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total, 0 )

    const totalDisponible = presupuesto -totalGastado

    //calcular el porcentaje estado
    const nuevoPorcentaje = (((presupuesto - totalDisponible)/ presupuesto )*100).toFixed(2);
    

      setDisponible(totalDisponible)
      setGastado(totalGastado)

      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
      }, 1500);
  }, [gastos]);


    const formatearCantidad = (cantidad) => {
       return cantidad.toLocaleString('en-US',{
            style:'currency',
            currency: 'USD'
        })
    } 


    const handleResetApp = () => {
        const resultado = confirm('¿deseas reiniciar presupuesto y gastos?')

        if(resultado) {
          setGastos([])
          setPresupuesto(0)
          setIsValidPresupuesto(false)

        }
    } 


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                styles={buildStyles({
                  pathColor: procentaje > 100 ? 'red' : '#3b82f6' ,
                  trailColor:'#9B9B9B',
                  textColor:  procentaje > 100 ? 'red' : '#3b82f6' ,
                })}
                    value={procentaje}
                    text={`${procentaje}% Gastado`}
                />
            </div>


            <div className='contenido-presupuesto'>
              <button className='reset-app' type='button' onClick={handleResetApp}>
                  Resetear App
              </button>
               <p>
                   <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p> 

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                   <span>Disponible:</span> {formatearCantidad(disponible)}
                </p> 

                <p>
                   <span>Gastado:</span> {formatearCantidad(gastado)}
                </p> 

                



            </div>
    </div>
  )
}

export default ControlPresupuesto