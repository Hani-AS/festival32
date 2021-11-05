import React, { useCallback, useEffect, useState } from 'react';
import { useGuestContext } from '../../../context/guestContext';
import { classes } from './ticketsStyles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Grid } from '@mui/material';


const Ticket = ({ ticket }) => {
  const [ticketsQuantity, setTicketsQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { guestUserOrder, setGuestUserOrder } = useGuestContext();
 

  const addTicket = () => {
    const newTicketQuantity = ticketsQuantity + 1;
    setTicketsQuantity(newTicketQuantity);
    setTotalPrice(totalPrice + ticket.price);
    storeOrderInContext(newTicketQuantity);
  };

  const removeTicket = () => {
    if (ticketsQuantity > 0) {
      const newTicketQuantity = ticketsQuantity - 1;
      setTicketsQuantity(newTicketQuantity);
      setTotalPrice(totalPrice - ticket.price);
      storeOrderInContext(newTicketQuantity);
    }
  };

  const storeOrderInContext = (ticketsQuantity) => {
    setGuestUserOrder((prev) => {
      const foundTicket = prev.tickets.find((t) => t.id === ticket._id);
      if (foundTicket) {
        foundTicket.quantity = ticketsQuantity;
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
          quantity: ticketsQuantity,
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
        setTicketsQuantity(foundTicket.quantity);
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
      sx={classes.ticketContainer}
    >
      <Grid
        container
        item
        s={3}
        xs={6}
        sx={classes.ticketType}
      >
        {ticket.typeName}
      </Grid>
      <Grid
        container
        item
        s={3}
        xs={6}
        sx={classes.ticketPrice}
      >
        € {ticketsQuantity === 0 ? ticket.price : totalPrice}
      </Grid>
      {ticket.availableQty === 0 ? (
        <Grid
          container
          item
          s={2}
          xs={12}
          sx={classes.soldOutContainer}
        >
            <Button sx={classes.soldOutBtn} disabled> SOLD OUT</Button>        
        </Grid>
      ) : (
        <Grid
          container
          item
          s={2}
          xs={12}
         sx={classes.ticketQuantityContainer}
        >
          <Grid item xs={4}>
            <Button
            sx={classes.ticketQuantityController}
              onClick={() => {
                removeTicket();
              }}
            >
              <RemoveIcon sx={classes.icon} />
            </Button>
          </Grid>
          <Grid
            container
            item
            xs={4}       
            sx={classes.ticketQuantity}         
          >
            {ticketsQuantity}
          </Grid>
          <Grid item xs={4}>
            <Button
            sx={classes.ticketQuantityController}
              onClick={() => {
                addTicket();
              }}
            >
              <AddIcon sx={classes.icon} />
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Ticket;
