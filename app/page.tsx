import type { Metadata } from 'next';
import Home from './index';
 
export const metadata: Metadata = {
    title: 'Kai Portfolio',
    description: 'A journey into a front end software engineers mind',
};
 
export default async function Page() {
  return <Home />
}