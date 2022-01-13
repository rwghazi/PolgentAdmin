import axios from "axios";
import { useState } from "react";
import './Modal.css'

export const UpdateRewardModal = (props) => {
    const [state, setState] = useState(props.data)
    const [image, setImage] = useState("")

    let imgprev = state.image

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
        if (image !== state.image && image) {
            axios.post(`https://api.cloudinary.com/v1_1/chcpyto/image/upload`, data)
                .then(res => {
                    state.image = res.data.url
                    axios.put(`/rewards/${props.data.id}`, state)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))

        } else {
            axios.put(`/rewards/${props.data.id}`, state)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className="modal fade mt-5" id={`modalReward${props.data.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="label-modal edit">Edit Reward</h5>
                        <div onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" name="category" value={state.category} onChange={onChange} >
                                    <option value="" defaultValue >Select</option>
                                    <option value="cashout">cash-out</option>
                                    <option value="emoney">emoney</option>
                                    <option value="pulsa">pulsa</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <select className="form-control" name="company" value={state.company} onChange={onChange} >
                                    <option value="" defaultValue >Select</option>
                                    <option value="telkomsel">Telkomsel</option>
                                    <option value="indosat">Indosat</option>
                                    <option value="smartfren">Smartfren</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Title  </label>
                                <input type="text" className="form-control" value={state.name} name="name" onChange={onChange} />
                            </div>
                            <div className="form-group" >
                                <label>Image </label>
                                <div className="row">
                                    <div className="col-md-10">
                                        <input type="file" className="form-control custom-file-input" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>
                                    <div className="col-md-2">
                                        <img src={imgprev} alt="preview" width={35} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>point  </label>
                                <input type="number" className="form-control" value={state.point} name="point" onChange={onChange} />
                            </div>
                            <button onClick={onSubmit} style={{ marginTop: "-20px" }} type="submit" className="btn btn-e mb-5" data-bs-dismiss="modal">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}