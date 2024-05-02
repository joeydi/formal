import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormSettingsForm } from "@/components/FormSettingsForm";
import { FormSchemaForm } from "@/components/FormSchemaForm";
import { DeleteForm } from "@/components/DeleteForm";
import { Code } from "bright";

async function getForm(formId) {
    try {
        const response = await axios.get(`${process.env.NEXTAUTH_BACKEND_URL}/forms/${formId}/`);
        return response.data;
    } catch (error: any) {
        return null;
    }
}

export default async function EditForm({ params }) {
    const formId = params.formId;
    const form = await getForm(formId);

    return (
        <main className="flex p-4 lg:p-6 items-center justify-center">
            <div className="container mx-auto">
                <Tabs defaultValue="settings">
                    <div className="flex justify-between">
                        <TabsList className="mb-8">
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="schema">Schema</TabsTrigger>
                            <TabsTrigger value="confirmations">Confirmations</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>
                        <DeleteForm id={formId} />
                    </div>
                    <TabsContent value="settings">
                        <FormSettingsForm initialData={form} />
                    </TabsContent>
                    <TabsContent value="schema">
                        <FormSchemaForm initialData={form} />
                    </TabsContent>
                    <TabsContent value="confirmations">
                        <Code className="mt-0 text-sm" lang="json">
                            {JSON.stringify(form.schema, null, 2)}
                        </Code>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Code className="text-sm" lang="json">
                            {JSON.stringify(form.uischema, null, 2)}
                        </Code>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
