import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import donationService from '../../services/donationService';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box, Card, Container, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';


function Donation() {
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    
    const { t } = useTranslation('common');

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (!error) {
            try {
                const response = await donationService.makeDonation({
                    name,
                    email,
                    country,
                    amount: parseInt(amount) * 100,
                    paymentMethodId: paymentMethod.id,
                }).then(() => {
                    setSuccess(true);
                });
            } catch (error) {
                alert('Error making donation: ' + error.message);
            }
        } else {
            alert(error.message);
        }
    };

    return (
        <Box sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 64px)',
            color: 'text.primary',
        }}>
            <Container maxWidth="sm" sx={{ width: '40vw' }}>
                {!success ? (
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Typography variant="h4" color="primary" gutterBottom>{t('donate_to_our_cause')}</Typography>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                            sx={{ input: { color: 'white' }, label: { color: 'text.secondary' } }}
                        />
                        <TextField
                            label="Donation Amount ($)"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                            sx={{ input: { color: 'white' }, label: { color: 'text.secondary' } }}
                        />
                        <TextField
                            label="Full Name on Card"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                            sx={{ input: { color: 'white' }, label: { color: 'text.secondary' } }}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel sx={{ color: 'text.secondary' }}>Country</InputLabel>
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                label="Country"
                                sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'text.secondary' } }}
                            >
                                <MenuItem value="">Select Country</MenuItem>
                                <MenuItem value="United States">United States</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="Dubai">Dubai</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" variant="outlined" required>
                            <Card variant="outlined" sx={{ p: 2, backgroundColor: 'background.paper' }}>
                                <CardElement options={{ hidePostalCode: true, style: { base: { color: '#fff', '::placeholder': { color: '#aab7c4' } } } }} />
                            </Card>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                            {t('donate')}
                        </Button>
                    </Box>
                ) : (
                    <Alert> <Typography 
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '2.5rem' },
                      fontWeight: 'bold',
                      textAlign: 'center',  
                    }}
                  >
                    {t('thank_you_donation_text')}, {name}! Your donation has been received.
                  </Typography>
                  
                    </Alert>
                )}
            </Container>
        </Box>
    );
}

export default Donation;