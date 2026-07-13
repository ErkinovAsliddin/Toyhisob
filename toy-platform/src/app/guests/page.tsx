"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GuestListManager } from "@/components/guests/guest-list-manager";
import { WeddingCountdown } from "@/components/countdown/wedding-countdown";
import { FadeIn } from "@/components/animations/animated";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function GuestListPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8">
              <Badge variant="default" className="mb-4">
                <Users className="h-3 w-3 mr-1" />
                Guest Management
              </Badge>
            </div>
          </FadeIn>

          <div className="mb-8">
            <WeddingCountdown />
          </div>

          <GuestListManager />
        </div>
      </div>
      <Footer />
    </div>
  );
}
