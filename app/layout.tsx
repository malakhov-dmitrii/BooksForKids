import type { Metadata, Viewport } from "next";
import PagesLayout from "@/components/layouts/PagesLayout";

import './globalStyles/reset.css'
import './globalStyles/globals.css'
import './globalStyles/header.css'
import './globalStyles/footer.css'
import './globalStyles/langBlock.css'
import './globalStyles/searchBarMobile.css'
import './globalStyles/searchModal.css'
import './globalStyles/cartPopup.css'
import './globalStyles/burger.css'
import './globalStyles/cookiePopup.css'
import './globalStyles/profilePage.css'
import './globalStyles/headerProfile.css'
import './globalStyles/shopPopup.css'

export const metadata: Metadata = {
  title: "Books4Kids",
  description: "Books4Kids - online store of Russian books for kids",
};

export const viewport: Viewport = {
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PagesLayout>{children}</PagesLayout>
}
