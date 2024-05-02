import { FormAddForm } from "@/components/FormAddForm";

export default async function AddForm() {
    return (
        <main className="flex flex-1 p-4 lg:p-6 items-center justify-center">
            <div className="w-1/2">
                <FormAddForm />
            </div>
        </main>
    );
}
