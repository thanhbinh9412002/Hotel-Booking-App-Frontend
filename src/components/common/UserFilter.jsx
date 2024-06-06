import React, { useState, useEffect,  useMemo } from 'react'
import { getUserRole} from '../utils/ApiFunctions';
import { Row } from 'react-bootstrap';

const UserFilter = ({data, setFilteredData}) => {
    const[filter, setFilter] = useState("")
    const[listRoles, setListRoles]= useState([])
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await getUserRole();
                setListRoles(result);
                setSuccessMessage("Roles fetched successfully");
            } catch (error) {
                setErrorMessage("Failed to fetch roles");
            }
        };
        fetchRoles();
    }, []);

    const handleSelectChange = (e) => {
		const selectedRole = e.target.value; 
        setFilter(selectedRole);
        setSuccessMessage(selectedRole);

        const filteredUsers = data.filter((user) =>
            user.roles.some(role => role.name && role.name.includes(selectedRole))
        );
        setFilteredData(filteredUsers);
	}

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

  return (
    
    <div className="input-group mb-3">
        <span className="input-group-text" id="user-role-filter">Filter users by role </span>
        <select className="form-select"
                aria-label="user role filter"
                value={filter}
                onChange={handleSelectChange}>      
                <option value=""> select a role to filter ...  </option>
                {listRoles.map((type, index) => (
                        <option key={index} value={String(type)}> {String(type)}</option>
                ))}

        </select>
        <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>
    </div>

  )
}

export default UserFilter