import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGuestContext } from '../../../context/guestContext';
import Ticket from './Ticket';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const { guestUserOrder } = useGuestContext();
  let totalTicketsPrice = 0;
  if (guestUserOrder.tickets.length > 0) {
    totalTicketsPrice = guestUserOrder.tickets.reduce(
      (acc, value) => acc + value.price * value.quantity,
      0,
    );
  }
  const fetchTickets = async () => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + '/tickets';
      const response = await fetch(url);
      const { tickets } = await response.json();
      setTickets(tickets);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTickets();
    localStorage.removeItem('orderInfo');
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        {error && <h3>Sorry! the tickets are not available now</h3>}
        {tickets &&
          tickets.map((ticket) => {
            return <Ticket key={ticket._id} ticket={ticket} />;
          })}
      </Grid>
      <Grid container item xs={12} justifyContent='center'>
        <Grid item xs={4}>
          Total: € {totalTicketsPrice}
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Grid>
  );
};
export default Tickets;
