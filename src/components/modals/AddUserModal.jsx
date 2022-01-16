import axios from "axios";
import { useState } from "react";
import './Modal.css'

export const AddUserModal = () => {
    const [state, setState] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = e => {
        const header = {
            "Content-type": "application/json",
            Authorization: localStorage.getItem('token')
        }
        axios.post(`/admin/register`, state, {
            headers: header
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
        setState({
            ...state,
            toko: "",
            email: "",
            password: "",
            poin: ""
        })
    }
    console.log("state", state)

    return (
        <div className="modal fade mt-5" id="modalFormName" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="label-modal edit">Add User</h5>
                        <div onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Name  </label>
                                <input type="text" className="form-control" value={state.toko} name="toko" onChange={onChange} />
                            </div>
                            <div className="form-group" >
                                <label>Email </label>
                                <input type="email" className="form-control" value={state.email} name="email" onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label>Password  </label>
                                <div className="row">
                                    <div className="col-md-10">
                                        <input type={passwordShown ? "text" : "password"} className="form-control" value={state.password} name="password" onChange={onChange} />
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={togglePassword}> {passwordShown ? "Hide" : "Show"}</button>
                                    </div>
                                </div>
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