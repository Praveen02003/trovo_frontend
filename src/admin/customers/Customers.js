import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../customers/Customers.css';
import { Sidebar } from "../sidebar/Sidebar";
import { Getallcustomers } from "../../function/Getallcustomers";
import { maincontext } from "../../App";
import { Link } from "react-router-dom";
import { Blockcustomer } from "../../function/Blockcustomer";
import { Closetoast } from "../../function/Closetoast";
import { Getloginuser } from "../../function/Getloginuser";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";

const ini = (n = '') => n.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

const statusClass = s => {
    switch ((s || '').toLowerCase()) {
        case 'active': return 'cs-active';
        case 'blocked': return 'cs-blocked';
        default: return 'cs-inactive';
    }
};
const dotClass = s => {
    switch ((s || '').toLowerCase()) {
        case 'active': return 'od-active';
        case 'blocked': return 'od-blocked';
        default: return 'od-other';
    }
};

export const Customers = () => {
    const {
        page, Setpage, status, Setstatus, search, Setsearch,
        allcustomers, Setallcustomers,
        showtoast, Setshowtoast, toastcolor, Settoastcolor, toastmessage, Settoastmessage,
        loginuser, Setloginuser,
    } = useContext(maincontext);

    useEffect(() => {
        const load = async () => {
            const ok = await Adminauth(); if (!ok) return;
            Setloginuser(Getloginuser());
            await Getallcustomers(Setallcustomers, page, status, search);
        };
        load();
    }, [page, status, search]);

    const list = Array.isArray(allcustomers) ? allcustomers : [];
    const active = list.filter(c => c.status === 'active').length;
    const blocked = list.filter(c => c.status === 'blocked').length;

    return (
        <div className="container-fluid p-0 cust-page">
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 overflow-hidden">

                    {/* ── Navbar ── */}
                    <nav className="c-topbar">
                        <h5 className="c-topbar-title">
                            <i className="bi bi-people-fill"></i> Customer Management
                        </h5>
                        <div className="c-topbar-right">
                            <div className="d-none d-sm-block text-end">
                                <span className="c-admin-name">{loginuser?.name}</span>
                                <span className="c-admin-role">Super Admin</span>
                            </div>
                            <img src={`${IMAGES_URL}/${loginuser?.profileimage}`} alt="" className="c-admin-img" />
                        </div>
                    </nav>

                    <div className="c-content">

                        {/* Title */}
                        <div className="c-title-row">
                            <div>
                                <h3 className="c-page-title">Users Directory</h3>
                                <p className="c-page-sub">Monitor activity and manage account permissions.</p>
                            </div>
                            <span className="c-total-badge"><i className="bi bi-people me-1"></i>{list.length} Users</span>
                        </div>

                        {/* Stats */}
                        <div className="c-stats">
                            <div className="c-stat">
                                <div className="c-stat-ico ico-all"><i className="bi bi-people-fill"></i></div>
                                <div><span className="c-stat-num">{list.length}</span><span className="c-stat-lbl">Total</span></div>
                            </div>
                            <div className="c-stat">
                                <div className="c-stat-ico ico-active"><i className="bi bi-person-check-fill"></i></div>
                                <div><span className="c-stat-num">{active}</span><span className="c-stat-lbl">Active</span></div>
                            </div>
                            <div className="c-stat">
                                <div className="c-stat-ico ico-block"><i className="bi bi-person-slash"></i></div>
                                <div><span className="c-stat-num">{blocked}</span><span className="c-stat-lbl">Blocked</span></div>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="c-filter">
                            <div className="c-search">
                                <i className="bi bi-search"></i>
                                <input
                                    type="text" placeholder="Search name, email or phone…"
                                    onChange={e => { Setsearch(e.target.value); Setpage(1); }}
                                />
                            </div>
                            <select className="c-select" value={status} onChange={e => { Setstatus(e.target.value); Setpage(1); }}>
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>

                        {/* Table */}
                        <div className="c-table-card">
                            <div className="table-responsive">
                                <table className="c-table">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Contact</th>
                                            <th className="center">Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.length > 0 ? list.map((c, i) => (
                                            <tr key={c.user_id} style={{ animationDelay: `${i * .03}s` }}>

                                                {/* Customer */}
                                                <td>
                                                    <div className="c-user-cell">
                                                        <div className="c-avatar-wrap">
                                                            {c.profileimage
                                                                ? <img src={`${IMAGES_URL}/${c.profileimage}`} alt={c.name} className="c-avatar-img" />
                                                                : <div className="c-avatar-ini">{ini(c.name)}</div>
                                                            }
                                                            <span className={`c-online-dot ${dotClass(c.status)}`}></span>
                                                        </div>
                                                        <div>
                                                            <span className="c-user-name">{c.name}</span>
                                                            <span className="c-user-id">#{c.user_id}</span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact */}
                                                <td>
                                                    <span className="c-email">{c.email}</span>
                                                    <span className="c-phone">{c.mobilenumber || 'No phone'}</span>
                                                </td>

                                                {/* Status */}
                                                <td style={{ textAlign: 'center' }}>
                                                    <span className={`c-status ${statusClass(c.status)}`}>
                                                        <span className="cs-dot"></span>{c.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td>
                                                    <div className="c-action-row">
                                                        <Link to={`/vieweachcustomer/${c.user_id}`} className="c-view-btn">
                                                            <i className="bi bi-eye"></i> View
                                                        </Link>
                                                        <button
                                                            className={`c-block-btn ${c.status === 'blocked' ? 'unblock' : 'block'}`}
                                                            onClick={() => Blockcustomer(c.user_id, Setallcustomers, page, status, search, {})}
                                                        >
                                                            <i className={`bi ${c.status === 'blocked' ? 'bi-unlock' : 'bi-slash-circle'}`}></i>
                                                            {c.status === 'blocked' ? 'Unblock' : 'Block'}
                                                        </button>
                                                    </div>
                                                </td>

                                            </tr>
                                        )) : (
                                            <tr><td colSpan={4}>
                                                <div className="c-empty">
                                                    <i className="bi bi-people"></i>
                                                    <p>No customers found.</p>
                                                </div>
                                            </td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="c-pagination">
                                <span className="c-pag-info">Showing <b>{list.length}</b> users · Page <b>{page}</b></span>
                                <div className="d-flex gap-2">
                                    <button className="c-pag-btn" disabled={page === 1} onClick={() => Setpage(p => Math.max(1, p - 1))}>
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                    <button className="c-pag-btn" disabled={list.length < 10} onClick={() => Setpage(p => p + 1)}>
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {showtoast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
                    <div className={`c-toast toast show align-items-center text-white bg-${toastcolor} border-0`}>
                        <div className="d-flex">
                            <div className="toast-body fw-bold">
                                {toastcolor === 'success' ? <i className="bi bi-check-circle-fill me-2"></i> : <i className="bi bi-exclamation-triangle-fill me-2"></i>}
                                {toastmessage}
                            </div>
                            <button className="btn-close btn-close-white me-2 m-auto" onClick={() => Closetoast(Setshowtoast)}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};