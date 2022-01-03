import React, { Component } from 'react';
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const uploadFile = "http://localhost:8000/upload-file";
const deleteFile = "http://localhost:8000/delete-file";
const getFile = "http://localhost:8000/get-file";

export default class Uploadfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            fileList: []
        }
    }
    componentDidMount() {
        this.onGetFile()
    }
    onFileChange(e) {
        let file = e.target.files;
        console.log(file);
        this.setState({ selectedFile: e.target.files[0] });
    };
    onFileUpload() {
        const formData = new FormData();
        formData.append("file", this.state.selectedFile)
        console.log("File data>>>>>>>>>", this.state.selectedFile);
        axios.post(uploadFile, formData).then(response => {
            console.log(response.data.message);
            console.log(`Response coming from backend on inserting>>>>>> ${JSON.stringify(response.data.fileName)}`);
            if (response.data.status) {
                this.onGetFile()
            }
            this.setState({ selectedFile: null })
        });
    }
    onGetFile() {
        axios.get(getFile).then(response => {
            console.log(`Response on getting file>>>>>>>>>>>${JSON.stringify(response.data.data)}`);
            this.setState({ fileList: response.data.data });
        });
    }
    onDeleteData = (id) => {
        axios.post(deleteFile, { id: id }).then(response => {
            console.log(response);
            this.onGetFile()
        }
        );
    }
    list() {
        let arryList = [];
        for (let ele of this.state.fileList) {
            let element = (
                <>
                    <tr key={ele.id}>
                        <td>{ele.id}</td>
                        <td>{ele.file_name}</td>
                        <td><button className="btn btn-danger" onClick={() => { this.onDeleteData(ele.id) }}>Delete</button></td>
                    </tr>
                </>
            )
            arryList.push(element)
        }
        return arryList;
    }
    render() {
        return (
            <div>
                <Header />
                <div className='form-width'> 
                    <form className='mt-5 class="col-md-4 col-md-offset-4 text-center' method='post' encType='multipart/form-data'>
                        <div className="form-group">
                            <label className='ms-5 p-2' htmlFor="file">Choose File</label>
                            <input type="file" name="file" className="form-control-file" id="file" onChange={(e) => this.onFileChange(e)} />
                            <button type="button" className="btn btn-primary" onClick={this.onFileUpload.bind(this)}>Upload</button>
                        </div>
                    </form>
                </div>

                <div>
                    <table className='table table-bordered table-sm w-50 mt-5 ms-auto me-auto'>
                        <thead>
                            <tr>
                                <th className='col'>Id</th>
                                <th className='col'>Filename</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.list()
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}
