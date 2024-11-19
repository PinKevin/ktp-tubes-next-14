import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Masuk ke dalam aplikasi NEW SIAP UNDIP.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" className="mt-5" />
        </CardContent>
        <CardFooter>
          <form action={''} className="w-full">
            <Button className="w-full">Sign in</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
