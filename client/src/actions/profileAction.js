const url = process.env.REACT_APP_SERVER_URL;

export const getOrders = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  try {
    const response = await fetch(url + '/order', {
      headers: { authorization: `Bearer ${user?.token}` },
    });
    const data = await response.json();
    dispatch({ type: 'END_LOADING' });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: 'END_LOADING' });
    return { success: false, msg: 'Something went wrong!' };
  }
};