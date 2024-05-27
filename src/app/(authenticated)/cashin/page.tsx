
import CashIn from '@/components/custom/wallet/cashIn';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

type Props = {}

export default async function CashInPage({}: Props) {
 
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <CashIn owner={user} />
  )
}