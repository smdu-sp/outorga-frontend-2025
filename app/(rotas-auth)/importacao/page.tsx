import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormImportacao from "./_components/form-importacao";

export default function Importacao() {
    return <Card className='mt-10'>
        <CardHeader>
            <CardTitle className='text-4xl font-bold'>Importação</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-10'>
            <FormImportacao />
        </CardContent>
    </Card>
}