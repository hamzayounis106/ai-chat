import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';
import ClientWrapper from './ClientWrapper';

export default async function Page({ searchParams }: any) {
  const params = await searchParams;
  const s = params?.s || params?.sessionId;
  if (!s) {
    const sid = randomUUID();
    redirect(`/chat?sessionId=${sid}`);
  }

  return (
    <div className="h-full">
      <ClientWrapper sessionId={String(s)} />
    </div>
  );
}
