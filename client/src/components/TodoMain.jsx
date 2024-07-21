import Post from "./Post";
import Update from "./Update";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Items } from "../slicers/todoSlice";
import { showPost } from "../slicers/postLayerSlice";
import { logout } from "../slicers/authSlice";

const TodoMain = () => {

    // const [postLayer, setPostLayer] = useState(false)
    const [deleted, setDeleted] = useState(false);

    const [updateItem, setUpdateItem] = useState([]);
    const [filterONE, setFilterONE] = useState([])

    const postLayer = useSelector(state => state.postLayerSlice);
    const todo = useSelector(state => state.todo);
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://localhost:3000/auth/todo/", {
            headers: { "Token-Auth": token }
        })
            .then(res => res.json())
            .then(data => dispatch(Items(data.message)))
            .catch(err => console.log(err));
    }, [todo, token]);

    function findOne(e) {
        const name = e.target.value.toUpperCase()
        setFilterONE((todo.filter((tit) => tit.title.toUpperCase().includes(name))));
    }
    function resetFilter() {
        setFilterONE([]);
    }

    function deleteItem(id) {
        fetch(`http://localhost:3000/auth/todo/${id}`, { method: "DELETE", headers: { "Token-Auth": token } })
            .then(res => res.json())
            .then(data => {
                const filteredDel = todo.filter((its) => its._id !== id)
                dispatch(Items(filteredDel))
                setDeleted(true)
                setTimeout(() => {
                    setDeleted(false)
                }, 2000)
            })
            .catch(err => console.log(err));
    };

    function logOff() {
        localStorage.removeItem("token");
        dispatch(logout());
    };

    return (
        <>
            {postLayer == "post" ? <Post /> : postLayer == "update" ? <Update updateItem={updateItem} /> : <div className="todoMainContainer">
                <button className="btn btn_post" onClick={() => {
                    dispatch(showPost("post"))
                    resetFilter();
                }}>+</button>
                <input className="getOne" type="text" placeholder="Pesquisar no To Do" onChange={findOne} />
                <button className="btn btn_logout" onClick={logOff}>Logoff</button>
                <div className="items" >
                    {deleted ? <p className="delete_sucess">Apagado com sucesso</p> : ""}

                    {filterONE.length !== 0 ? filterONE.map((filt, idx) => <div key={idx} className="item">
                        <div>
                            <h1>{filt.title}</h1>
                            <p>{filt.description}</p>
                        </div>
                        <div className="div_itemBtn">
                            <button className="btn" onClick={() => {
                                dispatch(showPost("update"));
                                setUpdateItem(filt)
                                resetFilter();
                            }}>Update</button>
                            <button className="btn" onClick={() => { deleteItem(filt._id) }}>Delete</button>
                        </div>
                    </div>) : todo.map((item, idx) => <div key={idx} className="item">
                        <div>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                        <div className="div_itemBtn">
                            <button className="btn" onClick={() => {
                                dispatch(showPost("update"));
                                setUpdateItem(item)
                                resetFilter();
                            }}>Update</button>
                            <button className="btn" onClick={() => { deleteItem(item._id) }}>Delete</button>
                        </div>
                    </div>)}
                </div>
            </div>}

        </>
    );
};

export default TodoMain;