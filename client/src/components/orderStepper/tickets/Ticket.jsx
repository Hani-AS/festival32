import React, { useCallback, useEffect, useState } from 'react';
import { useGuestContext } from '../../../context/guestContext';
import { ButtonIconWrapper, ButtonWrapper } from './ticketsStyles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from '@mui/material';

const Ticket = ({ ticket }) => {
  const [ticketsQty, setTicketsQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { guestUserOrder, setGuestUserOrder } = useGuestContext();

  const addTicket = () => {
    setTicketsQty(ticketsQty + 1);
    setTotalPrice(totalPrice + ticket.price);
  };

  const removeTicket = () => {
    if (ticketsQty > 0) {
      setTicketsQty(ticketsQty - 1);
      setTotalPrice(totalPrice - ticket.price);
    }
  };

  const storeOrderInContext = (ticketsQty) => {
    setGuestUserOrder((prev) => {
      const foundTicket = prev.tickets.find((t) => t.id === ticket._id);
      if (foundTicket) {
        foundTicket.quantity = ticketsQty;
        if (foundTicket.quantity === 0) {
          // remove ticket from guestContext if quantity is 0
          return {
            ...prev,
            tickets: prev.tickets.filter((t) => t.id !== foundTicket.id),
          };
        } else {
          return {
            ...prev,
          };
        }
      } else {
        prev.tickets.push({
          id: ticket._id,
          typeName: ticket.typeName,
          quantity: ticketsQty,
          price: ticket.price,
        });
        return {
          ...prev,
          festivalId: ticket.festivalId,
          tickets: prev.tickets,
        };
      }
    });
  };

  const checkPreviousValues = useCallback(() => {
    if (guestUserOrder.tickets.length > 0) {
      const foundTicket = guestUserOrder.tickets.find(
        (t) => t.id === ticket._id,
      );
      if (foundTicket) {
        setTicketsQty(foundTicket.quantity);
        setTotalPrice(foundTicket.price * foundTicket.quantity);
      }
    }
  }, [guestUserOrder.tickets, ticket._id]);

  useEffect(() => {
    checkPreviousValues();
  }, [checkPreviousValues]);

  return (
    <Grid
      container
      key={ticket._id}
      justifyContent='center'
      sx={{ margin: '20px 0px' }}
    >
      <Grid container item md={2} xs={6} alignItems='center'>
        {ticket.typeName}
      </Grid>
      <Grid
        container
        item
        md={2}
        xs={6}
        alignItems='center'
        justifyContent='center'
        sx={{ fontWeight: 'bold' }}
      >
        € {ticketsQty === 0 ? ticket.price : totalPrice}
      </Grid>

      {ticketsQty === 0 ? (
        <Grid
          container
          item
          md={2}
          xs={12}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12}>
            <ButtonWrapper
              disabled={ticket.availableQty === 0}
              onClick={() => {
                addTicket();
                storeOrderInContext(ticketsQty + 1);
              }}
            >
              {ticket.availableQty === 0 ? 'SOLD OUT' : 'ADD TO CART'}
            </ButtonWrapper>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          item
          md={2}
          xs={12}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={4}>
            <ButtonIconWrapper
              onClick={() => {
                removeTicket();
                storeOrderInContext(ticketsQty - 1);
              }}
            >
              <RemoveIcon fontSize='small' />
            </ButtonIconWrapper>
          </Grid>
          <Grid
            container
            item
            xs={4}
            justifyContent='center'
            sx={{
              height: '45px',
              borderTop: '1px solid #ddd',
              borderBottom: '1px solid #ddd',
            }}
            alignItems='center'
          >
            {ticketsQty}
          </Grid>
          <Grid item xs={4}>
            <ButtonIconWrapper
              onClick={() => {
                addTicket();
                storeOrderInContext(ticketsQty + 1);
              }}
            >
              <AddIcon fontSize='small' />
            </ButtonIconWrapper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Ticket;
