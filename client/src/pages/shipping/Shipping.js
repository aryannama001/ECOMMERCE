import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShippingSteps from '../../components/Stepper/ShippingSteps'
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from 'country-state-city'
import './shipping.css'
import { saveShippingInfo } from '../../features/cartSlice';
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
    const { shippingInfo } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state)

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        const shippingData = {
            address,
            city,
            pinCode,
            phoneNo,
            country,
            state
        }


        dispatch(saveShippingInfo(shippingData))
        navigate('/confirm-order')
    }
    return (
        <>
            <ShippingSteps activeStep={0} />
            <div className="shipping__details__container min-h-screen">
                <div >

                    <form encType="multipart/form-data"
                        onSubmit={handleShippingSubmit}
                        className="shipping__details__inputs__container">


                        <div className="shipping__details__input">
                            <HomeIcon />
                            <input required type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="shipping__details__input">
                            <LocationCityIcon />
                            <input required type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="shipping__details__input">
                            <PinDropIcon />
                            <input required type="number" placeholder='Pin Code' value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                        </div>
                        <div className="shipping__details__input">
                            <LocalPhoneIcon />
                            <input required size="10" type="number" placeholder='PhoneNo' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </div>
                        <div className="shipping__details__input">
                            <PublicIcon />
                            <select name="country" required value={country} onChange={(e) => setCountry(e.target.value)} >
                                <option value="">Country</option>
                                {
                                    Country && Country.getAllCountries().map(i => (
                                        <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {country && <div className="shipping__details__input">
                            <TransferWithinAStationIcon />
                            <select name="state" required value={state} onChange={(e) => setState(e.target.value)} >
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry(country).map(item => (
                                        <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>}
                        <div className="shipping__details__input">
                            <input type="submit" value="Continue" />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Shipping