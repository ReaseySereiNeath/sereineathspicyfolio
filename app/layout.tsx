import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
	title: "Reasey - Portfolio",
	description:
		"Build exceptional digital experiences that make people's lives easier.",
	other: {
		"theme-color": "#000000",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" style={{ colorScheme: "dark" }}>
			<body className="antialiased">
				<a
					href="#smooth-content"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
				>
					Skip to content
				</a>
				{children}
				<Toaster
					position="top-right"
					toastOptions={{
						style: {
							background: "rgb(31 41 55)",
							border: "1px solid rgb(79 70 229 / 0.2)",
							color: "rgb(243 244 246)",
						},
					}}
				/>
			</body>
		</html>
	);
}
