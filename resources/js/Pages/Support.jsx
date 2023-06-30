import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Progress from "@/Components/Progress";
import Pusher from "pusher-js";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={"Support"}>
            <Head title="Support" />
            <div className="cont-support">
                <div className="cont-left-support">
                    <img
                        src="/images/0.log_view/NewLogo-black.svg"
                        alt="Photo User"
                    />
                    <div className="cont-title-support">
                        <h2>Do you have quetions?</h2>
                    </div>
                    <div className="cont-full-time">
                        <h3>24/7</h3>
                        <div className="cont-contact">
                            <span>
                                <i class="bi bi-whatsapp"> </i>
                                +41 78 248 45 35
                            </span>
                            <span>
                                <i class="bi bi-envelope"> </i>
                                mayckell-perez@hotmail.com
                            </span>
                        </div>
                    </div>
                    <div className="cont-info-github">
                        <span>
                            Being a personal project and for practical/academic
                            purposes, I share this project on Github:
                        </span>
                        <a
                            href="https://github.com/MayckellP/BPMS_Practice"
                            target={"_blank"}
                        >
                            <i class="bi bi-github fs-4"> </i>
                            <span>Go to Github</span>
                        </a>
                    </div>
                </div>
                <div className="cont-right-support">
                    <img
                        src="/images/icons/support-worker.svg"
                        alt="Photo User"
                    />
                    <div className="cont-full-time-mobile">
                        <div className="cont-title-support-mobile">
                            <h2>Do you have quetions?</h2>
                        </div>
                        <div className="time-support">
                            <h3 className="time-support">24/7</h3>
                            <span>via:</span>
                        </div>
                        <div className="cont-contact">
                            <span>
                                <i class="bi bi-whatsapp"> </i>
                                +41 78 248 45 35
                            </span>
                            <span>
                                <i class="bi bi-envelope"> </i>
                                mayckell-perez@hotmail.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
