import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Progress from "@/Components/Progress";

export default function Dashboard({ auth, myCart }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                JSON.parse(sessionStorage.getItem("currentUser")).rolename ===
                    "Client" ||
                JSON.parse(sessionStorage.getItem("currentUser")).rolename ===
                    "Seller"
            ) {
                window.location.href = route("store.create");
            }
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    var currentMyCart = {};
    sessionStorage.setItem("myCurrentCart", JSON.stringify(myCart));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 d-flex flex-column justify-center">
                            <h2>Updating Cart...</h2>
                            <Progress />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
