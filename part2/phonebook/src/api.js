
import Axios from 'axios';

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {

    return Axios.get(baseUrl).then((r) =>
        r.data
    ).catch((err) => {
        console.error(err);
    });
}

const create = async (person) => {

    return Axios.post(baseUrl, person).then((r) =>
        r.data
    );
}

const update = async (id, person) => {

    return Axios.put(`${baseUrl}/${id}`, person).then((r) =>
        r.data
    );
}

const remove = async (id) => {

    return Axios.delete(`${baseUrl}/${id}`).then(r =>
        r.data
    );
}

export default {
    getAll,
    create,
    update,
    remove
}