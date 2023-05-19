import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import './productList.css'
import { toast } from 'react-toastify';
import { clearAllUsersError, clearRoleUpdate, clearUserDeleted, clearUserError, deleteUser, getAllUsers, updateUserRole } from '../../features/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UsersList = () => {

    const dispatch = useDispatch()

    const { error, users } = useSelector(state => state.allUsers)
    const { error: userError, isRoleUpdated, isUserDeleted } = useSelector(state => state.adminUser)

    useEffect(() => {
        dispatch(getAllUsers())

        if (error) {
            toast.error(error)
            dispatch(clearAllUsersError());
        }

        if (userError) {
            toast.error(userError);
            dispatch(clearUserError())
        }

        if (isRoleUpdated) {
            toast.success("Role Updated")
            dispatch(clearRoleUpdate())
        }

        if (isUserDeleted) {
            toast.success("user deleted ")
            dispatch(clearUserDeleted())
        }

    }, [dispatch, error, userError, isRoleUpdated, isUserDeleted])

    const handleDelete = (id) => {
        dispatch(deleteUser(id))
    }

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userId, setUserID] = useState("")
    const [role, setRole] = useState()

    const handleClickOpen = (id, userEmail, userName, userRole) => {
        setName(userName)
        setEmail(userEmail)
        setUserID(id)
        setRole(userRole)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserUpdate = (userRole) => {
        const data = new FormData()
        if (userRole === "Admin") {
            data.set("isAdmin", false)
        } else if (userRole === "User") {
            data.set("isAdmin", true)
        }

        dispatch(updateUserRole({ userId, data }))

        setOpen(false)
    }



    const columns = [
        { field: "id", headerName: "User ID", minWidth: 300, flex: 1 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            type: "number",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.role === "Admin"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.5,
            headerName: "Actions",
            minWidth: 200,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link onClick={() => handleClickOpen(params.row.id, params.row.email, params.row.name, params.row.role)}> <FaEdit /> </Link>

                        <Button className='delete__icon' onClick={() => handleDelete(params.row.id)}>
                            <MdDelete />
                        </Button>
                    </>
                );
            },

        },
    ];

    const rows = []

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.isAdmin ? "Admin" : "User"
            });
        });


    return (
        <div className='min-h-screen'>

            <div className='dashboard__container px-5'>
                <h1 className='text-center text-3xl font-medium text-blue-800 pt-5'>All Users</h1>

                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="AllProductsTable mt-10 "
                        autoHeight
                    />
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User Role</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h1>Name: {name}</h1>
                        <h1>Email: {email}</h1>
                        <h1 style={{ color: "red", marginTop: "5px" }}>Update user role to {role === "Admin" ? "User" : "Admin"}?</h1>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleUserUpdate(role)}>Update</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default UsersList