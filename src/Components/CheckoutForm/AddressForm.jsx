import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Input } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import {commerce} from '../../lib/commerce';

import  FormInput from './CustomTextField';
import { EmojiObjects } from '@material-ui/icons';

const AddressForm = ({checkoutToken}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };


    useEffect (() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect (() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider { ... methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address1' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='Zip' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider> 
        </>
    )
}

export default AddressForm
