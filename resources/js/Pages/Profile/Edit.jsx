import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateProfileFoto from "./Partials/UpdateProfileFoto";
import UpdateCompanyLogo from "./Partials/UpdateCompanyLogo";
import { Head } from "@inertiajs/react";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    clientLogo,
    employeeFoto,
}) {
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;
    return (
        <AuthenticatedLayout user={auth.user} header={"Profile"}>
            <Head title="Profile" />

            <div className="cont-global-profile">
                <div className="p-4 shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>
                <div className="p-4 shadow sm:rounded-lg">
                    <UpdateProfileFoto
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                {(roleName === "Client" || roleName === "Administrador") && (
                    <div className="p-4 shadow sm:rounded-lg">
                        <UpdateCompanyLogo
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                )}

                <div className="p-4 mt-3 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
