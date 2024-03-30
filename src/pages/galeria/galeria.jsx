import React, { useState } from 'react';
import './Gallery.css'; // Asegúrate de tener este archivo en la misma carpeta

const CustomImageList = ({ items }) => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div className="gallery">
            {itemData.map((item, index) => (
                <div key={index} className={`item ${item.featured ? 'featured' : ''}`} onClick={() => setSelectedImg(item.img)}>
                    <img src={item.img} alt={item.title} />
                    <div className="info">
                        <h2>{item.title}</h2>
                        <p>{item.author}</p>
                    </div>
                </div>
            ))}
            {selectedImg && (
                <div className="lightbox" onClick={() => setSelectedImg(null)}>
                    <img src={selectedImg} alt="Selected" />
                </div>
            )}
        </div>
    );
};

const itemData = [
    {
        img: 'https://i.imgur.com/sLsTlBU.jpeg',
        author: '@casaJagui',
        featured: true,
    },
    {
        img: 'https://i.imgur.com/CFaaW7I.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/3hiqw2D.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/FcVHSeA.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/9V1HuAQ.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/y1befnp.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/1ADjNjq.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/kxo5Sf5.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/4NVS9kw.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/ZlGTd4Z.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/BC1wmJN.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/hhhTuDt.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/sLsTlBU.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/p9YavoB.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/UKVME7m.jpeg',
        author: '@casaJagui',
    },
    {
        img: 'https://i.imgur.com/LUrFMhi.jpeg',
        author: '@casaJagui',
    },
    
];


export default CustomImageList;
