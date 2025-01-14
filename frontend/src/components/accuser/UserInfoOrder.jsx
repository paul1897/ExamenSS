import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './UserInfoOrder.css';

const UserInfoOrder = () => {

  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const userId = userInfo && userInfo._id;

  console.log(userId);

  const params = useParams();
  const {id} = params;

  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const {data} = await axios.get(`/api/orders/${id}`);
        
        console.log(data);
        setOrder(data);
  
        
  
      } catch(err) {
          alert("Orden no encontrada!");
      }

    }

    if(!userInfo) {

      return navigate('/');

    }

    fetchOrder();

  }, [id, navigate, userInfo]);

  return (
    <div className='orderContainer'>
      <Link className='back' to="/account"><FontAwesomeIcon icon={faArrowLeft} /> Regresar</Link>
      <div className="orderRow">
        <h3>Mi orden No: {order._id}</h3>
      </div>
      <div className="orderRow products">
        <div className="orderCol">
          <div className="cards">
            {/* filtered product and show only my products if the are ordered */}
            {order.orderItems?.filter(item => {
              return item.sellerId === userId
            })?.map((item) => (
              
              <div className="filter-card" key={item._id}>
                <div className="card-header">
                    <img src={item.image.secure_url} alt={item.name} />
                    <Link to={`../seller/${item.sellerId}`}><img className='card-sellers' src={item.sellerImage} alt={item.seller} /></Link>
                </div>
                <div className="card-body">
                    <Link to={`../${item.slug}`}>{item.name} <FontAwesomeIcon icon={faEye} /></Link>
                    <span className="price">${(item.price).toFixed(2)}/kg</span>
                </div>
            </div>
            ))}
          </div>
        </div>
        <div className="orderCol">
          <div className="infoGroups">
            <div className="info-group">
              <span>Nombre:</span>
              <span>{order.name}</span>
            </div>
            <div className="info-group">
              <span>Email:</span>
              <span>{order.email}</span>
            </div>
            <div className="info-group">
              <span>Teléfono:</span>
              <span>{order.phone}</span>
            </div>
            <div className="info-group">
              <span>Dirección:</span>
              <span>{order.address}</span>
            </div>
          </div>
          <div className="infoGroups">
            <div className="info-group">
              <span>Sub Total:</span>
              {/* that it does not count all ordered products, but only mine */}
              <span>${order.orderItems?.filter(item => item.sellerId === userId)?.reduce((a,v) =>  a = a + v.price , 0 )?.toFixed(2)}</span>
            </div>
            <div className="info-group">
              {/* Earnings for the main site administrator per Order -> minus -> 10% for earnings of the site's main administrator, for each order */}
              <span>Tarifa:</span>
              <span>${((order.orderItems?.filter(item => item.sellerId === userId)?.reduce((a,v) =>  a = a + v.price , 0 )) * 0.10)?.toFixed(2) }</span>
            </div>
            <div className="info-group">
              <span>Precio total:</span>
              <span>${(order.orderItems?.filter(item => item.sellerId === userId)?.reduce((a,v) =>  a = a + v.price , 0 ) - ((order.orderItems?.filter(item => item.sellerId === userId)?.reduce((a,v) =>  a = a + v.price , 0 ))* 0.10))?.toFixed(2)}</span>
            </div>
          </div>
          <div className="infoGroups">
            <div className="info-group">
              <span>Pagado:</span>
              {order.isPaid ? (<span> Esta Pagado {order.paidAt} </span>) : (
              <span>No pagado!</span>
              )}
            </div>
            <div className="info-group">
              <span>Entregado:</span> 
              {order.isDelivered ? (<span> Esta Entregado {order.deliveredAt} </span>) : (
                <span>No entregado</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoOrder
