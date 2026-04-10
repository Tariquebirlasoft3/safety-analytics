import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


export default function UserManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // FETCH USERS (SERVER-SIDE PAGINATION)
    const fetchUsers = async (page) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:5000/api/admin/users?page=${page}&limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Failed to fetch users");

            const json = await res.json();

            setUsers(json.data || []);
            setTotalPages(json.pagination?.totalPages || 1);
        } catch (error) {
            console.error("User fetch failed:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    // PAGINATION CONTROLS
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    // DELETE USER
    const deleteUser = async (id) => {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/api/admin/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchUsers(currentPage);
    };

    return (
        <div className="user-management">
            {/* HEADER */}
            <div className="um-header">
                <h2>User Management</h2>

                <div className="um-actions">
                    <button className="btn-primary">ADD NEW</button>
                </div>
            </div>

            {/* TOOLBAR */}
            <div className="um-toolbar">
                <span>
                    SHOWING <strong>{users.length}</strong> / {totalPages * 5}
                </span>
            </div>

            {/* TABLE */}
            <div className="um-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>User</th>
                            <th>Email ID</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">Loading users...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="6">No users found</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>Active</td>
                                    <td>
                                        <span
                                            style={{ color: "red", cursor: "pointer" }}
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* CUSTOM PAGINATION */}
            <div className="um-pagination">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <ChevronLeftIcon />
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
}