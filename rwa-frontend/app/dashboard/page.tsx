'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const metrics = [
	{
		name: 'Travel Portfolio Value',
		value: '0.00 USDC',
		description: 'Total value of your tourism investments',
	},
	{
		name: 'Investment in Experiences',
		value: '0',
		description: "Number of experiences you've invested in",
	},
	{
		name: 'Active Travel Assets',
		value: '0',
		description: 'Currently active properties and experiences',
	},
	{
		name: 'Tourism License Status',
		value: 'Valid',
		description: 'Your platform compliance status',
	},
];

export default function DashboardPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to main page since our dashboard is implemented there
		router.replace('/');
	}, [router]);

	return null;
}