import  { useState } from 'react';

const Problem1 = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', status: '' });
    const [show, setShow] = useState('all');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.name && newTask.status) {
            setTasks([...tasks, newTask]);
            setNewTask({ name: '', status: '' }); 
        }
    };

    const handleClick = (status) => {
        setShow(status);
    };

    const getFilteredTasks = () => {
        if (show === 'active') {
            return tasks.filter(task => task.status.toLowerCase() === 'active');
        } else if (show === 'completed') {
            return tasks.filter(task => task.status.toLowerCase() === 'completed');
        } else {
            return tasks.sort((a, b) => {
                if (a.status.toLowerCase() === 'active') return -1;
                if (b.status.toLowerCase() === 'active') return 1;
                if (a.status.toLowerCase() === 'completed') return -1;
                if (b.status.toLowerCase() === 'completed') return 1;
                return 0;
            });
        }
    };
    

    const filteredTasks = getFilteredTasks();

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={newTask.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                name="status"
                                value={newTask.status}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' ? 'active' : ''}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' ? 'active' : ''}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' ? 'active' : ''}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <table className="table table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
