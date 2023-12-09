import React, { useState } from 'react';
import api from '../utils/api';
import '../css/OrderDetail.css';

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [subTotal, setSubTotal] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addOrderUserId, setAddOrderUserId] = useState('');
    const [displayOrdersUserId, setDisplayOrdersUserId] = useState('');
    const [displayOrders, setDisplayOrders] = useState(false);


    const fetchOrderDetails = async () => {
        try {
            const response = await api.getOrder(
                displayOrdersUserId
            );
            //   console.log(response.data.orders);
            setOrderDetails(response.data.orders);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        try {
            await api.addOrder({
                sub_total: subTotal,
                phone_number: phoneNumber,
                user_id: addOrderUserId
            });
            //   console.log(response.data.message); 
            fetchOrderDetails(addOrderUserId); // for Fetching and updating the order details
            setSubTotal('');
            setPhoneNumber('');
            setAddOrderUserId('');
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    return (
        <div className="order-details-container">
            <h2>Add New Order</h2>
            <form className="add-order-form" onSubmit={handleAddOrder}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={addOrderUserId}
                    onChange={(e) => setAddOrderUserId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Sub Total"
                    value={subTotal}
                    onChange={(e) => setSubTotal(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type="submit">Add Order</button>
            </form>

            <h2>Display Order Details</h2>
            <form className="display-orders-form" onSubmit={fetchOrderDetails}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={displayOrdersUserId}
                    onChange={(e) => setDisplayOrdersUserId(e.target.value)}
                />
                <button type="button" onClick={() => {
                    fetchOrderDetails(displayOrdersUserId);
                    setDisplayOrders(true);
                }}>Show Orders</button>

            </form>

            {displayOrders && (
                <div>
                    <h2>Your Orders</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Sub Total</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((order, index) => (
                                <tr key={index}>
                                    <td>{order._id}</td>
                                    <td>{order.sub_total}</td>
                                    <td>{order.phone_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;

