import React from "react";
import "./CustomStyles.css"
class GeneradorCBU extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            entidad: "",
            sucursal: "",
            tipo: 0,
            entidadValida: true,
            sucursalValida: true,
            cbuGenerado:"",
            showResult: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.generarCBU = this.generarCBU.bind(this);
        this.validarEntidad = this.validarEntidad.bind(this);
        this.validarSucursal = this.validarSucursal.bind(this);
    }

    handleChange(event) {

        const target = event.target

        target.value = /^\d+$/.test(target.value) ? target.value : target.value.slice(0,-1)

        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        });
    }

    generarNumeroRandom(longitud){
       return Math.random().toString().substring(2, 2 + longitud)
    }
    rellenar(cadena, caracterRelleno, longTotal){
        return caracterRelleno.repeat(longTotal-cadena.length).concat(cadena)
    }

    generarCBU(){
        let entidad = this.state.entidad ?
            this.rellenar(this.state.entidad,'0',3) :
            this.generarNumeroRandom(3)

        let sucursal = this.state.sucursal ?
            this.rellenar(this.state.sucursal,'0',4):
            this.generarNumeroRandom(4)

        let bloque1 = entidad + sucursal

        let suma1 = bloque1[0]*7 + bloque1[1]*1 + bloque1[2]*3 + bloque1[3]*9 + bloque1[4]*7 + bloque1[5]*1 + bloque1[6]*3

        let diferencia1 = 10 - suma1 % 10

        let digitoVerificador1 = diferencia1 === 10 ? 0 : diferencia1

        let bloque2 = this.generarNumeroRandom(13)

        bloque2 = this.state.tipo === 0 ? bloque2 : this.state.tipo + bloque2.substring(1)

        let suma2 = bloque2[0]*3 + bloque2[1]*9 + bloque2[2]*7 + bloque2[3]*1 + bloque2[4]*3 + bloque2[5]*9 +
            bloque2[6]*7 + bloque2[7]*1 + bloque2[8]*3 + bloque2[9]*9 + bloque2[10]*7 + bloque2[11]*1 + bloque2[12]*3

        let diferencia2 = 10 - suma2 % 10

        let digitoVerificador2 = diferencia2 === 10 ? 0 : diferencia2

        this.setState({
            cbuGenerado: bloque1 + digitoVerificador1 + bloque2 + digitoVerificador2,
            showResult: true
        })
    }

    validarEntidad(){
        let entidad = this.state.entidad
        let entidadValida = entidad === "" || (entidad.length === 3  && /^\d+$/.test(entidad))
        this.setState({
            entidadValida: entidadValida
        })
    }
    validarSucursal(){
        let sucursal = this.state.sucursal
        let sucursalValida = sucursal === "" || (sucursal.length === 4  && /^\d+$/.test(sucursal))
        this.setState({
            sucursalValida: sucursalValida
        })
    }
    render()
    {
        return(
            <div>
                <div className="mb-3">
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <label htmlFor="entidad" className="form-label labels">Nº entidad</label>
                        </div>

                        <div className={"col"}>
                            <input name="entidad" type="text" className="form-control text-center " id="entidad"
                                   maxLength={"3"}
                                   minLength={"3"}
                                   onChange={this.handleChange}
                                   placeholder={"Hasta 3 dígitos"}
                            />
                        </div>
                    </div>


                    <div className={"row"}>
                        <div className={"col-4"}>
                            <label htmlFor="sucursal" className="form-label  labels">Nº sucursal</label>
                        </div>

                        <div className={"col"}>
                            <input name="sucursal" type="text" className="form-control text-center" id="sucursal"
                                   maxLength={"4"}
                                   minLength={"4"}
                                   onChange={this.handleChange}
                                   placeholder={"Hasta 4 dígitos"}
                            />
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-4"}>
                            <label htmlFor="tipo" className="form-label labels">Tipo</label>
                        </div>
                        <div className={"col"}>
                            <select className={"form-select"} name="tipo" id="tipo" onChange={this.handleChange}>
                                <option selected value={0}>Cualquiera</option>
                                <option value={1}>1 - Cuenta corriente en u$s</option>
                                <option value={2}>2 - Caja de ahorro en u$s</option>
                                <option value={3}>3 - Cuenta corriente en $</option>
                                <option value={4}>4 - Caja de ahorro en $ o CCE</option>
                                <option value={5}>5 - Cuenta judicial en $</option>
                                <option value={6}>6 - Cuenta judicial en u$s</option>
                            </select>
                        </div>
                    </div>

                    <button className={"btn btn-primary"} onClick={this.generarCBU}>Generar</button>

                    <div className={"mt-5"}>
                        <input type="text" className="form-control text-center" value={this.state.cbuGenerado}
                        disabled={true}/>
                    </div>


                </div>
            </div>


        )

    }
}

export default GeneradorCBU