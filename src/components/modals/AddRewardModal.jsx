import axios from "axios";
import { useState } from "react";
import './Modal.css'

export const AddRewardModal = () => {
    const [state, setState] = useState("")
    const [image, setImage] = useState("");

    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = e => {
        
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "lw7i8fyd")
        data.append("cloud_name", "chcpyto")
        axios.post(`https://api.cloudinary.com/v1_1/chcpyto/image/upload`, data)
            .then(res => {
                state.img = res.data.url
                state.namaBank = state.namaInstansi
                state.poin = state.poin / 1
                console.log("datasent=",typeof state.poin)
                const header = {
                    "Content-type": "application/json",
                    Authorization: localStorage.getItem('token')
                }
                axios.post(`/admin/addRedem`, state, {
                    headers: header
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        setState({
            ...state,
            nameType: "",
            namaInstansi: "",
            description: "",
            img: "",
            poin: 0
        })
    }

    return (
        <div className="modal fade mt-5" id="modalFormName" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        {/* <button type="button" className="close btn-close mt-5" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        <h5 className="label-modal edit">Add Reward</h5>
                        <div onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" name="nameType" value={state.nameType} onChange={onChange} >
                                    <option value="" defaultValue >Select</option>
                                    <option value="cashout">cash-out</option>
                                    <option value="emoney">emoney</option>
                                    <option value="pulsa">pulsa</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <select className="form-control" name="namaInstansi" value={state.namaInstansi} onChange={onChange} >
                                    <option value="" defaultValue >Select</option>
                                    <option value="telkomsel">Telkomsel</option>
                                    <option value="indosat">Indosat</option>
                                    <option value="smartfren">Smartfren</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Title  </label>
                                <input type="text" className="form-control" value={state.description} name="description" onChange={onChange} />
                            </div>
                            <div className="form-group" >
                                <label>Image </label>
                                <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
                            </div>
                            <div className="form-group">
                                <label>point  </label>
                                <input type="number" className="form-control" value={state.poin} name="poin" onChange={onChange} />
                            </div>
                            <button onClick={onSubmit} style={{ marginTop: "-20px" }} type="submit" className="btn btn-e mb-5" data-bs-dismiss="modal">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}