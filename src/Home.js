import ValidadorCBU from "./ValidadorCBU";
import ValidadorCUIT from "./ValidadorCUIT";
import GeneradorCBU from "./GeneradorCBU";
import GeneradorCUIT from "./GeneradorCUIT";

function Home (){

    return(
        <div>
            <div className={"row mb-2"}>
                <div className={"col"}>

                    <div className={"card p-3 bg-light"} style={{height: "23rem"}}>
                        <h3 className={"mb-4 text-dark"}>Validador de CBU</h3>
                        <ValidadorCBU/>
                    </div>
                </div>
                <div className={"col"}>
                    <div className={"card p-3 bg-light"} style={{height: "23rem", width: "30rem"}}>
                        <h4 className={"mb-4 text-dark"}>Generador de CBU</h4>
                        <GeneradorCBU/>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"card p-3 bg-light"} style={{height: "20rem"}}>
                        <h4 className={"mb-4 text-dark"}>Validador de CUIT</h4>
                        <ValidadorCUIT/>
                    </div>
                </div>
                <div className={"col"}>
                    <div className={"card p-3 bg-light"} style={{height: "20rem", width: "30rem"}}>
                        <h4 className={"mb-4 text-dark"}>Generador de CUIT</h4>
                        <GeneradorCUIT/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
