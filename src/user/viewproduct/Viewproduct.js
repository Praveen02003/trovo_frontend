import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar'; // Adjust path accordingly
import '../viewproduct/Viewproduct.css'
import { useParams } from 'react-router-dom';
import { Getparticularproduct } from '../../function/Getparticularproduct';
import { maincontext } from '../../App';
export const Viewproduct = () => {
    const {
        particularproduct,
        Setparticularproduct
    } = useContext(maincontext);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        Getparticularproduct(id, Setparticularproduct);
    }, [])

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row g-4">

                    {/* LEFT SIDE */}
                    <div className="col-lg-7">
                        <div className="sticky-top" style={{ top: '100px' }}>

                            {/* Main Image */}
                            <div className="card border-0 shadow-sm rounded-4 mb-3">
                                <img
                                    src={`http://localhost:5000/images/${particularproduct.image}`}
                                    className="card-img-top rounded-4"
                                    alt="Product"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="row g-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div className="col-3" key={i}>
                                        <div className="card border cursor-pointer hover-shadow text-center p-2">
                                            <small className="text-muted">Thumb {i}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-lg-5">
                        <div className="ps-lg-3">

                            {/* Breadcrumb */}
                            <nav className="mb-2">
                                <ol className="breadcrumb small">
                                    <li className="breadcrumb-item">
                                        <a href="#" className="text-muted text-decoration-none">Shop</a>
                                    </li>
                                    <li className="breadcrumb-item active text-primary">{particularproduct.category_name}</li>
                                </ol>
                            </nav>

                            {/* Title */}
                            <h2 className="fw-bold mb-2">{particularproduct.product_name}</h2>

                            {/* Rating */}
                            <div className="d-flex align-items-center mb-3">
                                <div className="text-warning me-2">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                </div>
                                <small className="text-muted">(128 Reviews)</small>
                            </div>

                            {/* Price */}
                            <h3 className="text-primary fw-bold mb-3">₹{particularproduct.price}</h3>

                            {/* Description */}
                            <p className="text-muted leading-relaxed mb-4">
                                {particularproduct.description}
                            </p>

                            {/* Quantity + Buttons */}
                            <div className="d-flex gap-2 mb-4">

                                <div className="input-group" style={{ width: "120px" }}>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >-</button>

                                    <input
                                        className="form-control text-center"
                                        value={quantity}
                                        readOnly
                                    />

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >+</button>
                                </div>

                                <button className="btn btn-primary flex-grow-1 fw-bold">
                                    Add to Cart
                                </button>

                                <button className="btn btn-outline-dark">
                                    <i className="bi bi-heart"></i>
                                </button>
                            </div>

                            {/* Accordion */}
                            <div className="accordion" id="productDetails">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#desc"
                                        >
                                            Features & Specifications
                                        </button>
                                    </h2>

                                    <div id="desc" className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <ul className="mb-0">
                                                <li>Bluetooth 5.2 connectivity</li>
                                                <li>Active Noise Cancellation</li>
                                                <li>High-fidelity audio drivers</li>
                                                <li>Quick charge support</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

