import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
	title: "Reasey - Portfolio",
	description:
		"Build exceptional digital experiences that make people's lives easier.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">
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
