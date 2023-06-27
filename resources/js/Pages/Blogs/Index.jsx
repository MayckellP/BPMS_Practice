import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import ButonCreate from "@/Components/ButtonCreate";

export default function Index({ auth, blogs }) {
    console.log(blogs);
    const showBlogs = blogs.map((item) => (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td className="text-center">
                {
                    <ButonCreate
                        title="Edit"
                        styleBtn="w-75 bg-success"
                        styleLink="fs-4 text-white fw-bold text-decoration-none"
                        link={route("blogs.edit", item.id)}
                    />
                }
            </td>
            <td className="text-center">
                <Link
                    className="fs-4 text-white fw-bold text-decoration-none bg-danger"
                    href={route("blogs.destroy", item.id)}
                    method="delete"
                    as="button"
                >
                    Delete
                </Link>
            </td>
        </tr>
    ));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Blogs
                </h2>
            }
        >
            <Head title="Blogs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ButonCreate
                                title="Create Blog"
                                link={route("blogs.create")}
                            />
                        </div>
                        <div className="p-6 text-gray-900">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Blog</th>
                                        <th colSpan={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>{showBlogs}</tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
