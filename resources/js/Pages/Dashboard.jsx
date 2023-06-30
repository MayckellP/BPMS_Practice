import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Progress from "@/Components/Progress";
import Pusher from "pusher-js";

export default function Dashboard({
    auth,
    users,
    relation,
    roles,
    myCart,
    proccess,
}) {
    {
        /* ---------------------------------------------------------------------FUNCTION TO KNOW THE USER ROLE */
    }
    useEffect(() => {
        const roleName = JSON.parse(
            sessionStorage.getItem("currentUser")
        ).rolename;
        const timer = setTimeout(() => {
            if (roleName === "Client") {
                window.location.href = route("orders.index");
            } else if (
                roleName === "Administrador" ||
                auth.user.email === "admin@hotmail.com"
            ) {
                window.location.href = route("users.index");
            } else if (roleName === "Seller") {
                window.location.href = route("deptSales.index");
            } else if (roleName === "Production Manager") {
                window.location.href = route("deptProduction.index");
            } else if (
                roleName === "Logistic Manager" ||
                roleName === "Logistic Employee"
            ) {
                window.location.href = route("deptLogistic.index");
            } else if (roleName === "Warehouse") {
                window.location.href = route("stock.index");
            } else if (
                JSON.parse(sessionStorage.getItem("currentUser")).id ==
                undefined
            ) {
                window.location.href = route("clients.index");
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    var rolesArray = [""];
    var countRole = 0;
    var currentUser = {};
    var currentMyCart = {};
    var proccessTrack = {
        created_at: "",
        confirmedCount: proccess[0],
        date_to_produceCount: proccess[1] - proccess[0],
        date_to_deliverCount: proccess[2] - proccess[1],
        deliveredCount: proccess[3] - proccess[2],
    };

    users.data.map((item) => {
        relation.map((relationItem) => {
            if (relationItem.model_id === item.id) {
                roles.map((type) => {
                    if (type.id === relationItem.role_id) {
                        rolesArray.push(type.name);
                    }
                });
            }
        });
    });

    relation.map((relationRole) => {
        if (relationRole.model_id === auth.user.id) {
            roles.map((role) => {
                if (role.id === relationRole.role_id) {
                    rolesArray.map((roleName) => {
                        if (role.name === roleName) {
                            countRole++;
                            if (countRole === 1) {
                                currentUser = {
                                    id: auth.user.id,
                                    name: auth.user.name,
                                    email: auth.user.email,
                                    rolename: roleName,
                                };
                            }
                        }
                    });
                }
            });
        }
    });

    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    sessionStorage.setItem("myCurrentCart", JSON.stringify(myCart));
    sessionStorage.setItem("proccess", JSON.stringify(proccessTrack));
    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center m-auto">
                            <h2>Redirecting...!</h2>
                            <Progress />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
