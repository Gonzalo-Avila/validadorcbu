import React from "react";
import "./CustomStyles.css"
class ValidadorCUIT extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            cuit: "",
            showResult: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.longitudValida = this.longitudValida.bind(this);
        this.bloqueValido = this.bloqueValido.bind(this);
        this.validarCUIT = this.validarCUIT.bind(this);
    }

    handleChange(event) {

        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            showResult: false,
            [name]: value
        });
    }

    calcularDigitoVerificador(tipo, identificador){

        const bloque = tipo + identificador

        const suma = bloque[9]*2 + bloque[8]*3 + bloque[7]*4 + bloque[6]*5 + bloque[5]*6 + bloque[4]*7 + bloque[3]*2 +
            bloque[2]*3 + bloque[1]*4 + bloque[0]*5

        const sumaMod11 = suma % 11
        const resultado = 11 - sumaMod11

        return resultado === 11 ?
            0 :
            resultado === 10 ?
                1 :
                resultado !== 0 ?
                    resultado :
                    tipo < 20 && tipo !== 23 ?
                        this.calcularDigitoVerificador(23) :
                        tipo !== 33 ?
                            this.calcularDigitoVerificador(33) :
                            "Error"
    }

    longitudValida(){
        return this.state.cuit.length === 11
    }

    bloqueValido(){
        const tipo = this.state.cuit.substring(0,2)
        const identificador = this.state.cuit.substring(2,10)
        const digitoVerificador = this.state.cuit.substring(10,11)

        console.log(tipo)
        console.log(identificador)
        console.log(digitoVerificador)

        const digitoVerificadorCorrecto = this.calcularDigitoVerificador(tipo, identificador)

        console.log(digitoVerificadorCorrecto)

        return digitoVerificador.toString() === digitoVerificadorCorrecto.toString()
    }

    cuitValido(){
        return this.longitudValida() && this.bloqueValido()
    }

    validarCUIT(){
        this.setState({
            showResult: true
        });

    }

    render()
    {
        return(
            <div>
                <div className="mb-3">
                    <label htmlFor="cuit" className="form-label labels">Ingresá un CUIT</label>
                    <input name="cuit" type="text" className="form-control text-center" id="cuit" maxLength={"11"}
                           onChange={this.handleChange}
                           placeholder={"11 dígitos"}
                    />
                </div>
                <div>
                    <span  tabIndex="0" data-bs-toggle="tooltip" title={this.state.cuit.length === 11 ? "Validar el CBU" : "El CUIT debe contener 11 dígitos"}>
                        <button className={"btn btn-primary mb-5"} disabled={!(this.state.cuit.length === 11)} onClick={this.validarCUIT}>
                            Validar
                        </button>
                    </span><br/>
                    <div  hidden={!this.state.showResult}>
                        {
                            this.cuitValido() ?
                                <p className={"text-success"}>CUIT VÁLIDO</p> :
                                <p className={"text-danger"}>CUIT INVÁLIDO</p>
                        }
                    </div>
                </div>
            </div>


        )

    }
}

export default ValidadorCUIT