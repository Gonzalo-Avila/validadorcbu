import React from "react";
import "./CustomStyles.css"
class GeneradorCUIT extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            tipo: "",
            tipoNumero: 0,
            cuitGenerado:"",
            showResult: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.obtenerTipo = this.obtenerTipo.bind(this);
        this.generarCUIT = this.generarCUIT.bind(this);
    }

    handleChange(event) {

        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        });
    }

    generarNumeroRandom(longitud){
        return Math.random().toString().substring(2, 2 + longitud)
    }

    obtenerTipo(){

        const tipos =
            parseInt(this.state.tipoNumero) !== 0 ?
            [this.state.tipoNumero] :
            this.state.tipo === "" ?
                [20,23,24,25,26,27,30,33,34] :
                this.state.tipo === "fisica" ?
                    [20,23,24,25,26,27] :
                    [30,33,34]

        return tipos[Math.floor(Math.random() * tipos.length)];
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
    generarCUIT(){

        const tipo = this.obtenerTipo().toString()
        const identificador = this.generarNumeroRandom(8).toString()
        const digitoVerificador = this.calcularDigitoVerificador(tipo, identificador).toString()

        this.setState({
            cuitGenerado: tipo + identificador + digitoVerificador + digitoVerificador
        })

    }
    render()
    {
        return(
            <div>
                <div className="mb-3">

                    <div className={"row"}>
                        <div className={"col-4"}>
                            <label htmlFor="tipo" className="form-label labels">Tipo</label>
                        </div>
                        <div className={"col"}>
                            <select className={"form-select"} name="tipo" id="tipo"
                                    onChange={(event) => {
                                        this.handleChange(event);
                                        this.setState({
                                            tipoNumero: 0
                                        })
                                    }}
                            value={this.state.tipo}>
                                <option value={""}>Cualquiera</option>
                                <option value={"fisica"}>Persona física</option>
                                <option value={"juridica"}>Persona jurídica</option>
                            </select>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-4"}>
                            <label htmlFor="tipoNumero" className="form-label labels">Código</label>
                        </div>
                        <div className={"col"}>
                            <select className={"form-select"} value={this.state.tipoNumero}
                                    name="tipoNumero" id="tipoNumero" onChange={this.handleChange}>
                                <option value={0}>Cualquiera</option>
                                {this.state.tipo === "" ?
                                    <React.Fragment>
                                        <option value={20}>20</option>
                                        <option value={23}>23</option>
                                        <option value={24}>24</option>
                                        <option value={25}>25</option>
                                        <option value={26}>26</option>
                                        <option value={27}>27</option>
                                        <option value={30}>30</option>
                                        <option value={33}>33</option>
                                        <option value={34}>34</option>
                                    </React.Fragment>
                                    : this.state.tipo === "fisica" ?
                                        <React.Fragment>
                                            <option value={20}>20</option>
                                            <option value={23}>23</option>
                                            <option value={24}>24</option>
                                            <option value={25}>25</option>
                                            <option value={26}>26</option>
                                            <option value={27}>27</option>
                                        </React.Fragment>
                                        :
                                    <React.Fragment>
                                        <option value={30}>30</option>
                                        <option value={33}>33</option>
                                        <option value={34}>34</option>
                                    </React.Fragment>
                                }
                            </select>
                        </div>
                    </div>

                    <button className={"btn btn-primary"} onClick={this.generarCUIT}>Generar</button>

                    <div className={"mt-5"}>
                        <input type="text" className="form-control text-center" value={this.state.cuitGenerado}
                               disabled={true}/>
                    </div>


                </div>
            </div>


        )

    }
}

export default GeneradorCUIT