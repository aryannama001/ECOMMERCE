import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Typography } from '@mui/material'
import './profile.css'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { clearError, clearPasswordUpdated, clearProfileUpdated, loadUser, updatePassword, updateProfile } from '../../features/userSlice'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Profile = () => {

    const dispatch = useDispatch()
    const { error, user, isUpdated, loading, isPasswordUpdated } = useSelector(state => state.user)


    const [open, setOpen] = useState(false);
    const [passwordBoxOpen, setPasswordBoxOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar && user.avatar.url);

    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()



    const handleDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result)
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set("name", name);
        data.set("email", email);
        data.set("avatar", avatar)
        dispatch(updateProfile(data))
    }

    const handlePasswordChangeSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.set("oldPassword", oldPassword)
        data.set("newPassword", newPassword)
        data.set("confirmPassword", confirmPassword)

        dispatch(updatePassword(data));
    }
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar && user.avatar.url)
        }
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }

        if (isUpdated) {
            toast.success("Profile Updated")
            dispatch(loadUser())

            dispatch(clearProfileUpdated())
            setOpen(false)
        }

        if (isPasswordUpdated) {
            toast.success("Password Updated Successfully")

            dispatch(clearPasswordUpdated())
            setPasswordBoxOpen(false)
        }
    }, [error, isUpdated, dispatch, user, isPasswordUpdated])

    return (
        <>
            {loading && <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary" />
            </Box>}
            <div className="profile__page">

                <div className="profile__left">
                    <div className="avatar__profile">
                        <Avatar src={user.avatar && user.avatar.url} sx={{ width: 300, height: 300 }} />
                    </div>
                    <div>
                        <button onClick={handleClickOpen} >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div className="profile__right">
                    <div>
                        <h2>Name</h2>
                        <Typography>{user.name}</Typography>
                    </div>
                    <div>
                        <h2>Email</h2>
                        <Typography>{user.email}</Typography>
                    </div>
                    <div>
                        <h2>Joined On</h2>
                        <Typography>{user.createdAt && user.createdAt.substr(0, 10).split("-").reverse().join("-")}</Typography>
                    </div>
                    <div>
                        <Link to='/myorders'>My Orders</Link>
                        <button onClick={() => setPasswordBoxOpen(true)}>
                            Change Password
                        </button>
                    </div>

                </div>
            </div>
            <Dialog open={open}
                fullWidth={true}
            >
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <form encType='multipart/form-data' style={{ padding: "10px" }} onSubmit={handleProfileUpdate}>
                        <TextField label="Name" type='text' name='name' value={name} color='primary' focused fullWidth style={{ margin: "10px 0" }} onChange={(e) => setName(e.target.value)} />
                        <TextField label="Email" type='email' name='email' value={email} focused fullWidth style={{ margin: "10px 0" }} onChange={(e) => setEmail(e.target.value)} />
                        <div style={{
                            display: "flex",
                            gap: "20px",
                            margin: "15px 0"
                        }}>
                            <Avatar src={avatarPreview} />
                            <Button variant="contained" component="label">
                                Upload Image
                                <input hidden accept="image/*" name='avatar' type="file" onChange={handleDataChange} />
                            </Button>
                        </div>
                        <DialogActions style={{
                            margin: "10px"
                        }}>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'  >Update</Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>

            {/* password dialog */}

            <Dialog open={passwordBoxOpen}
                onClose={() => setPasswordBoxOpen(false)}
            // fullWidth={true}
            >
                <DialogTitle>Update Password</DialogTitle>
                <DialogContent>
                    <form onSubmit={handlePasswordChangeSubmit} >
                        <div className="password__update__container">
                            <input type="password" className=' border-2 rounded-md' name="" id="" required placeholder='old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            <input type="password" className=' border-2 rounded-md' name="" id="" required placeholder='new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <input type="password" className=' border-2 rounded-md' name="" id="" required placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>


                        <DialogActions style={{
                            margin: "10px"
                        }}>
                            <Button onClick={() => setPasswordBoxOpen(false)}>Cancel</Button>
                            <Button type='submit'  >Update</Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>

        </>
    )
}

export default Profile