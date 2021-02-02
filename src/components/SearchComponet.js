import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cadena: '',
            urls: [],
            total:0
        }
    }

    getUrls=async(cadena)=>{
        let data=await axios.get('http://127.0.0.1:4000/get/'+cadena)
        .then(({data})=>data);
        console.log(data)
        this.setState({urls:data.data,total:data.total})
    }


    handleChange = event => {
        this.setState(
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmit = event => {
        event.preventDefault()
        const body = this.state
        console.table(body)
        this.getUrls(body.cadena)
    }
    
    verificURL(){
        console.log("Entras")
        if(this.state.total<0){
            return (
            <div className="alert alert-danger" role="alert">
              No hay datos
            </div>
          )
        }
        return 
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-sm-12 align-self-center text-center">
                        <div className="card shadow">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        className="form-control"
                                        name="cadena"
                                        value={this.state.cadena}
                                        onChange={this.handleChange}
                                        placeholder="Buscar"
                                        required
                                    />
                                    <br />
                                    <button className="btn btn-primary btn-md btn-block" type='submit'>
                                        Buscar
                                        <svg width="2em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                        </svg>
                                    </button>
                                </form>
                                <br />
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Url</th>
                                            <th scope="col">Frecuencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.urls.map(url =>
                                            <tr key={url.id}>
                                                <td>{url.id}</td>
                                                <td><a href={url.url}>{url.url}</a></td>
                                                <td>{url.frec}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                {this.verificURL()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}