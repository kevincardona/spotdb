import React from "react";
import "../layouts/CardList.css";

const CardList = props => (
  <ul className="CardList">
    {/* This map function returns for every element in an array so you can show dynamic data */}
    {props.list &&
      props.list.map(item => (
        <li key={item.id} className="CardList-item">
          <div>
            {(item.images && item.images.length > 0 && (
              <img
                src={item.images[0].url}
                alt={item.name}
                className="CardList-image"
              />
            )) ||
              (item.album &&
                item.album.images &&
                item.album.images.length > 0 && (
                  <img
                    src={item.album.images[0].url}
                    alt={item.name}
                    className="CardList-image"
                  />
                ))}
            <h3>{item.name}</h3>
            {props.children}
          </div>
        </li>
      ))}
  </ul>
);

export default CardList;
