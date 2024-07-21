import { useDispatch, useSelector } from "react-redux";
import { Items } from "../slicers/todoSlice";
import { showPost } from "../slicers/postLayerSlice";
import { useState } from "react";



const Update = ({ updateItem }) => {

    const token = useSelector(state => state.auth.token);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sucess, setSucess] = useState(false);

    const todo = useSelector(state => state.todo);

    const dispatch = useDispatch();

    function pickTitle(e) {
        let t = e.target.value;
        setTitle(t);
    };

    function pickDescription(e) {
        let d = e.target.value;
        setDescription(d);
    };

    async function updateItemFn(e) {
        console.log(updateItem)
        e.preventDefault();
        if (title && description) {
            await fetch(`http://localhost:3000/auth/todo/${updateItem._id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Token-Auth": token
                },
                body: JSON.stringify({ title, description })
            }).then(res => res.json())
                .then(data => {
                    //como chamar o todo atualizado?

                    // const updateAll = todo.map(item => {
                    //     item._id === updateItem._id ? { ...item, title, description } : item;
                    // });
                    // dispatch(Items(updateAll));
                    setTitle("");
                    setDescription("");
                    setSucess(true);
                    setTimeout(() => {
                        dispatch(showPost(""))
                        setSucess(false)
                    }, 700)
                })
                .catch(err => console.log(err));
        };
    };

    return (
        <>
            <div className="postContainer">
                <div className="close" onClick={() => { dispatch(showPost("")) }}>X</div>
                <form action="">
                    <p>Title: <input className="input" type="text" value={title} onChange={pickTitle} required maxLength={100}/></p>
                    <p>Description: <textarea className="input in_description" onChange={pickDescription} value={description} required maxLength={500}></textarea></p>
                    <button className="btn" onClick={updateItemFn}>Send</button>
                </form>

                {sucess ? <p className="message_sucess"> Cadastrado com Sucesso</p> : ""}
            </div>
        </>
    )


}

export default Update