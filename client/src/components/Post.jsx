import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Items } from "../slicers/todoSlice";
import { showPost } from "../slicers/postLayerSlice";



const Post = () => {

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


    async function postItens(e) {
        e.preventDefault();
        if (title && description) {
            await fetch("http://localhost:3000/auth/todo/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Token-Auth": token
                },
                body: JSON.stringify({ title, description })
            }).then(res => res.json())
                .then(data => {
                    dispatch(Items([...todo, data.message]));
                    setTitle("");
                    setDescription("");
                    setSucess(true);
                    const timer = setTimeout(() => {
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
                    <p>Title: <input className="input" type="text" onChange={pickTitle} value={title} required maxLength={100}/></p>
                    {/* <p>Description: <input className="input in_description" type="text" onChange={pickDescription} value={description} required maxLength={500} /></p> */}
                    <p>Description: <textarea className="input in_description" onChange={pickDescription} value={description} required maxLength={500}></textarea></p>
                    
                    <button className="btn" onClick={postItens}>Send</button>
                </form>

                {sucess ? <p className="message_sucess"> Cadastrado com Sucesso</p> : ""}
            </div>
        </>
    );

};

export default Post