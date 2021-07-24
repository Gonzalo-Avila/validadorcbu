import React from "react";
import './CustomStyles.css';
class ValidadorCBU extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            cbu: "",
            showResult: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.longitudValida = this.longitudValida.bind(this);
        this.primerBloqueValido = this.primerBloqueValido.bind(this);
        this.segundoBloqueValido = this.segundoBloqueValido.bind(this);
        this.validarCBU = this.validarCBU.bind(this);
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
    longitudValida(){
        return this.state.cbu.length === 22
    }
    primerBloqueValido(){
        var primerBloque = this.state.cbu.substring(0,8)
        var digitoVerificador = parseInt(primerBloque[7])
        var suma = primerBloque[0]*7 + primerBloque[1]*1 + primerBloque[2]*3 + primerBloque[3]*9 + primerBloque[4]*7 +
            primerBloque[5]*1 + primerBloque[6]*3

        var diferencia = 10 - suma.toString().slice(-1)

        console.log("Suma 1: " + suma)
        console.log("Diferencia 1: " + diferencia)
        return (digitoVerificador !== 0 && digitoVerificador === diferencia) ||
            (digitoVerificador === 0 && diferencia === 10)
    }
    segundoBloqueValido(){
        var segundoBloque = this.state.cbu.substring(8,22)
        var digitoVerificador = parseInt(segundoBloque[13])
        var suma = segundoBloque[0]*3 + segundoBloque[1]*9 + segundoBloque[2]*7 + segundoBloque[3]*1 + segundoBloque[4]*3 +
            segundoBloque[5]*9 + segundoBloque[6]*7 + segundoBloque[7]*1 + segundoBloque[8]*3 + segundoBloque[9]*9 +
            segundoBloque[10]*7 + segundoBloque[11]*1 + segundoBloque[12]*3

        var diferencia = 10 - suma.toString().slice(-1)
        return (digitoVerificador !== 0 && digitoVerificador === diferencia) ||
            (digitoVerificador === 0 && diferencia === 10)
    }
    cbuValido(){
        return this.longitudValida() && this.primerBloqueValido() && this.segundoBloqueValido()
    }

    validarCBU(){
        this.setState({
            showResult: true
        });

    }

    render()
    {
        return(
            <div>
                <div className="mb-3">
                    <label htmlFor="cbu" className="form-label labels">
                        Ingresá un CBU
                    </label>
                    <input name="cbu" type="text" className="form-control text-center" id="cbu" maxLength={"22"}
                           onChange={this.handleChange}
                            placeholder={"22 dígitos"}
                    />
                </div>
                <div>
                    <span  tabIndex="0" data-bs-toggle="tooltip" title={this.state.cbu.length === 22 ? "Validar el CBU" : "El CBU debe contener 22 dígitos"}>
                        <button className={"btn btn-primary mb-5"} disabled={!(this.state.cbu.length === 22)} onClick={this.validarCBU}>
                            Validar
                        </button>
                    </span><br/>
                    <div  hidden={!this.state.showResult}>
                        {
                            this.cbuValido() ?
                            <p className={"text-success"}>CBU VÁLIDO</p> :
                            <p className={"text-danger"}>CBU INVÁLIDO</p>
                        }
                    </div>
                </div>
            </div>


        )

    }
}

export default ValidadorCBU